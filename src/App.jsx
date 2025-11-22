import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- Componentes de cada sección ---
const Inicio = () => <div style={styles.section}><h2>Inicio</h2></div>;
const Productos = () => <div style={styles.section}><h2>Productos</h2></div>;
const Carrito = () => <div style={styles.section}><h2>Carrito</h2></div>;
const QuienesSomos = () => <div style={styles.section}><h2>Quiénes Somos</h2></div>;
const Login = () => <div style={styles.section}><h2>Login</h2></div>;

// --- Estilos globales ---
const styles = {
  nav: {
    padding: '1rem 2rem',
    backgroundColor: '#f7f3f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  logo: {
    height: '50px'
  },
  menu: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold'
  },
  section: {
    padding: '2rem',
    textAlign: 'center'
  }
};

// --- Navbar con logo ---
const Navbar = () => (
  <nav style={styles.nav}>
    <img src="/logoo.jpg" alt="Logo Cafetería" style={styles.logo} onError={(e) => e.target.src = '/placeholder.jpg'} />
    <div style={styles.menu}>
      <Link to="/" style={styles.link}>Inicio</Link>
      <Link to="/productos" style={styles.link}>Productos</Link>
      <Link to="/carrito" style={styles.link}>Carrito</Link>
      <Link to="/quienes-somos" style={styles.link}>Quiénes Somos</Link>
      <Link to="/login" style={styles.link}>Login</Link>
    </div>
  </nav>
);

// --- App principal ---
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
