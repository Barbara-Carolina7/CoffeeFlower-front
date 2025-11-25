import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getCategories } from '../../services/productService';
// 🚨 CORRECCIÓN: Se agrega FaCoffee a la lista de importaciones
import { FaSearch, FaShoppingCart, FaCrown, FaCoffee } from 'react-icons/fa';
import '../../styles/organisms/Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  // Cargar categorías desde la API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData.slice(0, 4));
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    loadCategories();
  }, []);

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productos?buscar=${searchTerm}`);
      setSearchTerm(''); // Limpiar campo después de buscar
    }
  };

  // Manejar click en usuario
  const handleUserClick = (e) => {
    if (isAuthenticated()) {
      e.preventDefault();
      
      
      console.log('Usuario autenticado. Cerrando sesión...');
      logout();
      
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          {/* ☕️ Ícono del café (FaCoffee) y texto "CoffeeFlower" */}
          <span className="logo-icon"><FaCoffee /></span>
          <span className="logo-text">CoffeeFlower</span>
        </Link>
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar Productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        <Link
          to={isAuthenticated() ? "#" : "/login"}
          className="header-user"
          onClick={handleUserClick}
        >
          <span className="user-greeting">
            {isAuthenticated() ? `¡Bienvenido, ${user.nombre}!` : '¡Bienvenido!'}
          </span>
          <span className="user-action">{isAuthenticated() ? 'Cerrar sesión' : 'Inicia sesión'}
          </span>
        </Link>

        <button className="header-cart" onClick={() => navigate('/carrito')}>
          <span className="cart-icon"><FaShoppingCart /></span>
          {getTotalItems() > 0 && (
            <span className="cart-count">{getTotalItems()}</span>
          )}
        </button>
      </div>

      <div className="header-nav">
        <div className="nav-container">
          {isAdmin() && (
            <Link to="/admin" className="nav-link nav-link-admin">
              <FaCrown /> Panel Admin
            </Link>
          )}
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/productos" className="nav-link">Todos los Productos</Link>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/productos?categoria=${category.name}`}
              className="nav-link"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;