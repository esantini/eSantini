import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchConversations, setChatId as setChatIdCookie } from 'utils';
import styled from '@emotion/styled';

const ChatConversations = ({ selectedId, setChatId }) => {
  const [errors, setErrors] = useState(null);
  const [conversList, setConversList] = useState([]);

  useEffect(() => {
    fetchConversations(({ data, errors }) => {
      if (errors) {
        console.error(errors);
        setErrors(errors);
        return;
      }
      setConversList(data.conversations);
    });
  }, []);

  const handleChatIdClick = useCallback((chatId) => () => {
    if (chatId == selectedId) return;
    setChatIdCookie(parseInt(chatId), ({ errors }) => {
      if (errors) {
        console.error(errors);
        setErrors(errors);
        return;
      }
      setChatId(parseInt(chatId));
    });
  }, [selectedId])
  return (
    <Container>
      <h3>Chat IDs</h3>
      <ul>
        {conversList.map(({ chatId }, i) => <Li key={i} isActive={chatId == selectedId} onClick={handleChatIdClick(chatId)}>{chatId}</Li>)}
      </ul>
      {errors && <>
        <h4>Errors</h4>
        <ErrorList>
          {errors.map((error, i) => <li key={i}>{error.message}</li>)}
        </ErrorList>
      </>}
    </Container>
  );
};

ChatConversations.propTypes = {
  selectedId: PropTypes.number,
  setChatId: PropTypes.func.isRequired,
};

export default ChatConversations;

const Container = styled.div`
  padding: 1rem;
  border-right: 1px solid #ddd;
  h3 {
    margin-bottom: 0.5rem;
  }
  ul {
    list-style-type: none;
    padding: 0;
    max-height: 12em;
    overflow-y: scroll;
    li {
    }
  }
`;
const Li = styled.li`
  ${({ isActive }) => isActive ? `
    background-color: #ddd;
    cursor: default;
  ` : `
    background-color: transparent;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  `
  }
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-radius: 0.7em;
  width: 100%;
  text-align: center;
`;
const ErrorList = styled.ul`
  color: red;
`