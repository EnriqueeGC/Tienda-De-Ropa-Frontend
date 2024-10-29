import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css'; // Archivo de estilos para la página de inicio

const Home = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [products, setProducts] = useState([]);

  // Mensajes para la barra de anuncios
  const ads = [
    "¡Novedades en nuestra colección!",
    "Entregas y devoluciones gratuitas"
  ];

  // Cambiar el anuncio cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [ads.length]);

  // Fetch de productos desde tu API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/getAll`); // Cambia el endpoint según tu API
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Barra de Anuncios */}
      <div className="announcement-bar">
        <p>{ads[currentAd]}</p>
      </div>

      {/* Área para Imágenes y Videos Promocionales */}
      <div className="promotional-section">
        {/* Espacio para agregar imágenes o videos */}
        <div className="promo-item">Aquí puedes agregar un anuncio en imagen o video.</div>
      </div>

      {/* Sección de Productos */}
      <div className="products-section">
        {products.map((product) => (
            <ProductCard key={product.ID_PRODUCTO} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
