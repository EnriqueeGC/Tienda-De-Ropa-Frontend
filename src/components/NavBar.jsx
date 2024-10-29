import React, { useState, useEffect } from 'react';
import { FaSearch, FaHeart, FaShoppingBag, FaBars } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css'; // Archivo de estilos para la barra de navegación
import logo from '../assets/img/logo.jpg'
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setUsername] = useState('');
  const [rolId, setRolId] = useState('');

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  const openSearchModal = () => setIsSearchOpen(true);
  const closeSearchModal = () => setIsSearchOpen(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [openDropdown, setOpenDropdown] = useState(null);


  useEffect(() => {
    // Comprobar si hay un token en el almacenamiento local
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('nombre');
    const storedRolId = localStorage.getItem('rolId'); // 1: Admin, 2: Empleado, 3: Cliente

    if (token && storedUsername) {
      setUsername(storedUsername);
      setRolId(storedRolId);
      setIsLoggedIn(true); // Usuario está logueado
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token al cerrar sesión
    localStorage.removeItem('nombre');
    localStorage.removeItem('rolId');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/login';
    // Redirigir a la página principal o de login si lo deseas
  };


  // Manejar el clic en el icono de favoritos
  const handleFavoritesClick = () => {
    if (isLoggedIn) {
      window.location.href = '/favorites'; // Redirigir a la página de favoritos si está logueado
    } else {
      window.location.href = '/login'; // Redirigir a login si no está logueado
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/'; // Redirigir al inicio al hacer clic en el logo
  };

  const handleShoppingCartClick = () => {
    window.location.href = '/cart'; // Redirigir al carrito de compras
  }

  const handleCategoryClick = (category) => {
    // Redirigir a la página de la categoría seleccionada
    window.location.href = `/category/${category}`;
  }

  const handleProductByGenderAndCategoryClick = (gender, category) => {
    // Redirigir a la página de la categoría seleccionada
    navigate(`/category/${gender}/${category}`);
  };

  return (
    <div className="central-panel">
      {/* Renderizamos las categorías y la top bar según el rol */}
      {(rolId === '1' || rolId === '2') ? (
        <>
          {/* Primero las categorías */}
          <div className="navbar">
            <div className="navbar-logo" onClick={handleLogoClick}>
              <img src={logo} className='logo-image' alt="Logo" />
            </div>
            <div className={`navbar-categories ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href="#">Nuevos</a></li>
                <div className="dropdown">
                  <li><a href="#" onClick={() => handleCategoryClick('Hombre')}>Hombre</a>

                    <div className="dropdown-menu">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleProductByGenderAndCategoryClick('Hombre', 122); }}>Zapatillas</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleProductByGenderAndCategoryClick('Hombre', 123); }}>Ropa</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleProductByGenderAndCategoryClick('Masculino', 102); }}>Deporte</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleProductByGenderAndCategoryClick('Hombre', 106); }}>Accesorios y Equipamiento</a>
                    </div>
                  </li>
                </div>

                <li><a href="#" onClick={() => handleCategoryClick('Mujer')}>Mujer</a></li>
                <li><a href="#" onClick={() => handleCategoryClick('Ninio')}>Niño/a</a></li>
              </ul>
            </div>
            <div className="navbar-icons">
              <FaSearch className="icon" />
              {/* {parseInt(rolId) === 3 && (
                <FaHeart className="icon" onClick={handleFavoritesClick} />
              )} */}
              <FaHeart className="icon" onClick={handleFavoritesClick} />
              <FaShoppingBag className="icon" />
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
              <FaBars />
            </div>
          </div>

          {/* Luego la top bar */}
          <div className="top-bar">
            <div className="left-options">
              {isLoggedIn && (
                <span>
                  Bienvenido, <strong>{name}</strong>
                </span>
              )}
            </div>
            <div className="right-options">
              {isLoggedIn ? (
                <>
                  <div className="navbar-item">
                    {rolId === '1' && (
                      <>
                        <a href="/admin-dashboard">Panel de administración</a>
                        <span className="divider">|</span>
                        <div className="dropdown">
                          <a href="/product-managment" className="dropdown-toggle">Gestión de Inventario</a>
                          <div className="dropdown-menu">
                            <a href="/product-managment">Productos</a>
                            <a href="/categories-managment">Categorías y Subcategorías</a>
                            <a href="/discounts">Descuentos</a>
                          </div>
                        </div>
                        <span className="divider">|</span>
                        {/* <a href="/customer-managment">Gestión de Cientes</a> */}
                        <div className="dropdown">
                          <span className="dropdown-toggle">Gestión de Usuarios</span>
                        </div>
                        <span className="divider">|</span>
                        <a href="/" onClick={handleLogout}>Cerrar sesión</a>
                      </>
                    )}
                    {rolId === '2' && (
                      <>
                        <a href="/customer-managment" >Gestión de Clientes</a>
                        <span className="divider">|</span>
                        <a href="/product-managment" >Gestión de Inventario</a>
                        <span className="divider">|</span>
                        <a href="/manage-orders">Gestión de Pedidos</a>
                        <span className="divider">|</span>
                        <a href="/" >Estadísticas</a>
                        <span className="divider">|</span>
                        <a href="/" onClick={handleLogout}>Cerrar Sesión</a>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="navbar-item">
                    <a href="/login" className="navbar-item">Iniciar Sesión</a>
                    <span className="divider">|</span>
                    <a href="/register" className="navbar-item">Registro</a>
                    <span className="divider">|</span>
                    <a href="#" className="navbar-item">Ayuda</a>
                    <span className="divider">|</span>
                    <a href="#" className="navbar-item">Buscar tienda</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Si no es rolId 1 o 2, renderizamos la top bar primero */}
          <div className="top-bar">
            <div className="left-options">
              {isLoggedIn && (
                <span>
                  Bienvenido, <strong>{name}</strong>
                </span>
              )}
            </div>
            <div className="right-options">
              {isLoggedIn ? (
                <>
                  <div className="navbar-item">
                    {rolId === '3' && (
                      <>
                        {/* <a href="/user-managment">Mi cuenta</a> */}
                        <div className="dropdown">
                          <a className="dropdown-toggle">Mi Cuenta</a>
                          <div className="dropdown-menu">
                            <a href="/user-managment">Información Personal</a>
                            <a href="/categories-managment">Lista de Deseos</a>
                            <a href="/discounts">Devoluciones y garantias</a>
                          </div>
                        </div>
                        <span className="divider">|</span>
                        <a href="/orders">Mis pedidos</a>
                        <span className="divider">|</span>
                        <a href="/favorites">Favoritos</a>
                        <span className="divider">|</span>
                        <a href="/" onClick={handleLogout}>Cerrar sesión</a>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="navbar-item">
                    <a href="/login" className="navbar-item">Iniciar Sesión</a>
                    <span className="divider">|</span>
                    <a href="/register" className="navbar-item">Registro</a>
                    <span className="divider">|</span>
                    <a href="#" className="navbar-item">Ayuda</a>
                    <span className="divider">|</span>
                    <a href="#" className="navbar-item">Buscar tienda</a>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="navbar">
            <div className="navbar-logo" onClick={handleLogoClick}>
              <img src={logo} className='logo-image' alt="Logo" />
            </div>
            <div className={`navbar-categories ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href="#">Nuevos</a></li>
                <li><a href="#" onClick={() => handleCategoryClick('Hombre')}>Hombre</a></li>
                <li><a href="#" onClick={() => handleCategoryClick('Mujer')}>Mujer</a></li>
                <li><a href="#" onClick={() => handleCategoryClick('Ninio')}>Niño/a</a></li>
              </ul>
            </div>
            <div className="navbar-icons">
              {/* <FaSearch className="icon" /> */}
              <div className="navbar-search-icon" onClick={openSearchModal}>
                <FaSearch /> {/* Puedes reemplazarlo con un ícono si prefieres */}
              </div>
              <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} />
              <FaHeart className="icon" onClick={handleFavoritesClick} />
              <FaShoppingBag className="icon" onClick={handleShoppingCartClick} />
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
              <FaBars />
            </div>
          </div>
        </>
      )}
    </div>
  );

};

export default Navbar;
