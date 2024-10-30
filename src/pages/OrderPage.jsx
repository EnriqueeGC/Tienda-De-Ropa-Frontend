import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
    const { id_usuario, id_pedido } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/order/pedido/${id_usuario}/${id_pedido}`);
                
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los detalles del pedido');
                }
                
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id_usuario, id_pedido]);

    if (loading) return <div className="order-page">Cargando detalles del pedido...</div>;
    if (error) return <div className="order-page error">Error: {error}</div>;

    return (
        <div className="order-page">
            <h2>Detalles de la Compra</h2>
            <div className="order-info">
                <p><strong>Pedido ID:</strong> {orderData.id_pedido}</p>
                <p><strong>Fecha del Pedido:</strong> {new Date(orderData.fecha_pedido).toLocaleDateString()}</p>
                <p><strong>Estado del Pedido:</strong> {orderData.estado_pedido}</p>
                <p><strong>Total:</strong> Q{orderData.total_pago.toFixed(2)}</p>
            </div>
            <h3>Productos:</h3>
            <div className="order-details">
                {orderData.detalles.map((item, index) => (
                    <div key={index} className="product-item">
                        <p><strong>Producto:</strong> {item.nombre_producto}</p>
                        <p><strong>Cantidad:</strong> {item.cantidad}</p>
                        <p><strong>Precio unitario:</strong> Q{item.precio_unitario.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;