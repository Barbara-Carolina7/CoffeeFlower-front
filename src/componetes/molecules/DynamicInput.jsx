// src/compone tes/molecules/DynamicInput.jsx

import React from 'react';

// Importa tus Átomos: Text (para la etiqueta) e Input (para el campo)
// import Input from '../atoms/Input.jsx';
import Text from '../atoms/Text.jsx';

/**
 * Molécula que combina una etiqueta (label) y un campo de entrada (input).
 * Ideal para campos de formulario con su respectivo título.
 *
 * @param {string} label - Texto de la etiqueta (label).
 * @param {string} inputType - Tipo de input (text, password, email, number, etc.).
 * @param {string} value - El valor actual del input (controlado por el estado).
 * @param {function} onChange - Función para manejar el cambio del input.
 * @param {string} [placeholder=''] - Texto de sugerencia dentro del input.
 * @param {string} [name=''] - Atributo name del input.
 * @param {string} [error=''] - Mensaje de error a mostrar bajo el input.
 * @param {string} [className=''] - Clases CSS adicionales para el contenedor de la molécula.
 */
const DynamicInput = ({
  label,
  inputType = 'text',
  value,
  onChange,
  placeholder = '',
  name,
  error = '',
  className = ''
}) => {
  return (
    <div className={`form-field-group ${className}`}>
      
      {/* 1. Etiqueta (Átomo Text) */}
      {/* Usamos 'as="label"' para que el componente Text se renderice como una etiqueta HTML */}
      <Text as="label" htmlFor={name} className="input-label">
        {label}
      </Text>

      {/* 2. Campo de Entrada (Átomo Input) */}
      <Input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={name} // Usamos 'name' como 'id' para que la etiqueta funcione correctamente
        className="form-input-control"
      />

      {/* 3. Mensaje de Error */}
      {error && (
        <Text as="span" className="input-error-message">
          {error}
        </Text>
      )}
    </div>
  );
};

export default DynamicInput;