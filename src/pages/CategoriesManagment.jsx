import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import './CategoriesManagment.css';
import ModalSubcategory from '../components/ModalSubcategory';

const CategoriesManagment = ({ rolId }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [isEditing, setIsEditing] = useState(null); // Estado para saber cuál categoría se está editando
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar categoría
    const [newCategoryName, setNewCategoryName] = useState(''); // Estado para el nombre de la nueva categoría
    const [editingCategoryName, setEditingCategoryName] = useState(''); // Estado para el nombre al editar

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/categories/getAll');
                if (!response.ok) throw new Error('Error al obtener las categorías');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleEliminarCategoria = async (id_categoria) => {
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/categories/deleteCategoryById/${id_categoria}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar la categoría');
            setCategorias(categorias.filter(categoria => categoria.ID_CATEGORIA !== id_categoria));
        } catch (error) {
            console.error('Error al eliminar la categoría', error);
        }
    };

    const handleModificar = (categoria) => {
        setIsEditing(categoria.ID_CATEGORIA);
        setEditingCategoryName(categoria.NOMBRE_CATEGORIA);
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditingCategoryName('');
    };

    const handleVerSubcategorias = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCategoriaSeleccionada(null);
    };

    const handleSaveEdit = async (id_categoria) => {
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/categories/updateCategoryById/${id_categoria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_categoria, nombre_categoria: editingCategoryName })
            });
            if (!response.ok) throw new Error('Error al actualizar la categoría');
            setCategorias(categorias.map(cat => cat.ID_CATEGORIA === id_categoria ? { ...cat, NOMBRE_CATEGORIA: editingCategoryName } : cat));
            setIsEditing(null);
            setEditingCategoryName('');
        } catch (error) {
            console.error('Error al actualizar la categoría', error);
        }
    };

    const handleAgregarCategoria = async () => {
        try {
            const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/categories/createCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre_categoria: newCategoryName })
            });
            if (!response.ok) throw new Error('Error al agregar la categoría');
            const newCategoria = await response.json();
            setCategorias([...categorias, newCategoria]);
            setIsAddModalOpen(false);
            setNewCategoryName('');
        } catch (error) {
            console.error('Error al agregar la categoría', error);
        }
    };

    return (
        <div className="container">
            <div className='container-tittle'>
                <h1>Gestión de Categorías</h1>
                <button className='icons' onClick={() => setIsAddModalOpen(true)}>Agregar Categoria</button>
            </div>

            {/* Modal para agregar categoría */}
            {isAddModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>Agregar Categoría</h2>
                        <input
                            type="text"
                            placeholder="Nombre de la nueva categoría"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button onClick={handleAgregarCategoria}>Guardar</button>
                        <button onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div className='container-table-categories'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria => (
                            <tr key={categoria.ID_CATEGORIA}>
                                <td>{categoria.ID_CATEGORIA}</td>
                                <td>
                                    {isEditing === categoria.ID_CATEGORIA ? (
                                        <input
                                            value={editingCategoryName}
                                            onChange={(e) => setEditingCategoryName(e.target.value)}
                                        />
                                    ) : (
                                        categoria.NOMBRE_CATEGORIA
                                    )}
                                </td>
                                <td>
                                    <button className='icons' onClick={() => handleVerSubcategorias(categoria)}>
                                        Ver Subcategorias
                                    </button>
                                    {parseInt(rolId) === 1 && (
                                        <>
                                            <button className="icons" onClick={() => handleEliminarCategoria(categoria.ID_CATEGORIA)}>
                                                <FaTrashAlt />
                                            </button>
                                            {isEditing === categoria.ID_CATEGORIA ? (
                                                <>
                                                    <button className="icons" onClick={() => handleSaveEdit(categoria.ID_CATEGORIA)}>
                                                        <FaCheck />
                                                    </button>
                                                    <button className="icons" onClick={handleCancelEdit}>
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="icons" onClick={() => handleModificar(categoria)}>
                                                    <FaEdit />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ModalSubcategory
                    onClose={handleCloseModal}
                    id_categoria={categoriaSeleccionada.ID_CATEGORIA}
                />
            )}
        </div>
    );
}

export default CategoriesManagment;

