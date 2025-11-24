import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import '../../styles/organisms/Footer.css';

const Footer = () => {
return ( <footer className="footer"> <div className="footer-main"> <div className="footer-container">

```
      {/* Logo y descripción */}
      <div className="footer-column">
        <div className="footer-logo">
          <span className="logo-text">CoffeFlower</span>
        </div>
        <p className="footer-description">
          Descubre la experiencia CoffeFlower. Café artesanal, postres y accesorios seleccionados para ti.
        </p>
        <div className="footer-social">
          <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" className="social-link" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>
      </div>

      {/* Navegación */}
      <div className="footer-column">
        <h3 className="footer-title">Navegación</h3>
        <ul className="footer-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li><Link to="/login">Mi Cuenta</Link></li>
        </ul>
      </div>

      {/* Categorías */}
      <div className="footer-column">
        <h3 className="footer-title">Categorías</h3>
        <ul className="footer-links">
          <li><Link to="/productos?categoria=Café">Café</Link></li>
          <li><Link to="/productos?categoria=Infusiones">Infusiones</Link></li>
          <li><Link to="/productos?categoria=Postres">Postres</Link></li>
          <li><Link to="/productos?categoria=Accesorios">Accesorios</Link></li>
        </ul>
      </div>

      {/* Contacto */}
      <div className="footer-column">
        <h3 className="footer-title">Contacto</h3>
        <ul className="footer-contact">
          <li>
            <span className="contact-icon"><FaEnvelope /></span>
            <span>contacto@coffeeflower.com</span>
          </li>
          <li>
            <span className="contact-icon"><FaPhone /></span>
            <span>+56 9 1234 5678</span>
          </li>
          <li>
            <span className="contact-icon"><FaMapMarkerAlt /></span>
            <span>Santiago, Chile</span>
          </li>
        </ul>
      </div>

    </div>
  </div>

  {/* Pie de página */}
  <div className="footer-bottom">
    <div className="footer-container">
      <p className="footer-copyright">
        © {new Date().getFullYear()} CoffeFlower. Todos los derechos reservados.
      </p>
      <div className="footer-payment">
        <span className="payment-text">Métodos de pago:</span>
        <div className="payment-icons">
          <span><FaCreditCard /></span>
          <span><FaUniversity /></span>
          <span><FaMoneyBillWave /></span>
        </div>
      </div>
    </div>
  </div>
</footer>


);
};

export default Footer;
