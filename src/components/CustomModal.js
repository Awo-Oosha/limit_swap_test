import '../assets/css/CustomModal.css'; // Import your CSS for styling

const CustomModal = ({ isOpen, onClose, title, children }) => {
  const modalStyle = {
    display: isOpen ? 'flex' : 'none'
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        {/* <span className="close-button" onClick={onClose}><ion-icon name="close-sharp"></ion-icon></span> */}
        <h2 className='title'>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
