import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './ProductManagment.css';
import ModalProduct from '../components/ModalProduct';
import ModalVariantProduct from '../components/ModalVariantProduct';

const GestionDeInventario = ({ rolId }) => {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
    const [mostrarModalStock, setMostrarModalStock] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    // Estado para la paginación
    const [page, setPage] = useState(1);
    const limit = 10; // Número de productos por página

    useEffect(() => {
        fetchProductos();
    }, [page, filtro]);

    const fetchProductos = async () => {
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/getAll?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const data = await response.json();
            setProductos(data);
            console.log(data);
        } catch (error) {
            console.error('Error al obtener los productos', error);
        }
    };

    const handleEliminarProducto = async (id_producto) => {
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/deleteProductById/${id_producto}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            setProductos(prev => prev.filter(producto => producto.ID_PRODUCTO !== id_producto));
        } catch (error) {
            console.error('Error al eliminar el producto', error);
        }
    };

    const handleModificar = (producto) => {
        setProductoSeleccionado(producto);
        setIsEditMode(true);
        setMostrarModalProducto(true);
    };

    const handleModificarStock = (producto) => {
        setProductoSeleccionado(producto);
        setMostrarModalStock(true);
    };

    const handleAgregarProducto = () => {
        setProductoSeleccionado(null);
        setIsEditMode(false);
        setMostrarModalProducto(true);
    };

    const handleCerrarModalProducto = () => {
        setMostrarModalProducto(false);
        setProductoSeleccionado(null);
    };

    const handleCerrarModalStock = () => {
        setMostrarModalStock(false);
        setProductoSeleccionado(null);
    };

    const productosFiltrados = productos.filter(producto => 
        producto.NOMBRE_PRODUCTO.toLowerCase().includes(filtro.toLowerCase())
    );

    // Manejo de paginación
    const handleNextPage = () => setPage(prevPage => prevPage + 1);
    const handlePrevPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));

    return (
        <div className="gestion-inventario">
            <div className="header-inventario">
                <div className="links-categorias">
                    <a href="/ropa">Ropa</a>
                    <span className="divider">|  </span>
                    <a href="/zapatos">   Zapatos</a>
                </div>
                <div className="busqueda-agregar">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="agregar-producto" onClick={handleAgregarProducto}>Agregar Producto</button>
                </div>
            </div>
            <h1>Gestión de Inventario</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Género</th>
                        <th>Marca</th>
                        <th>Subcategoría</th>
                        <th>Acciones</th>
                        <th>Tallas y Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.map(producto => (
                        <tr key={producto.ID_PRODUCTO}>
                            <td>{producto.ID_PRODUCTO}</td>
                            <td>{producto.NOMBRE_PRODUCTO}</td>
                            <td>{producto.DESCRIPCION}</td>
                            <td>Q {producto.PRECIO}</td>
                            <td>{producto.GENERO}</td>
                            <td>{producto.MARCA}</td>
                            <td>{producto.NOMBRE_SUBCATEGORIA}</td>
                            <td className="acciones">
                                <button className='action-Button' onClick={() => handleModificar(producto)}>
                                    <FaEdit />
                                </button>
                                {parseInt(rolId) === 1 && (
                                    <button className='action-Button' onClick={() => handleEliminarProducto(producto.ID_PRODUCTO)}>
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </td>
                            <td>{producto.TALLAS_STOCK}</td>
                            <td>
                                <button className='action-Button' onClick={() => handleModificarStock(producto)}>
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botones de paginación */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
                <span>Página {page}</span>
                <button onClick={handleNextPage}>Siguiente</button>
            </div>

            {mostrarModalProducto && (
                <ModalProduct
                    producto={productoSeleccionado}
                    onClose={handleCerrarModalProducto}
                    isEditMode={isEditMode}
                    rolId={rolId}
                />
            )}

            {mostrarModalStock && (
                <ModalVariantProduct
                    producto={productoSeleccionado}
                    onClose={handleCerrarModalStock}
                />
            )}
        </div>
    );
};

export default GestionDeInventario;
