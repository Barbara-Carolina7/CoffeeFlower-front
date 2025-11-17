// src/compone tes/atoms/Button.jsx

import React from 'react';

// Props comunes: children (el texto o contenido), onClick, type (submit/button), className para estilos
const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      // Puedes definir clases por defecto y permitir que se añadan más
      className={`default-btn-style ${className}`} 
    >
      {children}
    </button>
  );
};

export default Button;