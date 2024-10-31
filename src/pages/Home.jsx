import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css'; // Archivo de estilos para la página de inicio

const Home = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;

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
        const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/getAll?page=${page}&limit=${limit}`); // Cambia el endpoint según tu API
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="home">
      {/* Barra de Anuncios */}
      <div className="announcement-bar">
        <p>{ads[currentAd]}</p>
      </div>

      {/* Área para Imágenes y Videos Promocionales */}
      <div className="promotional-section">
        {/* Espacio para agregar imágenes o videos */}
   {/*      <div className="promo-item">Aquí puedes agregar un anuncio en imagen o video.</div>
 */}      </div>

      {/* Sección de Productos */}
      <div className="category-page22">
        <div className="products-section22">
          {products.map((product) => (
            <ProductCard key={product.ID_PRODUCTO} product={product} />
          ))}
        </div>
      </div>
      <div className='pagination2'>
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Home;
