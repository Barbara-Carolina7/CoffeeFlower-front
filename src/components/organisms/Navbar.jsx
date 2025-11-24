import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // estilos

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO */}
        <div className="logo">
          <Link to="/">CoffeFlower ☕🌸</Link>
        </div>

        {/* BOTÓN HAMBURGUESA MÓVIL */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </div>

        {/* MENÚ */}
        <ul className={open ? "nav-menu active" : "nav-menu"}>
          <li><Link to="/" onClick={() => setOpen(false)}>Inicio</Link></li>
          <li><Link to="/productos" onClick={() => setOpen(false)}>Productos</Link></li>
          <li><Link to="/carrito" onClick={() => setOpen(false)}>Carrito</Link></li>
          <li><Link to="/quienes-somos" onClick={() => setOpen(false)}>Quiénes Somos</Link></li>
          <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
