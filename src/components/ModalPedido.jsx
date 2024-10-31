import React from 'react';
import './ModalPedido.css'; // Asegúrate de tener estilos para el modal

const Modal = ({ onClose, children }) => {
    return (
        <div className="modal-overlay-order" onClick={onClose}>
            <div className="modal-order" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-order" onClick={onClose}>X</button>
                {children}
                <button className="modal-back-order" onClick={onClose}>Regresar</button>
            </div>
        </div>
    );
};

export default Modal;
