import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ username, password });
            const { token, user_id } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id );
            navigate('/');
        } catch {
            setError('Невірні дані для входу');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="username">Ім’я користувача:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Увійти</button>
                </div>
            </form>
        </div>
    );
}
