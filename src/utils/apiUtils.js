import { useEffect, useState, useCallback } from 'react';

const fetchUser = async (setUser, setIsLoading) => {
  try {
    const res = await fetch('/api/me');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const user = await res.json();
    setUser(user);
    if (!user) {
      localStorage.removeItem('credential');
    }
  } catch (error) {
    setUser(null);
    localStorage.removeItem('credential');
    console.error('Failed to fetch user:', error);
    // Handle the error based on your application's needs
    return null;
  } finally {
    setIsLoading(false);
  }
}

const fetchData = (endpoint, callback) => {
  fetch(endpoint)
    .then(res => res.json())
    .then(callback)
    .catch(console.error);
}

const fetchSessions = (callback) => {
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetSessions($daysAgo: Int) {
          sessions(daysAgo: $daysAgo) {
            id
            timestamp
            geo {
              city
              region
              country
              ll
            }
            events {
              type
              details {
                page_path
                event_category
                event_label
                value
              }
              timestamp
            }
          }
        }
      `,
      variables: {
        daysAgo: 7, // Adjust this value as needed
      },
    }),
  })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);
}

const deleteSession = (sessionId, callback) => (
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation DeleteSession($sessionId: Int!) {
          deleteSession(sessionId: $sessionId)
        }
      `,
      variables: {
        sessionId: sessionId,
      },
    }),
  })
    .then(response => response.json())
    .then(callback)
);

const requestChat = (name, callback) => (
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query RequestChat($name: String!) {
          requestChat(name: $name) {
            name
            message
          }
        }
      `,
      variables: {
        name: name,
      },
    }),
  })
    .then(response => response.json())
    .then(callback)
);

const fetchConversations = (callback) => {
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetConversations {
          conversations {
            chatId
          }
        }
      `,
    }),
  })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);
}

const fetchChatMessages = (chatId, callback) => {
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetChatMessages($chatId: Int!) {
          chatMessages(chatId: $chatId) {
            name
            message
          }
        }
      `,
      variables: {
        chatId: chatId,
      },
    }),
  })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);
}

const setChatId = (chatId, callback) => {
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation SetChatId($chatId: Int!) {
          setChatId(chatId: $chatId)
        }
      `,
      variables: {
        chatId: chatId,
      },
    }),
  })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);
}

const getWebSocketUrl = (localIp) => isLocalhost ? `ws://${localIp}:8080/chatsocket` : 'wss://esantini.com/chatsocket';
const useWebSocket = (setMessages) => {
  const [webSocket, setWebSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const pushMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [setMessages]);

  useEffect(() => {
    if (webSocket) {
      webSocket.onopen = () => {
        setIsConnected(true);
        // pushMessage({ notification: 'Connected.' });
      };
      webSocket.onclose = () => {
        setIsConnected(false);
        // pushMessage({ notification: 'Disconnected.' });
      };
      webSocket.onerror = (error) => console.error('WebSocket error:', error);
      webSocket.onmessage = (event) => pushMessage(JSON.parse(event.data));
      return () => {
        setIsConnected(false);
        webSocket.close();
      };
    }
  }, [webSocket]);

  const connectWebSocket = useCallback(() => {
    if (isLocalhost) {
      fetch('api/localIp').then(r => r.json()).then(({ localIp }) => {
        setWebSocket(new WebSocket(getWebSocketUrl(localIp)));
      });
    } else {
      setWebSocket(new WebSocket(getWebSocketUrl()));
    }
  }, []);

  const closeWebSocket = useCallback(() => {
    if (webSocket) {
      webSocket.close();
    }
  }, [webSocket]);

  const sendMessage = useCallback((msgObject, callback) => {
    if (isConnected) {
      webSocket.send(JSON.stringify(msgObject));
      callback();
    } else {
      pushMessage({ notification: 'Can\'t send message.' });
    }
  }, [isConnected, webSocket, pushMessage]);

  return {
    sendMessage,
    isConnected,
    closeWebSocket,
    connectWebSocket,
  }
}

export {
  fetchUser,
  fetchData,
  fetchSessions,
  deleteSession,
  requestChat,
  useWebSocket,
  fetchConversations,
  fetchChatMessages,
  setChatId,
};
