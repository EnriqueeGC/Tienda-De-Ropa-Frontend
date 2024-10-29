import './ModalSubcategory.css';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ModalSubcategory = ({ onClose, onDelete, id_categoria }) => {
    const [nombre, setNombre_subcategoria] = useState('');
    const [subcategorias, setSubcategorias] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // Nuevo estado para subcategoría en edición
    const [nombreCategoriaActual, setNombreCategoriaActual] = useState(''); // Para almacenar el nombre de la categoría actual

    useEffect(() => {
        const fetchSubcategorias = async () => {
            try {
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/subcategories/getSubcategoriesByCategoryId/${id_categoria}`);
                if (!response.ok) throw new Error('Error al obtener las subcategorías');
                const data = await response.json();
                setSubcategorias(data);
            } catch (error) {
                console.error('Error al obtener las subcategorías', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/categories/getAll');
                if (!response.ok) throw new Error('Error al obtener las categorías');
                const data = await response.json();
                setCategories(data);
                // Asignar el nombre de la categoría actual
                const categoriaActual = data.find((categoria) => categoria.ID_CATEGORIA === id_categoria);
                if (categoriaActual) setNombreCategoriaActual(categoriaActual.NOMBRE_CATEGORIA);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };

        fetchCategories();
        fetchSubcategorias();
    }, [id_categoria]);

    const handleAgregarSubcategoria = async () => {
        try {
            const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/subcategories/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_categoria, nombre })
            });

            if (!response.ok) throw new Error('Error al agregar la subcategoría');
            const data = await response.json();
            setSubcategorias([...subcategorias, data]);
            setIsAddModalOpen(false);
            setNombre_subcategoria(''); // Limpiar el campo de nombre
        } catch (error) {
            console.error('Error al agregar la subcategoría', error);
        }
    };

    const handleEditSubcategory = (id) => {
        setEditingId(id);
        const subcategoria = subcategorias.find((sub) => sub.ID_SUBCATEGORIA === id);
        if (subcategoria) setNombre_subcategoria(subcategoria.NOMBRE);
    };

    const handleUpdateSubcategory = async (id) => {
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/subcategories/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre })
            });

            if (!response.ok) throw new Error('Error al actualizar la subcategoría');
            const updatedSubcategorias = subcategorias.map((sub) => (sub.ID_SUBCATEGORIA === id ? { ...sub, NOMBRE: nombre } : sub));
            setSubcategorias(updatedSubcategorias);
            setEditingId(null);
            setNombre_subcategoria(''); // Limpiar el campo de nombre
        } catch (error) {
            console.error('Error al actualizar la subcategoría', error);
        }
    };

    return (
        <div className='modal-overlay-subcategory'>
            <div className='modal-content-subcategory'>
                {/*                 <span className='close' onClick={onClose}>&times;</span> */}
                <h2>Gestión de Subcategorías</h2>
                <h3>Categoría: {nombreCategoriaActual}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategorias.map((subcategoria) => (
                            <tr key={subcategoria.ID_SUBCATEGORIA}>
                                <td>{subcategoria.ID_SUBCATEGORIA}</td>
                                <td>
                                    {editingId === subcategoria.ID_SUBCATEGORIA ? (
                                        <input
                                            value={nombre}
                                            onChange={(e) => setNombre_subcategoria(e.target.value)}
                                        />
                                    ) : (
                                        subcategoria.NOMBRE
                                    )}
                                </td>
                                <td>
                                    {editingId === subcategoria.ID_SUBCATEGORIA ? (
                                        <button onClick={() => handleUpdateSubcategory(subcategoria.ID_SUBCATEGORIA)}>Guardar</button>
                                    ) : (
                                        <button onClick={() => handleEditSubcategory(subcategoria.ID_SUBCATEGORIA)}>
                                            <FaEdit />
                                        </button>
                                    )}
                                    <button onClick={() => onDelete(subcategoria.ID_SUBCATEGORIA)}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={() => setIsAddModalOpen(true)}>Agregar Subcategoría</button>
                <button onClick={onClose}>Cerrar</button>

                {isAddModalOpen && (
                    <div className='modal-overlay-subcategory'>
                        <div className='modal-content-subcategory2'>
                                <h3>Categoría: {nombreCategoriaActual}</h3>
                            <label>Nombre Subcategoría: </label>
                            <input value={nombre} onChange={(e) => setNombre_subcategoria(e.target.value)} />
                            <div>
                                <button onClick={handleAgregarSubcategoria}>Agregar Subcategoria</button>
                                <button onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalSubcategory;
