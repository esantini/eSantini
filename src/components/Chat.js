import { useState, useEffect, useRef, useCallback } from 'react';
import { trackEvent, requestChat, fetchChatMessages, useWebSocket, useUser } from 'utils';
import { ChatConversations, Input, Button } from 'components';
import RequestChatModal from './modals/RequestChatModal';
import styled from '@emotion/styled';

function Chat() {
  const [input, setInput] = useState('');
  const [name, setName] = useState('Guest');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [adminChatId, setAdminChatId] = useState(null);
  const [isRequested, setIsRequested] = useState(false);
  const [user] = useUser();

  const {
    isConnected,
    sendMessage,
    closeWebSocket,
    connectWebSocket,
  } = useWebSocket(setMessages);

  const messagesUl = useRef(null);

  useEffect(() => {
    if (user?.name) {
      const userName = user.name.split(' ')[0];
      setName(userName);
    }
  }, [user]);

  useEffect(() => {
    if (messagesUl.current) {
      messagesUl.current.scrollTop = messagesUl.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (adminChatId) {
      closeWebSocket();
      setIsLoading(true);
      setIsRequested(false);
      fetchChatMessages(adminChatId, ({ data, errors }) => {
        if (errors && errors.length) {
          throw new Error(errors);
        }
        const resData = data.chatMessages;
        setMessages(resData.reverse());
        setIsRequested(true);
        setIsLoading(false);
      });
    }
  }, [adminChatId]);

  useEffect(() => {
    if (isRequested && !isConnected) {
      connectWebSocket();
    }
  }, [isRequested, isConnected, connectWebSocket]);

  const handleHeaderClick = useCallback(() => {
    setIsOpen(v => !v);
    trackEvent('click', 'Chatini', 'Header', isOpen ? 'Close' : 'Open');
  }, [isOpen]);

  const handleSendMessage = useCallback(() => {
    const message = input.trim();
    if (!message) return;
    sendMessage({ name, message }, () => setInput(''));
  }, [input, isConnected, sendMessage, name]);

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

  return (<>
    <RequestChatModal isOpen={false} />
    <ChatContainer isOpen={isOpen} isLoading={isLoading} isAdmin={user?.isAdmin}>
      {user?.isAdmin && isOpen &&
        <ChatConversations selectedId={adminChatId} setChatId={setAdminChatId} />
      }
      <div className="chatWrapper">
        <div className="chatHeader" onClick={handleHeaderClick}>
          <h2>Chatini</h2>
          <img
            src={`${process.env.PUBLIC_URL}/loadingSpinner.svg`}
            alt='Loading...'
            className='spinner'
          />
          {!user?.name &&
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          }
          <StatusCircle isConnected={isConnected} data-tooltip={isConnected ? 'Connected' : 'Not Connected'} />
          <hr />
        </div>
        {isOpen && <>
          <div className='chatMessages'>
            <h3>Work In Progress...</h3>
            {isRequested || user?.isAdmin ?
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
                Clicking &quot;Chat&quot; will notify me and I&apos;ll do my best to become available.
              </RequestP>
            }
          </div>
          <div className="inputWrapper">
            {isRequested || user?.isAdmin ? <>
              <Input
                value={input}
                disabled={!isConnected}
                placeholder="Type a message..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                className="sendButton"
                disabled={!input.trim() || !isConnected}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </>
              : <Button className="requestButton" onClick={handleRequestChat}>Chat</Button>}
          </div>
        </>}
      </div>
    </ChatContainer>
  </>);
}

export default Chat;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  height: ${({ isOpen }) => isOpen ? '15' : '2'}em;
  max-height: 15em;

  display: flex;
  flex-direction: row;

  background-color: white;
  border-left: 2px solid #888;
  border-top: 2px solid #888;
  border-top-left-radius: 1em;
  box-shadow: ${({ isOpen }) => isOpen ? '0em 0em .5em gray' : '0'};
  
  transition: height 0.15s ease, box-shadow 0.5s ease;

  .chatWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15.2em;
    overflow: hidden;
  }

  .chatHeader {
    position: relative;
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
    }
  }

  .sendButton {
    width: 20%;
  }

  .requestButton {
    width: 100%;
  }

  .spinner {
    display: none;
    height: 1.6em;
    margin-bottom: -0.3em;
  }
  ${({ isLoading }) => isLoading && `
    .spinner {
      display: inline-block;
    }
  `}
`;

const StatusCircle = styled.span`
    position: absolute;
    top: 0.8em;
    right: 0.7em;
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    background: ${({ isConnected }) => isConnected ? '#008506' : '#ccc'};

    // &:hover:after {
    //   content: attr(data-tooltip); /* Use the data-tooltip attribute to hold the tooltip text */
    //   visibility: visible;
    //   width: 120px;
    //   background-color: black;
    //   color: #fff;
    //   text-align: center;
    //   border-radius: 6px;
    //   padding: 5px 0;
      
    //   /* Positioning */
    //   position: absolute;
    //   z-index: 1;
    //   bottom: 100%;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   white-space: nowrap;
    // }
    // &:hover:before {
    //   content: '';
    //   position: absolute;
    //   bottom: 100%;
    //   left: 50%;
    //   margin-left: -5px;
    //   border-width: 5px;
    //   border-style: solid;
    //   border-color: transparent transparent black transparent;
    // }
`;

const RequestP = styled.p`
  padding: 1em;
  margin: 0;
  color: #888;
`;
