import React, { useState } from 'react';
import Button from './Button';
import '../../styles/atoms/ProductCard.css';
import { productImages } from '../../assets/productImages';

const ProductCard = ({ product, onAddToCart }) => {
  const finalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const imageKeyMap = {
    Moka:"moka",
    Espresso: "espresso",
    Latte: "latte",
    Cappuccino: "capuchino",
    "Té Verde": "teverde",
    "Té Negro": "tenegro",
    "Infusión Manzanilla": "infusionmanzanilla",
    Galletas: "galletaschocolate",
    Brownie: "brownies",
    Cheesecake: "cheesecake",
    "Taza Café": "tazadecaf",
    Cafetera: "cafetera",
    Termo: "termo"
  };

  const imageKey = imageKeyMap[product.name] || "sinimagen";
  const imageSrc = productImages[imageKey] || 'https://via.placeholder.com/280x280?text=Sin+Imagen';

  // Determinar si el producto requiere opciones (solo cafés e infusiones)
  const requiereOpciones = ['Café', 'Infusión', 'Té'].some(tipo => product.category?.includes(tipo));

  const [selectedOptions, setSelectedOptions] = useState({
    milk: product.milkTypes?.[0]?.nombre || '',
    grain: product.grainTypes?.[0]?.nombre || '',
    size: product.sizes?.[0]?.nombre || '',
    temperature: product.temperatures?.[0]?.nombre || ''
  });

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const isAddToCartDisabled = requiereOpciones && (
    (product.milkTypes?.length > 0 && !selectedOptions.milk) ||
    (product.grainTypes?.length > 0 && !selectedOptions.grain) ||
    (product.sizes?.length > 0 && !selectedOptions.size) ||
    (product.temperatures?.length > 0 && !selectedOptions.temperature)
  );

  return (
    <div className="product-card">
      {product.discount > 0 && <div className="discount-badge">-{product.discount}%</div>}

      <div className="product-image">
        <img src={imageSrc} alt={product.name} className="product-img" />
      </div>

      <div className="product-info">
        <p className="product-category">{product.category?.toUpperCase() || "SIN CATEGORÍA"}</p>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-pricing">
          {product.discount > 0 && <span className="price-original">${product?.price?.toLocaleString()}</span>}
          <div className="price-main">
            <span className="price-currency">$</span>
            <span className="price-value">{finalPrice?.toLocaleString()}</span>
          </div>
        </div>

        {requiereOpciones && (
          <>
            {product.milkTypes?.length > 0 && (
              <div className="product-option">
                <label>Tipo de Leche:</label>
                <select value={selectedOptions.milk} onChange={(e) => handleOptionChange('milk', e.target.value)}>
                  {product.milkTypes.map(milk => (
                    <option key={milk.id} value={milk.nombre}>{milk.nombre}</option>
                  ))}
                </select>
              </div>
            )}

            {product.grainTypes?.length > 0 && (
              <div className="product-option">
                <label>Tipo de Grano:</label>
                <select value={selectedOptions.grain} onChange={(e) => handleOptionChange('grain', e.target.value)}>
                  {product.grainTypes.map(grain => (
                    <option key={grain.id} value={grain.nombre}>{grain.nombre}</option>
                  ))}
                </select>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="product-option">
                <label>Tamaño:</label>
                <select value={selectedOptions.size} onChange={(e) => handleOptionChange('size', e.target.value)}>
                  {product.sizes.map(size => (
                    <option key={size.id} value={size.nombre}>{size.nombre}</option>
                  ))}
                </select>
              </div>
            )}

            {product.temperatures?.length > 0 && (
              <div className="product-option">
                <label>Temperatura:</label>
                <select value={selectedOptions.temperature} onChange={(e) => handleOptionChange('temperature', e.target.value)}>
                  {product.temperatures.map(temp => (
                    <option key={temp.id} value={temp.nombre}>{temp.nombre}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <Button
          variant="primary"
          fullWidth
          onClick={() => onAddToCart({ ...product, selectedOptions })}
          disabled={isAddToCartDisabled}
        >
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
