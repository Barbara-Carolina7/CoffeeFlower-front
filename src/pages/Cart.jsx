import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/pages/Cart.css';
import { productImages } from "../assets/productImages";

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleDecrease = (cartItemId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(cartItemId, currentQuantity - 1);
        } else {
            const confirmed = window.confirm('¿Deseas eliminar este producto del carrito?');
            if (confirmed) removeFromCart(cartItemId);
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated()) {
            alert('Por favor inicia sesión para continuar con la compra');
            setTimeout(() => navigate('/login'), 500);
        } else {
            alert('Procediendo al pago...');
            setTimeout(() => {
                alert('Muchas gracias por tu compra\nPronto tu pedido estará en tus manos.');
                clearCart();
                setTimeout(() => navigate('/'), 500);
            }, 1500);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <span className="cart-empty-icon"><FaShoppingCart /></span>
                    <h2>Tu carrito está vacío</h2>
                    <p>Agrega productos para comenzar tu compra</p>
                    <Button
                        variant="primary"
                        className="checkout-button"
                        onClick={() => navigate('/productos')}
                    >
                        Ver Productos
                    </Button>
                </div>
            </div>
        );
    }

    // 🔧 Normalizar nombre para imágenes
    const normalizeName = (name) =>
        name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ /g, "");

    // 🖼️ Alias de imágenes
    const imageAlias = {
        brownie: "brownies",
        galletas: "galletaschocolate",
        tazacafe: "tazadecafe",
        tazadecafe: "tazadecafe",
        cappuccino: "capuchino",
        cafe: "espresso"
    };

    // 💰 Precio con extras
    const calculateItemPrice = (item) => {
        const basePrice = item.discount
            ? item.price * (1 - item.discount / 100)
            : item.price;

        let extra = 0;
        if (item.options?.size === 'Mediano') extra = 500;
        if (item.options?.size === 'Grande') extra = 1000;

        return (basePrice + extra) * item.quantity;
    };

    const total = cartItems.reduce(
        (acc, item) => acc + calculateItemPrice(item),
        0
    );

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1>Carrito de Compras</h1>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => {
                            const unitPrice = item.discount
                                ? item.price * (1 - item.discount / 100)
                                : item.price;

                            const itemTotal = calculateItemPrice(item);

                            const normalized = normalizeName(item.name);
                            const imageKey = imageAlias[normalized] || normalized;

                            const imageSrc =
                                productImages[imageKey] ||
                                'https://via.placeholder.com/280x280?text=Sin+Imagen';

                            return (
                                <div key={item.cartItemId} className="cart-item">
                                    <img
                                        src={imageSrc}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-category">{item.category}</p>

                                        {item.options && (
                                            <div className="cart-item-options">
                                                {item.options.size && (
                                                    <p><strong>Tamaño:</strong> {item.options.size}</p>
                                                )}
                                                {item.options.milk && (
                                                    <p><strong>Leche:</strong> {item.options.milk}</p>
                                                )}
                                                {item.options.beanType && (
                                                    <p><strong>Tipo de grano:</strong> {item.options.beanType}</p>
                                                )}
                                                {item.options.sweetener && (
                                                    <p><strong>Endulzante:</strong> {item.options.sweetener}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() =>
                                                handleDecrease(item.cartItemId, item.quantity)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.cartItemId, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="cart-item-price">
                                        <span className="item-unit-price">
                                            ${Math.round(unitPrice)} c/u
                                        </span>
                                        <span className="item-total-price">
                                            ${Math.round(itemTotal)}
                                        </span>
                                    </div>

                                    <button
                                        className="cart-item-remove"
                                        onClick={() => removeFromCart(item.cartItemId)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${Math.round(total)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Envío:</span>
                            <span>Gratis</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${Math.round(total)}</span>
                        </div>

                        <div className="summary-actions">
                            <Button
                                variant="primary"
                                className="checkout-button"
                                fullWidth
                                onClick={handleCheckout}
                            >
                                {isAuthenticated() ? 'Finalizar Compra' : 'Proceder al Pago'}
                            </Button>

                            <Button
                                variant="outline"
                                className="button-outline"
                                fullWidth
                                onClick={() => navigate('/productos')}
                            >
                                Seguir Comprando
                            </Button>

                            <button
                                className="clear-cart"
                                onClick={clearCart}
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
