import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../api/api';

export default function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        role: 'user',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserById(id);
                setFormData({
                    username: data.username || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    role: data.role || 'user',
                });
            } catch {
                setMessage('Помилка при завантаженні даних користувача');
            }
        }
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, formData);
            setMessage('Користувача оновлено успішно');
            navigate('/admin-users');
        } catch {
            setMessage('Помилка при оновленні користувача');
        }
    };

    return (
        <div className="container">
            <h2>Редагувати користувача</h2>
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
                    <button type="submit" className="btn btn-primary">Оновити</button>
                    <button type="button" className="btn btn-outline" onClick={() => navigate('/admin-users')}>
                        Назад
                    </button>
                </div>

                {message && <div className="message-box">{message}</div>}
            </form>
        </div>
    );
}

