import React from 'react';
import Modal from 'react-modal';
import '../assets/css/Modal.css';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal

        style={{
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(5px)',
        },
        content: {
            position: 'absolute',
            top: '10px',
            left: '40%',
            bottom: '40px',
            border: '1px solid #1A1C1E',
            background: '#1A1C1E',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '20px',
            outline: 'none',
            padding: '20px',
            width: '369px',
            height: '650px',
        }
        }}
    
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Modal"
        closeTimeoutMS={1000}
        >
      {children}
    </Modal>
  );
};
export default CustomModal;
