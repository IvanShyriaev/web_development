import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/api.js';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch {
                setMessage('Не вдалося завантажити товари');
            }
        }

        fetchProducts();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteProduct(selectedProductId);
            setProducts(prev => prev.filter(p => p.id !== selectedProductId));
            setMessage('Товар успішно видалено');
        } catch {
            setMessage('Помилка при видаленні товару');
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div className="page-wrapper">
            <main className="main-content">
                <div className="container">
                    <h2>Список товарів</h2>

                    <table className="user-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Назва</th>
                            <th>Ціна</th>
                            <th>Кількість</th>
                            <th>Категорія</th>
                            <th>Дії</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                                <td>{p.category_id || '—'}</td>
                                <td>
                                    <Link to={`/edit-product/${p.id}`} className="btn btn-outline">Редагувати</Link>
                                    <button className="btn btn-danger" onClick={() => {
                                        setSelectedProductId(p.id);
                                        setShowModal(true);
                                    }}>
                                        Видалити
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="form-actions" style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Link to="/create-product" className="btn btn-primary">Додати товар</Link>
                    </div>
                </div>
            </main>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Ви впевнені, що хочете видалити товар?</p>
                        <div className="modal-actions">
                            <button onClick={handleDelete} className="btn btn-danger">Так</button>
                            <button onClick={() => setShowModal(false)} className="btn btn-outline">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            {message && (
                <div className="message-box" style={{ display: 'block' }}>{message}</div>
            )}

        </div>
    );
}
