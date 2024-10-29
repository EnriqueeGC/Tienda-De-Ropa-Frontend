import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './ModalProduct.css';

const ModalVariantProduct = ({ producto, onClose }) => {
    const [id_producto, setId_producto] = useState(producto.ID_PRODUCTO);
    const [id_talla, setId_talla] = useState(''); // Estado para almacenar el id_talla actual
    const [stock, setStock] = useState('');
    const [tallas, setTallas] = useState([]);
    const [variantes, setVariantes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editandoVariante, setEditandoVariante] = useState(null); // Estado para la variante que se está editando

    useEffect(() => {
        const fetchTallas = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/sizes/getAllSizes');
                if (!response.ok) {
                    throw new Error('Error al obtener las tallas');
                }
                const data = await response.json();
                setTallas(data);
            } catch (error) {
                console.error('Error al obtener las tallas', error);
            }
        };

        const fetchVariantes = async () => {
            try {
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/variants/getVariants/${producto.ID_PRODUCTO}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las variantes');
                }
                const data = await response.json();
                setVariantes(data);
            } catch (error) {
                console.error('Error al obtener las variantes', error);
            }
        };

        fetchTallas();
        fetchVariantes();
    }, [producto.ID_PRODUCTO]);

    const handleAgregarVariantes = async () => {
        console.log('id_talla', id_talla);
        console.log('stock', stock);
        try {
            const variantData = {
                id_producto,
                id_talla: id_talla || editandoVariante?.ID_TALLA,  // Usa el id_talla actual si no se ha cambiado
                stock
            };

            const url = editandoVariante
                ? `https://tienda-de-ropa-v6h4.onrender.com/api/variants/updateVariantById/${editandoVariante.ID_VARIANTE}`
                : `https://tienda-de-ropa-v6h4.onrender.com/api/variants/addVariants/${producto.ID_PRODUCTO}`;

            const method = editandoVariante ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(variantData)
            });

            if (!response.ok) {
                throw new Error('Error al agregar o modificar la variante');
            }

            const nuevaVariante = await response.json();

            if (editandoVariante) {
                setVariantes(
                    variantes.map(variante =>
                        variante.ID_VARIANTE === nuevaVariante.ID_VARIANTE ? nuevaVariante : variante
                    )
                );
            } else {
                setVariantes([...variantes, nuevaVariante]);
            }

            setShowForm(false); 
            setEditandoVariante(null); 
        } catch (error) {
            console.error('Error al agregar o modificar la variante', error);
        }
    };

    const handleModificarVariante = (variante) => {
        setEditandoVariante(variante); 
        setId_talla(variante.ID_TALLA); // Establece la talla actual para la variante en el estado
        setStock(variante.STOCK); 
        setShowForm(true); 
    };

    const handleEliminarVariante = async (id_variante) => {
        if (!id_variante) {
            console.error("El ID de la variante es inválido o no existe.");
            return;
        }

        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/variants/deleteVariantById/${id_variante}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la variante');
            }

            setVariantes(variantes.filter(variante => variante.ID_VARIANTE !== id_variante));
        } catch (error) {
            console.error('Error al eliminar la variante', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{showForm ? (editandoVariante ? "Modificar Variante" : "Agregar Variantes") : `Variantes del Producto: ${producto.NOMBRE_PRODUCTO}`}</h2>

                {showForm ? (
                    <>
                        <select 
                            value={id_talla} 
                            onChange={(e) => setId_talla(e.target.value)}>
                            {/* Muestra la talla seleccionada si estamos editando */}
                            <option value="" disabled>
                                {editandoVariante ? editandoVariante.NOMBRE_TALLA : "Seleccione una talla"}
                            </option>
                            {tallas.map(talla => (
                                <option key={talla.ID_TALLA} value={talla.ID_TALLA}>
                                    {talla.NOMBRE_TALLA}
                                </option>
                            ))}
                        </select>

                        <label>Stock:</label>
                        <input value={stock} onChange={(e) => setStock(e.target.value)} />

                        <button onClick={handleAgregarVariantes}>
                            {editandoVariante ? "Modificar" : "Agregar"}
                        </button>
                        <button onClick={() => {
                            setShowForm(false);
                            setEditandoVariante(null); // Limpiar el estado de edición al cancelar
                        }}>Cancelar</button>
                    </>
                ) : (
                    <>
                        {variantes.length === 0 ? (
                            <p>No hay variantes para este producto.</p>
                        ) : (
                            <table className="tabla-variantes">
                                <thead>
                                    <tr>
                                        <th>Talla</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {variantes.map(variante => (
                                        <tr key={variante.ID_VARIANTE}>
                                            <td>{variante.NOMBRE_TALLA}</td>
                                            <td>{variante.STOCK}</td>
                                            <td>
                                                <button className="boton-modificar" onClick={() => handleModificarVariante(variante)}>
                                                    <FaEdit />
                                                </button>
                                                <button className="boton-eliminar" onClick={() => handleEliminarVariante(variante.ID_VARIANTE)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <button onClick={() => setShowForm(true)}>Agregar Variante</button>
                        <button onClick={onClose}>Cancelar</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalVariantProduct;
