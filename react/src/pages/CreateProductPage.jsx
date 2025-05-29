import React, { useEffect, useState } from 'react';
import { createProduct, getCategories } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch {
                setMessage('Не вдалося завантажити категорії');
                setMessageType('error');
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock, 10),
            category_id: parseInt(formData.category_id, 10),
        };
        try {
            await createProduct(productData);
            setMessage('Товар успішно додано!');
            setMessageType('success');
            setFormData({ name: '', description: '', price: '', stock: '', category_id: '' });
            setTimeout(() => navigate('/admin-products'), 1000);
        } catch {
            setMessage('Помилка при створенні товару');
            setMessageType('error');
        }
    };

    return (
        <div className="container">
            <h2>Додати новий товар</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Назва товару:</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Опис товару:</label>
                    <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Ціна (₴):</label>
                    <input type="number" name="price" id="price" step="0.01" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Кількість на складі:</label>
                    <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="category_id">Категорія:</label>
                    <select name="category_id" id="category_id" value={formData.category_id} onChange={handleChange} required>
                        <option value="">Оберіть категорію</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Додати товар</button>
                </div>
                {message && <div className={`message-box ${messageType}`}>{message}</div>}
            </form>
        </div>
    );
}
