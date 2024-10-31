import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './CartPage.css';
const CartPage = () => {
    const navigate = useNavigate(); // Inicializa el hook de navegación
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const fetchCartDetails = async () => {
        const id_usuario = localStorage.getItem('id');
        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/cart/getCartDetails/${id_usuario}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                setCartItems(data.detalles);
                calculateTotal(data.detalles);
            } else {
                console.error('Error al obtener los detalles del carrito:', data.message);
            }
        } catch (error) {
            console.error('Error fetching cart details:', error);
        }
    };
    const calculateTotal = (items) => {
        const totalAmount = items.reduce((acc, item) => {
            const precio = parseFloat(item.PRECIO) || 0;
            const cantidad = parseInt(item.CANTIDAD) || 1;
            return acc + precio * cantidad;
        }, 0);
        setTotal(totalAmount);
    };
    useEffect(() => {
        fetchCartDetails();
    }, []);
    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = cartItems.map((item, idx) => 
            idx === index ? { ...item, CANTIDAD: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems);
    };
    const handleRemoveFromCart = async (id_detalle_carrito) => {
        const confirmRemove = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmRemove) return;
        try {
            const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/cart/deleteCartItem', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_detalle_carrito }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Producto eliminado del carrito.');
                fetchCartDetails();
            } else {
                console.error('Error al eliminar producto del carrito:', data.message);
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };
    const handleSeguirComprando = () => {
        window.location.href = '/'; // Redirigir a la página principal
    };
    const handleCheckout = () => {
        navigate('/payment-methods', { state: { total, cartItems }}); // Redirige a la gestión de pagos con el total
    };
    console.log(cartItems);
    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>No hay productos en tu carrito.</p>
            ) : (
                <div className="cart-table">
                    <div className="cart-header">
                        <div className="header-item">Producto</div>
                        <div className="header-item">Precio</div>
                        <div className="header-item">Cantidad</div>
                        <div className="header-item">Total</div>
                    </div>
                    {cartItems.map((item, index) => (
                        <div key={item.ID_DETALLE_CARRITO} className="cart-row">
                            <div className="product-info">
                                <div className="remove-button" onClick={() => handleRemoveFromCart(item.ID_DETALLE_CARRITO)}>×</div>
                                <img src={item.URL_IMAGEN} alt={item.NOMBRE_PRODUCTO} className="product-image2" />
                                <div className="product-details">
                                    <h2>{item.NOMBRE_PRODUCTO}</h2>
                                    <p>{item.NOMBRE_TALLA}</p>
                                    <p>{item.MARCA}</p>
                                </div>
                            </div>
                            <div className="product-price">Q{parseFloat(item.PRECIO).toFixed(2)}</div>
                            <div className="product-quantity">
                                <input
                                    type="number"
                                    value={item.CANTIDAD}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                />
                            </div>
                            <div className="product-total">
                                Q{(parseFloat(item.PRECIO) * (parseInt(item.CANTIDAD) || 1)).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    <div className="cart-footer">
                        <h2>Total: Q{total.toFixed(2)}</h2>
                        <button className="checkout-button" onClick={handleCheckout}>Comprar</button>
                    </div>
                </div>
            )}
            <button onClick={handleSeguirComprando}>Seguir comprando</button>
        </div>
    );
};
export default CartPage;