import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalProductFastBuy.css';

const ModalProductFastBuy = ({ id_producto, onClose }) => {
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]); // Cambiamos a un nuevo estado para almacenar las variantes
    const [selectedSize, setSelectedSize] = useState(''); // Almacena solo el ID de la variante seleccionada
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductById/${id_producto}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchGetVariantes = async () => {
            try {
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/variants/getVariants/${id_producto}`);
                const data = await response.json();

                if (response.ok) {
                    setSizes(data); // Guardamos las variantes en un nuevo estado
                } else {
                    console.error('Error al obtener las variantes:', data.message);
                }
            } catch (error) {
                console.error('Error al obtener las variantes:', error);
            }
        };

        if (id_producto) {
            fetchProductDetails();
            fetchGetVariantes();
        }
    }, [id_producto]);

    const handleQuickBuy = async () => {
        const id_usuario = localStorage.getItem('id');
        console.log('User ID:', id_usuario);
        console.log('Product ID:', id_producto);
        console.log('Quantity:', quantity);
        console.log('Selected Size:', selectedSize); // Ahora debería mostrar el ID de la variante

        if (!id_usuario || !quantity || !selectedSize) {
            alert('Por favor selecciona una talla y cantidad válidas.');
            return;
        }

        try {
            const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_usuario,
                    id_producto,
                    cantidad: quantity,
                    id_variante: selectedSize // Enviar el ID de la variante seleccionada
                }),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Producto agregado al carrito.');
                navigate('/cart');
            } else {
                console.error('Error al agregar producto al carrito:', data.message);
                alert('Error al agregar producto al carrito.');
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

    if (!product) {
        return (
            <div className="quick-purchase-modal">
                <button onClick={onClose} className="close-btn">×</button>
                <div className="modal-content">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay scrollable-content">
            <div className="modal-content2 modal-horizontal scrollable-content">
                <button onClick={onClose} className="close-btn2">×</button>
                <div className="modal-body">
                    <div className="modal-column2">
                        <img src={product.URL_IMAGEN} alt={product.NOMBRE_PRODUCTO} className="product-image" />
                    </div>

                    <div className="modal-column2 scrollable-content">
                        <h3>{product.MARCA}</h3>
                        <h2>{product.NOMBRE_PRODUCTO}</h2>
                        <p className="price">Q{product.PRECIO}</p>
                        <p className="installments">12 cuotas sin intereses de Q{(product.PRECIO / 12).toFixed(2)}</p>
                        <p>Disponible con Visa y Mastercard</p>

                        <div className="sizes">
                            <h4>Talla</h4>
                            <select
                                value={selectedSize} // Ahora se enlaza directamente al ID de la variante seleccionada
                                onChange={(e) => setSelectedSize(e.target.value)} // Solo almacenamos el ID de la variante
                            >
                                <option value="" disabled>Selecciona una talla</option>
                                {sizes && sizes.map((size) => (
                                    <option key={size.ID_VARIANTE} value={size.ID_VARIANTE}>
                                        {size.NOMBRE_TALLA}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="quantity-row">
                            <h4>Cantidad</h4>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                min="1"
                            />
                        </div>
                        <button className="buy-btn" onClick={handleQuickBuy}>Comprar</button>
                        <p className="description">{product.DESCRIPCION}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProductFastBuy;
