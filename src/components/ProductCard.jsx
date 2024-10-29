import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; 
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import './ProductCard.css';
import ModalProductFastBuy from './ModalProductFastBuy';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate(); 

  const handleQuickBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGotoCart = () => {
    navigate('/cart'); 
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.URL_IMAGEN} alt={product.NOMBRE_PRODUCTO} className="product-image" />
        <button className="quick-buy-button" onClick={handleQuickBuyClick}>
          Compra Rápida
        </button>
      </div>
      <h3>{product.NOMBRE_PRODUCTO}</h3>
      <p>Precio: Q{product.PRECIO}</p>
      <div className="heart-icon">
        <FaHeart />
      </div>
      <div className="bag-icon">
        <FaShoppingBag  onClick={handleGotoCart}/>
      </div>

      {/* Modal de Compra Rápida */}
      {isModalOpen && (
        <ModalProductFastBuy
          id_producto={product.ID_PRODUCTO}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductCard;

