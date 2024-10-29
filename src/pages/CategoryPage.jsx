import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { gender, category, subcategory } = useParams();  // Obtener los parámetros de la URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  console.log(gender, category, subcategory);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Construir la URL de la API en función de los filtros disponibles
      let url = `https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductByGender?genero=${gender}&page=${page}&limit=${limit}`;

      if (category) {
        url = `https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductByGenderCategory?genero=${gender}&id_categoria=${category}&page=${page}&limit=${limit}`;
      } else if (subcategory) {
        url = `https://tienda-de-ropa-v6h4.onrender.com/api/products/getProductBySubcategory?genero=${gender}&id_subcategoria=${subcategory}&page=${page}&limit=${limit}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("La respuesta de la API no es un array:", data);
          setProducts([]);  // Asigna un array vacío si no es un array
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);  // Asigna un array vacío en caso de error
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
    </div>
  );
};

export default CategoryPage;

