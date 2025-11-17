// src/compone tes/organisms/CardsDisplay.jsx

import React from 'react';
import Image from '../atoms/Image.jsx'; 
import Text from '../atoms/Text.jsx';
import Button from '../atoms/Button.jsx';

// Idealmente, esto sería una Molécula: ProductCard.jsx
const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <Image 
                src={product.imageUrl || '/default-coffee.jpg'} // Asume que el producto tiene una URL de imagen
                alt={`Imagen de ${product.name}`} 
                className="card-image"
            />
            <div className="card-content">
                <Text as="h3" className="card-title">{product.name}</Text>
                <Text as="p" className="card-description">{product.description.substring(0, 80)}...</Text>
                <Text as="span" className="card-price">${product.price.toFixed(2)}</Text>
                
                {/* Botón de acción */}
                <Button 
                    onClick={() => onAddToCart(product)} 
                    className="btn-add-to-cart"
                >
                    Añadir al Carrito
                </Button>
            </div>
        </div>
    );
};


/**
 * Organismo para mostrar una lista de productos en formato de tarjeta.
 * @param {Array} items - Lista de objetos de producto.
 * @param {function} onActionClick - Función a ejecutar al hacer click en el botón de la tarjeta (ej: añadir al carrito).
 */
const CardsDisplay = ({ items, onActionClick }) => {
    return (
        <div className="cards-display-grid">
            {items.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onActionClick} 
                />
            ))}
        </div>
    );
};

export default CardsDisplay;