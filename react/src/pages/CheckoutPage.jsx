import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert('Замовлення оформлено!');
        clearCart();
        navigate('/');
    };

    return (
        <main className="main-content">
            <div className="container">
                <h2>Оформлення замовлення</h2>

                {cart.length === 0 ? (
                    <p>Кошик порожній</p>
                ) : (
                    <>
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id}>
                                    {item.name} × {item.quantity} — ₴{(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <p>Загальна сума: ₴{total.toFixed(2)}</p>

                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-group">
                                <label htmlFor="name">Ім’я</label>
                                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Адреса</label>
                                <input type="text" id="address" name="address" value={form.address} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Підтвердити замовлення
                            </button>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}
