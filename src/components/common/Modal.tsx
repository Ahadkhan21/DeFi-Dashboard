import React from "react";
import "../../assets/styles/Modal.css";


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};


export default Modal;