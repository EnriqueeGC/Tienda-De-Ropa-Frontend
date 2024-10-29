import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { gender, category, subcategory } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);  // Estado para el mensaje de error
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage(null);  // Resetear el mensaje de error antes de cada nueva petición

      let url = `https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductByGender?genero=${gender}&page=${page}&limit=${limit}`;
      
      if (category) {
        url = `https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductByGenderCategory?genero=${gender}&id_categoria=${category}&page=${page}&limit=${limit}`;
      } else if (subcategory) {
        url = `https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductByGenderSubcategory?genero=${gender}&id_subcategoria=${subcategory}&page=${page}&limit=${limit}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          // Si la respuesta no es un array, asume que es un mensaje de error
          setErrorMessage(data.message || "No se encontraron productos en esta categoría.");
          setProducts([]);  // Limpia el array de productos
        }
      } catch (error) {
        setErrorMessage("Ocurrió un error al obtener los productos. Por favor, intenta nuevamente.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [gender, category, subcategory, page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="category-page2">
      <h2>Products for {gender}</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <>
          <div className="products-section2">
            {products.map(product => (
              <ProductCard key={product.ID_PRODUCTO} product={product} />
            ))}
          </div>
          <div className='pagination'>
            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
