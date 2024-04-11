import PropTypes from 'prop-types';
import Modal from './Modal';
import styled from '@emotion/styled';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => isOpen ? (
  <Modal isOpen={isOpen}>
    <p>{message || 'Are you sure?'}</p>
    <Buttons>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </Buttons>
  </Modal>
) : null;

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default ConfirmationModal;

const Buttons = styled.div`
  margin-top: .5em;
  display: flex;
  justify-content: space-around;
  button {
    padding: .3em;
  }
`;