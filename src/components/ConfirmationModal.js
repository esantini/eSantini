import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => isOpen ? (
  <ModalContainer>
    <div className="modal">
      <p>{message || 'Are you sure?'}</p>
      <div className="buttons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  </ModalContainer>
) : null;

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default ConfirmationModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #00000088;
  z-index: 1000;
  top: 0;
  left: 0;
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0.2em 1em 0.1em black;
  }
  .buttons {
    margin-top: .5em;
    display: flex;
    justify-content: space-around;
    button {
      padding: .3em;
    }
  }
`;