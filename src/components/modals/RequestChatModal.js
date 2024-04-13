import PropTypes from 'prop-types';
import Modal from './Modal';
import styled from '@emotion/styled';
import { GoogleLoginButton, Hr, Input, Button } from 'components';

const RequestChatModal = ({ isOpen, onConfirm, onCancel }) => (
  <Modal isOpen={isOpen}>
    <ChatOptions>
      <H3>Login</H3>
      <GoogleLoginButton />
      <Hr />
      <H3>Continue as Guest</H3>
      <Button onClick={onConfirm}>Continue as Guest</Button>
      <br />
      <Input type='text' placeholder='Enter your name' />
    </ChatOptions>
  </Modal>
);

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
  button {
    padding: .3em;
  }
  hr {  
    margin: 1em 0;
  }
`;
