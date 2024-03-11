import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Chat({ user, ws }) {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('Guest');
  const [input, setInput] = useState('');
  const messagesUl = useRef(null);

  useEffect(() => {
    if (user?.name) {
      const userName = user.name.split(' ')[0];
      setName(userName);
    }
  }, [user]);

  useEffect(() => {
    ws.onopen = () => setMessages((prevMessages) => [...prevMessages, { notification: 'Connected.' }]);
    ws.onclose = () => setMessages((prevMessages) => [...prevMessages, { notification: 'Disconnected.' }]);
    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onmessage = (event) => setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    return () => {
      ws.close();
    };
  }, [ws]);

  useEffect(() => {
    if (messagesUl.current) {
      messagesUl.current.scrollTop = messagesUl.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ name, message: input }));
      setInput('');
    } else {
      setMessages((prevMessages) => [...prevMessages, { notification: 'Cant send message.' }]);
    }
  };

  return (
    <ChatContainer isOpen={isOpen}>
      <div className="chatHeader" onClick={() => setIsOpen(v => !v)}>
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
          <ul ref={messagesUl}>
            {messages.map(({ name, message, notification }, index) => notification ? (
              <li key={index}><i>{notification}</i></li>
            ) : (
              <li key={index}><b>{name}:</b> {message}</li>
            ))}
          </ul>
        </div>
        <div className="inputWrapper">
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
          <button onClick={sendMessage}>Send</button>
        </div>
      </>}
    </ChatContainer>
  );
}

Chat.propTypes = {
  user: PropTypes.object,
  ws: PropTypes.object,
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

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: white;
  border-left: 2px solid #888;
  border-top: 2px solid #888;
  border-top-left-radius: 1em;
  
  transition: height 0.15s ease;
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
  }
  .inputWrapper {
    position: absolute;
    bottom: 0;
    padding: 0.4em 0.5em;
    input {
      width: 60%;
    }
    button {
      width: 30%;
    }
  }
`;
