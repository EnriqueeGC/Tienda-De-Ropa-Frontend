import React, { useState, useEffect } from 'react';
import logo from '../assets/img/logo.jpg'
import './SearchModal.css';

function SearchModal({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Cargar las búsquedas recientes desde el almacenamiento local al abrir el modal
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, [isOpen]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      const updatedSearches = [search, ...recentSearches.filter((item) => item !== search)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      setSearch('');
    }
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const handleDeleteRecentSearch = (term) => {
    const updatedSearches = recentSearches.filter((item) => item !== term);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    isOpen && (
      <div className="search-modal-overlay">
        <div className="search-modal-container">
          <div className="search-modal-logo">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="search-modal-input-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={handleSearch}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className="search-input"
              />
              {search && (
                <span className="clear-search" onClick={handleClearSearch}>
                  &times;
                </span>
              )}
            </div>
            <div className="search-suggestions">
              <p>Términos de búsqueda populares</p>
              <div className="suggestions">
                <span>Jordan</span>
                <span>Air Force 1</span>
                <span>Zapatillas</span>
                <span>Dunk Low</span>
                <span>Nike Tech</span>
                <span>Botas de Futbol</span>
              </div>
              <p>Búsquedas recientes</p>
              <div className="recent-searches">
                {recentSearches.length > 0 ? (
                  recentSearches.map((term, index) => (
                    <div key={index} className="recent-search-item">
                      <span>{term}</span>
                      <span
                        className="delete-search"
                        onClick={() => handleDeleteRecentSearch(term)}
                      >
                        &times;
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No hay búsquedas recientes</p>
                )}
              </div>
            </div>
          </div>
          <div className="search-modal-cancel">
            <button onClick={onClose} className="cancel-button">Cancelar</button>
          </div>
        </div>
      </div>
    )
  );
}

export default SearchModal;
