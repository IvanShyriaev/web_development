import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanelPage() {
    return (
        <main className="main-content">
            <div className="container">
                <h2>Адміністративна панель</h2>
                <p>Оберіть розділ для керування:</p>

                <div className="admin-panel-grid">

                    <div className="admin-card">
                        <h3>Товари</h3>
                        <p>Керування асортиментом, додавання нових товарів.</p>
                        <Link to="/admin-products" className="btn btn-primary">Товари</Link>
                    </div>

                    <div className="admin-card">
                        <h3>Користувачі</h3>
                        <p>Перегляд, редагування та видалення користувачів.</p>
                        <Link to="/admin-users" className="btn btn-primary">Користувачі</Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
