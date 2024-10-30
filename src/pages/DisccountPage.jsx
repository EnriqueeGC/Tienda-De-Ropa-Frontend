import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './DisccountPage.css';

const DisccountPage = () => {
    const [descuentos, setDescuentos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para determinar si estamos editando o agregando
    const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);

    const [editingDiscountName, setEditingDiscountName] = useState('');
    const [editingDiscountValue, setEditingDiscountValue] = useState('');
    const [editingDiscountStartDate, setEditingDiscountStartDate] = useState('');
    const [editingDiscountEndDate, setEditingDiscountEndDate] = useState('');

    useEffect(() => {
        const fetchDescuentos = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/discounts/getAll');
                if (!response.ok) throw new Error('Error al obtener los descuentos');
                const data = await response.json();
                setDescuentos(data);
            } catch (error) {
                console.error('Error al obtener los descuentos', error);
            }
        };

        fetchDescuentos();
    }, []);

    const handleEliminarDescuento = async (id_descuento) => {
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/discounts/deleteDiscountById/${id_descuento}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el descuento');
            setDescuentos(descuentos.filter(descuento => descuento.ID_DESCUENTO !== id_descuento));
        } catch (error) {
            console.error('Error al eliminar el descuento', error);
        }
    };

    const handleModificar = (descuento) => {
        setDescuentoSeleccionado(descuento.ID_DESCUENTO);
        setEditingDiscountName(descuento.TIPO_DESCUENTO);
        setEditingDiscountValue(descuento.VALOR_DESCUENTO);
        setEditingDiscountStartDate(descuento.FECHA_INICIO.split('T')[0]);
        setEditingDiscountEndDate(descuento.FECHA_FIN.split('T')[0]);
        setIsModalOpen(true);
        setIsEditing(true); // Indicar que estamos editando
    };

    const handleGuardarCambios = async () => {
        try {
            const response = isEditing 
                ? await fetch(`http://localhost:3000/api/discounts/updateDiscountById/${descuentoSeleccionado}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tipo_descuento: editingDiscountName,
                        valor_descuento: editingDiscountValue,
                        fecha_inicio: editingDiscountStartDate,
                        fecha_fin: editingDiscountEndDate
                    })
                })
                : await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/discounts/createDiscount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tipo_descuento: editingDiscountName,
                        valor_descuento: editingDiscountValue,
                        fecha_inicio: editingDiscountStartDate,
                        fecha_fin: editingDiscountEndDate
                    })
                });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al modificar/agregar el descuento');
            }

            const updatedDiscount = await response.json();
            if (isEditing) {
                setDescuentos(descuentos.map(descuento => descuento.ID_DESCUENTO === updatedDiscount.ID_DESCUENTO ? updatedDiscount : descuento));
            } else {
                setDescuentos([...descuentos, updatedDiscount]); // Agregar el nuevo descuento
            }

            setIsModalOpen(false);
            setDescuentoSeleccionado(null);
            setIsEditing(false); // Reiniciar el estado de edición
        } catch (error) {
            console.error('Error al modificar/agregar el descuento en el servidor', error);
        }
    };

    const handleAgregarDescuento = () => {
        setEditingDiscountName('');
        setEditingDiscountValue('');
        setEditingDiscountStartDate('');
        setEditingDiscountEndDate('');
        setIsModalOpen(true);
        setIsEditing(false); // Indicar que estamos agregando
    };

    return (
        <div className="descuentos-page">
            <h2>Descuentos</h2>
            
            <table className="descuentos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Valor Descuento</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {descuentos.map(descuento => (
                        <tr key={descuento.ID_DESCUENTO}>
                            <td>{descuento.ID_DESCUENTO}</td>
                            <td>{descuento.TIPO_DESCUENTO}</td>
                            <td>{descuento.VALOR_DESCUENTO}</td>
                            <td>{descuento.FECHA_INICIO}</td>
                            <td>{descuento.FECHA_FIN}</td>
                            <td className="action-buttons">
                                <FaEdit onClick={() => handleModificar(descuento)} />
                                <FaTrashAlt onClick={() => handleEliminarDescuento(descuento.ID_DESCUENTO)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAgregarDescuento}>Agregar Descuento</button> 

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>{isEditing ? 'Modificar Descuento' : 'Agregar Descuento'}</h2>
                        <form>
                            <label>Tipo de Descuento:</label>
                            <input
                                type="text"
                                value={editingDiscountName}
                                onChange={(e) => setEditingDiscountName(e.target.value)}
                            />
                            <label>Valor del Descuento:</label>
                            <input
                                type="number"
                                value={editingDiscountValue}
                                onChange={(e) => setEditingDiscountValue(e.target.value)}
                            />
                            <label>Fecha de Inicio:</label>
                            <input
                                type="date"
                                value={editingDiscountStartDate}
                                onChange={(e) => setEditingDiscountStartDate(e.target.value)}
                            />
                            <label>Fecha de Fin:</label>
                            <input
                                type="date"
                                value={editingDiscountEndDate}
                                onChange={(e) => setEditingDiscountEndDate(e.target.value)}
                            />
                        </form>
                        <div className="modal-buttons">
                            <button onClick={handleGuardarCambios}>Guardar</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisccountPage;
