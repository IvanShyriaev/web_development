import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, getCategories } from '../api/api.js';

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const prod = await getProductById(id);
                setProduct(prod);
                const cats = await getCategories();
                setCategories(cats);
            } catch  {
                setMessage('Помилка при завантаженні товару');
            }
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, product);
            setMessage('Товар успішно оновлено!');
            setTimeout(() => navigate('/admin-products'), 1000);
        } catch {
            setMessage('Помилка при оновленні товару');
        }
    };

    if (!product) return <p>Завантаження...</p>;

    return (
        <div className="container">
            <h2>Редагувати товар</h2>
            {message && <div className="message-box">{message}</div>}
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Назва:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Опис:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Ціна:</label>
                    <input type="number" step="0.01" id="price" name="price" value={product.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Кількість:</label>
                    <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="category_id">Категорія:</label>
                    <select id="category_id" name="category_id" value={product.category_id} onChange={handleChange} required>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Оновити товар</button>
                    <button type="button" className="btn btn-outline" onClick={() => navigate('/admin-products')}>Скасувати</button>
                </div>
            </form>
        </div>
    );
}
