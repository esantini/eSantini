import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { trackEvent, requestChat } from 'utils';
import styled from '@emotion/styled';

const getWebSocketUrl = (localIp) => isLocalhost ? `ws://${localIp}:8080` : 'wss://esantini.com:8080';
const CHAT_ENABLED = isLocalhost;

function Chat({ user }) {
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('Guest');
  const [input, setInput] = useState('');
  const messagesUl = useRef(null);

  useEffect(() => {
    if (CHAT_ENABLED && isRequested && !webSocket) {
      if (isLocalhost) {
        fetch('api/localIp').then(r => r.json()).then(({ localIp }) => {
          setWebSocket(new WebSocket(getWebSocketUrl(localIp)));
        });
      } else {
        setWebSocket(new WebSocket(getWebSocketUrl()));
      }
    }
  }, [isRequested]);

  useEffect(() => {
    if (user?.name) {
      const userName = user.name.split(' ')[0];
      setName(userName);
    }
  }, [user]);

  useEffect(() => {
    if (webSocket) {
      webSocket.onopen = () => pushMessage({ notification: 'Connected.' });
      webSocket.onclose = () => {
        setWebSocket(null);
        // TODO setIsRequested(false);
        pushMessage({ notification: 'Disconnected.' });
      };
      webSocket.onerror = (error) => console.error('WebSocket error:', error);
      webSocket.onmessage = (event) => pushMessage(JSON.parse(event.data));
      return () => {
        webSocket.close();
      };
    }
  }, [webSocket]);

  useEffect(() => {
    if (messagesUl.current) {
      messagesUl.current.scrollTop = messagesUl.current.scrollHeight;
    }
  }, [messages]);

  const handleHeaderClick = useCallback(() => {
    setIsOpen(v => !v);
    trackEvent('click', 'Chatini', 'Header', isOpen ? 'Close' : 'Open');
  }, [isOpen]);

  const pushMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const sendMessage = useCallback(() => {
    const newMessage = input.trim();
    if (!newMessage) return;
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({ name, message: newMessage }));
      setInput('');
    } else {
      pushMessage({ notification: 'Cant send message.' });
    }
  }, [input, webSocket, name]);

  const handleRequestChat = useCallback(() => {
    setIsLoading(true);
    requestChat(name, ({ errors, data }) => {
      if (errors && errors.length) {
        throw new Error(errors);
      }

      const resData = data.requestChat;
      const oldMessages = resData && resData.length ? resData.reverse() : [];
      setMessages(msgs => oldMessages.concat(msgs));
      setIsRequested(true);
    }).catch((errors) => {
      for (let err of errors) {
        console.error('Failed to request chat:', err);
      }
    }).finally(() => {
      setIsLoading(false);
    });
    trackEvent('click', 'Chatini', 'Request Chat');
  }, []);

  return (
    <ChatContainer isOpen={isOpen} isLoading={isLoading}>
      <div className="chatHeader" onClick={handleHeaderClick}>
        <h2>Chatini</h2>
        {!user?.name &&
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        }
        <hr />
      </div>
      {isOpen && <>
        <div className='chatMessages'>
          <h3>Work In Progress...</h3>
          {isRequested ?
            <ul ref={messagesUl}>
              {messages.map(({ name, message, notification }, index) => notification ? (
                <li key={index}><i>{notification}</i></li>
              ) : (
                <li key={index}><b>{name}:</b> {message}</li>
              ))}
            </ul>
            :
            <RequestP>
              Chat with me.<br />
              Clicking &quot;Request Chat&quot; will notify me and I&apos;ll do my best to become available.
            </RequestP>
          }
          <img
            src={`${process.env.PUBLIC_URL}/loadingSpinner.svg`}
            alt='Loading...'
            className='spinner'
          />
        </div>
        <div className="inputWrapper">
          {isRequested ? <>
            <input
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <SendButton isActive={!!input.trim()} onClick={sendMessage}>Send</SendButton>
          </>
            : <RequestButton onClick={handleRequestChat}>Request Chat</RequestButton>}
        </div>
      </>}
    </ChatContainer>
  );
}

Chat.propTypes = {
  user: PropTypes.object,
};

export default Chat;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 15.2em;
  height: ${({ isOpen }) => isOpen ? '15' : '2'}em;
  max-height: 15em;
  overflow: hidden;

  display: ${CHAT_ENABLED ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;

  background-color: white;
  border-left: 2px solid #888;
  border-top: 2px solid #888;
  border-top-left-radius: 1em;
  box-shadow: ${({ isOpen }) => isOpen ? '0em 0em .5em gray' : '0'};
  
  transition: height 0.15s ease, box-shadow 0.5s ease;

  .chatHeader {
    cursor: pointer;
    h2 {
      display: inline-block;
      color: #001818;
      padding-left: .5em;
      margin: .3em;
      margin-right: 1em;
    }
    input {
      width: 7em;
      position: relative;
      top: -0.15em;
    }
    hr {
      margin: 0;
    }
  }
  .chatMessages {
    position: relative;
    padding-bottom: 2.2em;
    h3 {
      color: #008506;
      margin: 0px;
      padding-left: 1em;
      border-bottom: solid 1px #e0ebe1;
    }
    ul {
      list-style: none;
      overflow-y: auto;
      max-height: 8.8em;
      margin: 0px;
      padding: 0 1em;
      border-bottom: 1px solid #cdd2cd;
    }
    
    .spinner {
      display: none;
    }
    ${({ isLoading }) => isLoading && `
      .spinner {
        position: absolute;
        display: block;
        height: 3em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);      
        z-index: 2;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 60vh;
        max-width: 1000px;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
      }
    `}
  }
  .inputWrapper {
    position: absolute;
    bottom: 0;
    padding: 0.4em 0.5em;
    width: 100%;
    display: flex;
    align-items: center;
    gap: .5em;
    input {
      width: 80%;
      padding: .5em;
      font-size: 0.9em;
      padding-left: 1em;
      border-radius: 1.1em;
      height: 1.6em;
      &:focus {
        outline: none;
        background: #fdf9d6;
        box-shadow: 0 0 0.5em 0.2em #fdf9d6;
      }
      
      transition: background .2s ease, box-shadow .2s ease;
    }
    input, button {
      border: 0;
    }
  }
`;

const RequestP = styled.p`
  padding: 1em;
  margin: 0;
  color: #888;
`;
const RequestButton = styled.button`
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  background: none;
  height: 2em;
  border-radius: 0.6em;
  color: #008506;
  cursor: pointer;
  background: #e0ebe1;
  &:hover {
    color: #005203;
    background: #cce6cf;
  }

`;

const SendButton = styled.button`
  width: 20%;
  font-size: 0.7em;
  font-weight: bold;
  background: none;
  height: 2em;
  border-radius: 0.6em;

  ${({ isActive }) => isActive ? `
    color: #008506;
    cursor: pointer;
    &:hover {
      color: #005203;
      background: #e0ebe1;
    }
  ` : 'color: #ccc;' // disabled
  }
`;

