import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../api/api';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            navigate('/login');
            return;
        }

        async function fetchUser() {
            try {
                const data = await getUserById(userId);
                setUser(data);
            } catch {
                alert('Помилка при завантаженні профілю');
            }
        }

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/login');
    };

    if (!user) return <div className="container">Завантаження...</div>;

    return (
        <main className="main-content">
            <div className="container">
                <section className="profile-section">
                    <h2>Мій профіль</h2>

                    <div className="profile-card">
                        <p><strong>Ім’я:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Телефон:</strong> {user.phone || '-'}</p>
                        <p><strong>Створено:</strong> {new Date(user.created_at).toLocaleDateString()}</p>

                        <div className="profile-actions">
                            <Link to="/edit-profile" className="btn btn-outline">Редагувати</Link>
                            <Link to="/admin-panel" className="btn btn-primary">Адмін-панель</Link>
                            <button className="btn btn-danger" onClick={handleLogout}>Вийти</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

