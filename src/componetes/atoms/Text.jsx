// src/compone tes/atoms/Text.jsx

import React from 'react';

// Props comunes: children (el texto), as (la etiqueta HTML), className
const Text = ({ children, as: Component = 'p', className = '' }) => {
  // 'as' se usa para definir dinámicamente qué etiqueta HTML renderizar (p, h1, span, etc.)
  return (
    <Component className={`default-text-style ${className}`}>
      {children}
    </Component>
  );
};

export default Text;