import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Modal = ({ children, isOpen }) => isOpen ? (
  <ModalContainer>
    <div className="modal">
      {children}
    </div>
  </ModalContainer>
) : null;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;

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
`;