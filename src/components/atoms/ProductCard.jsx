import React from 'react';
import Button from './Button';
import '../../styles/atoms/ProductCard.css';
import { productImages } from '../../assets/productImages';

const ProductCard = ({ product, onAddToCart }) => {
  const finalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const imageKeyMap = {
    Moka: "moka",
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
  const imageSrc =
    productImages[imageKey] ||
    "https://via.placeholder.com/280x280?text=Sin+Imagen";

  return (
    <div className="product-card">
      {product.discount > 0 && (
        <div className="discount-badge">-{product.discount}%</div>
      )}

      <div className="product-image">
        <img src={imageSrc} alt={product.name} className="product-img" />
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.category?.toUpperCase() || "SIN CATEGORÍA"}
        </p>

        <h3 className="product-name">{product.name}</h3>

        <div className="product-pricing">
          {product.discount > 0 && (
            <span className="price-original">
              ${product.price?.toLocaleString()}
            </span>
          )}

          <div className="price-main">
            <span className="price-currency">$</span>
            <span className="price-value">
              {finalPrice?.toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => onAddToCart(product)}
          fullWidth
        >
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
