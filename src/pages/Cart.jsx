import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/pages/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleDecrease = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(id, currentQuantity - 1);
        } else {
            const confirmed = window.confirm('¿Deseas eliminar este producto del carrito?');
            if (confirmed) removeFromCart(id);
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated()) {
            alert('Por favor inicia sesión para continuar con la compra');
            setTimeout(() => navigate('/login'), 500);
        } else {
            alert('Procediendo al pago...');
            setTimeout(() => {
                alert('Muchas gracias por tú compra\nPronto tú pedido estara en tus manos .');
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
                    <Button variant="primary" className="checkout-button" onClick={() => navigate('/productos')}>
                        Ver Productos
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1>Carrito de Compras</h1>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => {
                            const itemPrice = item.discount
                                ? item.price * (1 - item.discount / 100)
                                : item.price;
                            const itemTotal = itemPrice * item.quantity;

                            return (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />

                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-category">{item.category}</p>
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>

                                    <div className="cart-item-price">
                                        <span className="item-unit-price">${Math.round(itemPrice)} c/u</span>
                                        <span className="item-total-price">${Math.round(itemTotal)}</span>
                                    </div>

                                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${Math.round(getTotalPrice())}</span>
                        </div>

                        <div className="summary-row">
                            <span>Envío:</span>
                            <span>Gratis</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${Math.round(getTotalPrice())}</span>
                        </div>

                        <div className="summary-actions">
                            <Button variant="primary" className="checkout-button" fullWidth onClick={handleCheckout}>
                                {isAuthenticated() ? 'Finalizar Compra' : 'Proceder al Pago'}
                            </Button>

                            <Button variant="outline" className="button-outline" fullWidth onClick={() => navigate('/productos')}>
                                Seguir Comprando
                            </Button>

                            <button className="clear-cart" onClick={clearCart}>
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
