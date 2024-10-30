// DiscountModal.js
import React, { useState } from 'react';

const DiscountModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
    const [discount, setDiscount] = useState({
        tipo: initialData.tipo || '',
        valor: initialData.valor || '',
        fechaInicio: initialData.fechaInicio || '',
        fechaFin: initialData.fechaFin || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiscount((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(discount);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{initialData.id ? "Modificar Descuento" : "Agregar Descuento"}</h3>
                <form>
                    <label>Tipo de Descuento:</label>
                    <input
                        type="text"
                        name="tipo"
                        value={discount.tipo}
                        onChange={handleChange}
                    />

                    <label>Valor del Descuento:</label>
                    <input
                        type="number"
                        name="valor"
                        value={discount.valor}
                        onChange={handleChange}
                    />

                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={discount.fechaInicio}
                        onChange={handleChange}
                    />

                    <label>Fecha de Fin:</label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={discount.fechaFin}
                        onChange={handleChange}
                    />
                </form>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DiscountModal;
