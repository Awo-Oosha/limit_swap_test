import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

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
                    position: 'relative',
                    top: '70px',
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
                    height: '300px',
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

// <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
//     <div className='modal-swapRoute-container'>
//         <div className='swaproute-header'>
//             <div className='swaproute-header-icon'>
//                 <img src={activitiesIcons[0]} alt='swap-router.svg'></img>
//                 <div className='swaproute-header-title'>
//                     Swap Routes
//                 </div>
//             </div>
//             <div className='swaproute-close-btn' onClick={handleCloseModal}>
//                 <ion-icon name="close-outline"></ion-icon>
//             </div>
//         </div>
//
//         <div className='swaproute-body'>
//             <div className='swaproute-action-btn'>
//                 <button className={swapRouteActions === 'Max Return' ? 'active' : '' } onClick={swapRouteActionsClick}>Max Return</button>
//                 <button className={swapRouteActions === 'Lowest gas fee' ? 'active' : '' } onClick={swapRouteActionsClick}>Lowest gas fee</button>
//             </div>
//             <div className='swaproute-action-container'>
//                 {swapRouteActions === 'Max Return' && (
//                     <div id='max-return'>
//                         <div className='card'>
//                             <div className='route-container route-1 active'>
//                                 <div className='route-header'>
//                                     <div className='route-interval'>
//                                         <ion-icon name="time"></ion-icon> ~3 mins <span> | </span>
//
//                                         <div className='gas'>
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
//                                                 <path d="M10.5192 2.82L10.5292 2.81L8.04586 0.333344L7.3392 1.04L8.74586 2.44666C8.1192 2.68666 7.67252 3.29 7.67252 4C7.67252 4.92 8.41917 5.66666 9.33917 5.66666C9.57583 5.66666 9.80252 5.61666 10.0058 5.52666L10.0058 10.3333C10.0059 10.7 9.70586 11 9.3392 11C8.97255 11 8.67255 10.7 8.67255 10.3333L8.67255 7.33334C8.67255 6.59669 8.07589 6 7.3392 6L6.67255 6L6.67255 1.33334C6.67252 0.596656 6.07586 0 5.3392 0L1.3392 0C0.602516 0 0.00585938 0.596656 0.00585938 1.33334L0.00585938 12L6.67252 12L6.67252 7L7.67252 7L7.67252 10.3333C7.67252 11.2533 8.41917 12 9.33917 12C10.2592 12 11.0058 11.2533 11.0058 10.3333L11.0058 4C11.0059 3.54 10.8192 3.12334 10.5192 2.82ZM5.3392 4.66666L1.3392 4.66666L1.3392 1.33334L5.3392 1.33334L5.3392 4.66666ZM9.3392 4.66666C8.97255 4.66666 8.67255 4.36666 8.67255 4C8.67255 3.63334 8.97255 3.33334 9.3392 3.33334C9.70586 3.33334 10.0059 3.63334 10.0059 4C10.0059 4.36666 9.70586 4.66666 9.3392 4.66666Z" fill="white"/>
//                                             </svg> $25.76
//                                         </div>
//                                     </div>
//
//                                     <div className='selected'>
//                                         <ion-icon name="checkmark-circle"></ion-icon>
//                                     </div>
//                                 </div>
//                                 <div className='route-body'>
//                                     <div className='swaprouteFrm'>
//                                         1ETH <span id='location'>on Ethereum</span>
//                                     </div>
//                                     <div className='passtru'>
//                                         <div className='icon'>
//                                             <img src={hypen} alt='hypen.svg'></img>
//                                         </div>
//                                         <div className='passtru_name'>hypen</div>
//                                     </div>
//                                     <div className='passtru'>
//                                         <div className='icon'>
//                                             <img src={inch} alt='hypen.svg'></img>
//                                         </div>
//                                         <div className='passtru_name'>1Inch</div>
//                                     </div>
//                                     <div className='swaprouteto'>
//                                         2098.444 DAI <span id='location'>on Avalanche</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className='card'>
//                             <div className='route-container route-2'>
//                                 <div className='route-header'>
//                                     <div className='route-interval'>
//                                         <ion-icon name="time"></ion-icon> ~2 mins <span> | </span>
//
//                                         <div className='gas'>
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
//                                                 <path d="M10.5192 2.82L10.5292 2.81L8.04586 0.333344L7.3392 1.04L8.74586 2.44666C8.1192 2.68666 7.67252 3.29 7.67252 4C7.67252 4.92 8.41917 5.66666 9.33917 5.66666C9.57583 5.66666 9.80252 5.61666 10.0058 5.52666L10.0058 10.3333C10.0059 10.7 9.70586 11 9.3392 11C8.97255 11 8.67255 10.7 8.67255 10.3333L8.67255 7.33334C8.67255 6.59669 8.07589 6 7.3392 6L6.67255 6L6.67255 1.33334C6.67252 0.596656 6.07586 0 5.3392 0L1.3392 0C0.602516 0 0.00585938 0.596656 0.00585938 1.33334L0.00585938 12L6.67252 12L6.67252 7L7.67252 7L7.67252 10.3333C7.67252 11.2533 8.41917 12 9.33917 12C10.2592 12 11.0058 11.2533 11.0058 10.3333L11.0058 4C11.0059 3.54 10.8192 3.12334 10.5192 2.82ZM5.3392 4.66666L1.3392 4.66666L1.3392 1.33334L5.3392 1.33334L5.3392 4.66666ZM9.3392 4.66666C8.97255 4.66666 8.67255 4.36666 8.67255 4C8.67255 3.63334 8.97255 3.33334 9.3392 3.33334C9.70586 3.33334 10.0059 3.63334 10.0059 4C10.0059 4.36666 9.70586 4.66666 9.3392 4.66666Z" fill="white"/>
//                                             </svg> $25.76
//                                         </div>
//                                     </div>
//
//                                     <div className='selected'>
//                                         <ion-icon name="checkmark-circle"></ion-icon>
//                                     </div>
//                                 </div>
//                                 <div className='route-body'>
//                                     <div className='swaprouteFrm'>
//                                         1ETH <span id='location'>on Ethereum</span>
//                                     </div>
//                                     <div className='passtru'>
//                                         <div className='icon'>
//                                             <img src={hypen} alt='hypen.svg'></img>
//                                         </div>
//                                         <div className='passtru_name'>hypen</div>
//                                     </div>
//                                     <div className='passtru'>
//                                         <div className='icon'>
//                                             <img src={inch} alt='hypen.svg'></img>
//                                         </div>
//                                         <div className='passtru_name'>1Inch</div>
//                                     </div>
//                                     <div className='swaprouteto'>
//                                         2098.444 DAI <span id='location'>on Avalanche</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='save_route-btn'>
//                             <button>Save Route</button>
//                         </div>
//                     </div>
//                 )}
//
//                 {swapRouteActions === 'Lowest gas fee' && (
//                     <div id='lowest-gas-fee'>
//                         <div className='card'>
//                             <ion-icon name="warning-outline"></ion-icon>
//                         </div>
//                     </div>
//                 )}
//
//             </div>
//         </div>
//     </div>
// </CustomModal>