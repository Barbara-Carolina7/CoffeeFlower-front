import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './index.css';

// --- Componentes de páginas ---
const Inicio = () => <div style={styles.section}><h2 style={styles.h2}>Bienvenido a CoffeFlower ☕🌸</h2></div>;
const Productos = () => <div style={styles.section}><h2 style={styles.h2}>Productos</h2></div>;
const Carrito = () => <div style={styles.section}><h2 style={styles.h2}>Carrito</h2></div>;
const QuienesSomos = () => <div style={styles.section}><h2 style={styles.h2}>Quiénes Somos</h2></div>;
const Login = () => <div style={styles.section}><h2 style={styles.h2}>Login</h2></div>;

// --- Estilos globales AJUSTADOS (enfocados en la Navbar) ---
const styles = {
  nav: {
    // REDUCIMOS EL PADDING VERTICAL PARA SUBIR EL MENÚ
    // De '4rem 5rem' a '1.5rem 5rem' (mantenemos el ancho, reducimos la altura)
    padding: '1.5rem 5rem', 
    backgroundColor: '#f7f3f0',
    display: 'flex',
    alignItems: 'center', // Esto centra verticalmente el logo y el menú
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    boxShadow: '0 6px 15px rgba(0,0,0,0.25)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100vw' // *** ASEGURAMOS EL ANCHO COMPLETO ***
  },
  logo: { 
    height: '180px', // Mantenemos el tamaño grande del logo
    borderRadius: '15px',
    // Usamos margin-right: auto en el menú para que se separe el logo si es necesario
    marginRight: '1rem' 
  },
  menu: { 
    display: 'flex', 
    gap: '4.5rem',
    flexWrap: 'wrap', 
    alignItems: 'center',
    marginRight: 'auto' // Empuja el menú hacia la derecha para separar el logo
  },
  link: { 
    textDecoration: 'none', 
    color: '#5e3a24',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    transition: 'color 0.3s ease'
  },
  section: { 
    padding: '8rem 6rem',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#4a4a4a',
    lineHeight: '2'
  },
  h2: {
    fontSize: '4.5rem',
    color: '#6f4e37',
    marginBottom: '3rem'
  }
};

// --- Navbar (Utiliza los nuevos estilos ajustados) ---
const Navbar = () => (
  <nav style={styles.nav}>
    <img 
      src="/logoo.jpg" 
      alt="Logo Cafetería" 
      style={styles.logo} 
      onError={(e) => e.target.src='/placeholder.jpg'} 
    />
    <div style={styles.menu}>
      <Link to="/" style={styles.link}>Inicio</Link>
      <Link to="/productos" style={styles.link}>Productos</Link>
      <Link to="/carrito" style={styles.link}>Carrito</Link>
      <Link to="/quienes-somos" style={styles.link}>Quiénes Somos</Link>
      <Link to="/login" style={styles.link}>Login</Link>
    </div>
  </nav>
);

// --- App principal (Sin cambios en este componente) ---
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} /> 
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;