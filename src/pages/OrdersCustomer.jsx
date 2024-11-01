import React, { useEffect, useState } from 'react';
import './OrdersCustomer.css';
import Modal from '../components/ModalPedido';

const PedidosPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPedidos = async () => {
            const id_usuario = localStorage.getItem('id'); // Asegúrate de que este valor se use correctamente
            try {
                // Asegúrate de utilizar `id_usuario` en lugar de un valor fijo
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/order/getOrdersByUser/${id_usuario}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Error en la respuesta del servidor");
                }

                console.log(data); // Para verificar la estructura de la respuesta
                setPedidos(data.result || []); // Cambia a data.pedidos según tu respuesta
            } catch (error) {
                console.error("Error al obtener los pedidos:", error);
                alert("Error al obtener los pedidos");
            }
        };

        fetchPedidos();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="pedidos-page">
            <h1>Mis Pedidos</h1>
            <table className="pedidos-table">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.length > 0 ? (
                        pedidos.map((pedido) => (
                            <tr key={pedido.ID_DETALLE_PEDIDO} onClick={() => openModal(pedido)}>
                                <td>{pedido.ID_PEDIDO}</td>
                                <td>{pedido.NOMBRE_PRODUCTO}</td>
                                <td>{pedido.CANTIDAD}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay pedidos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {selectedProduct && (
                        <div className="modal-content-order">
                            <h2>Detalles del Pedido</h2>
                            <img className="order-image" src={selectedProduct.URL_IMAGEN} alt={selectedProduct.NOMBRE_PRODUCTO} />
                            <p><strong>ID Pedido:</strong> {selectedProduct.ID_PEDIDO}</p>
                            <p><strong>Nombre del Producto:</strong> {selectedProduct.NOMBRE_PRODUCTO}</p>
                            <p><strong>Cantidad:</strong> {selectedProduct.CANTIDAD}</p>
                            <p><strong>Precio Unitario:</strong> {selectedProduct.PRECIO_UNITARIO}</p>
                            <p><strong>Fecha de Pedido:</strong> {new Date(selectedProduct.FECHA_PEDIDO).toLocaleDateString()}</p>
                            <p><strong>Estado del Pedido:</strong> {selectedProduct.ESTADO_PEDIDO}</p>
                            <p><strong>Total de Pago:</strong> {selectedProduct.TOTAL_PAGO}</p>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default PedidosPage;
