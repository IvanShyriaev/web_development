import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/api';

export default function CreateUserPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',  // ← Додано поле
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            setMessage('Користувача створено успішно');
            navigate('/admin-users');
        } catch {
            setMessage('Помилка при створенні користувача');
        }
    };

    return (
        <div className="container">
            <h2>Додати нового користувача</h2>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="username">Ім’я користувача:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Телефон:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Роль:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="admin">Адміністратор</option>
                        <option value="manager">Менеджер</option>
                        <option value="user">Користувач</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Додати користувача</button>
                    <button type="button" className="btn btn-outline" onClick={() => navigate('/admin-users')}>
                        Назад
                    </button>
                </div>

                {message && (
                    <div id="message-box" className="message-box">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

