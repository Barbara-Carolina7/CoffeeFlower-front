// src/compone tes/atoms/Image.jsx

import React from 'react';

/**
 * Componente atómico para renderizar una imagen.
 *
 * @param {string} src - La fuente (path) de la imagen.
 * @param {string} [alt='Imagen de la aplicación'] - Texto alternativo para accesibilidad.
 * @param {string} [className=''] - Clases CSS adicionales.
 * @param {object} [props] - Cualquier otra prop HTML nativa (ej: onClick, style).
 */
const Image = ({ 
  src, 
  alt = 'Imagen de la aplicación', 
  className = '',
  ...props // Permite pasar otras propiedades HTML nativas como id, width, etc.
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      // Puedes incluir una clase base para el estilo por defecto, si la tienes
      className={`default-img-style ${className}`} 
      {...props}
    />
  );
};

export default Image;