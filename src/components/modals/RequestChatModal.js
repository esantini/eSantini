import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import styled from '@emotion/styled';
import { GoogleLoginButton, Hr, Input, Button } from 'components';

const RequestChatModal = ({ isOpen, onConfirm, onCancel }) => {
  const [name, setName] = useState('');
  const handleChangeName = useCallback((e) => setName(e.target.value), []);
  const handleContinueAsGuest = useCallback(() => {
    onConfirm({ name });
  }, [name, onConfirm]);
  return <Modal isOpen={isOpen}>
    <ChatOptions>
      <H3>Login</H3>
      <GoogleLoginButton />
      <Hr />
      <H3>Continue as Guest</H3>
      <Input type='text' onChange={handleChangeName} placeholder='Enter your name' />
      <br />
      <Button onClick={handleContinueAsGuest} disabled={!name.trim()}>Continue as Guest</Button>
    </ChatOptions>
  </Modal>;
}

RequestChatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  message: PropTypes.string
};

export default RequestChatModal;

const H3 = styled.h3`
  margin-bottom: .5em;
`;

const ChatOptions = styled.div`
  margin-top: .5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  hr {  
    margin: 1em 0;
  }
  input {
    text-align: center;
  }
`;
