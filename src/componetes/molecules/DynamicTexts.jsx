// src/compone tes/molecules/DynamicTexts.jsx

import React from 'react';
import Text from '../atoms/Text.jsx'; // Importa tu átomo Text

/**
 * Molécula que muestra un campo de texto con una etiqueta o título.
 * Ideal para listas de detalles o tablas de resumen.
 *
 * @param {string} label - El texto que actúa como título o etiqueta (ej: "Precio:").
 * @param {string|number} value - El valor real a mostrar (ej: "9.99" o "Espresso").
 * @param {string} [className=''] - Clases CSS adicionales para el contenedor.
 * @param {string} [valueClassName=''] - Clases CSS para el valor.
 */
const DynamicTexts = ({
  label,
  value,
  className = '',
  valueClassName = ''
}) => {
  return (
    <div className={`text-field-group ${className}`}>
      
      {/* 1. Etiqueta (El título del campo) */}
      <Text as="span" className="field-label-text">
        {label}:
      </Text>

      {/* 2. Valor (El contenido del campo) */}
      <Text as="span" className={`field-value-text ${valueClassName}`}>
        {value}
      </Text>
    </div>
  );
};

export default DynamicTexts;