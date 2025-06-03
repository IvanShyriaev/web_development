import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main className="main-content">
            <div className="container">
                <h2>Мій кошик</h2>

                {cart.length === 0 ? (
                    <p>Кошик порожній.</p>
                ) : (
                    <>
                        <div className="cart-list">
                            {cart.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img
                                        src={`/web_development/images/${item.id}.jpg`}
                                        alt={item.name}
                                        className="cart-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/web_development/images/default.jpg';
                                        }}
                                    />
                                    <div className="cart-info">
                                        <div className="cart-main">
                                            <h3>{item.name}</h3>
                                            <div className="quantity-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Видалити</button>
                                        </div>
                                        <div className="cart-price">
                                            ₴{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-total">
                            <p><strong>Сума до оплати:</strong> ₴{total.toFixed(2)}</p>
                            <Link to="/checkout" className="btn btn-primary">
                                Оформити замовлення
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
