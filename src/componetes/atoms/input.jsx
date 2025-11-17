// src/compone tes/atoms/Input.jsx

import React from 'react';

// Props comunes: type, value, onChange, placeholder, name, className
const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  name, 
  className = '' 
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`default-input-style ${className}`}
    />
  );
};

export default Input;