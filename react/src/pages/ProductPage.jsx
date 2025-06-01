import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/api';
import { useCart } from '../context/CartContext';
import '../assets/css/main.css';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch {
                console.error('Помилка при завантаженні товару');
            }
        }
        fetchProduct();
    }, [id]);

    if (!product) return <div className="container">Завантаження...</div>;

    const imagePath = `/web_development/images/${product.id}.jpg`;
    const fallbackImage = '/web_development/images/default.jpg';

    return (
        <main className="main-content">
            <div className="container">
                <section className="product-section">
                    <div className="product-wrapper horizontal">

                        <div className="product-image-wrapper">
                            <img
                                src={imagePath}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = fallbackImage;
                                }}
                                className="product-image-large"
                            />
                        </div>

                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className="product-price">₴{product.price}</p>
                            <p className="product-description">
                                {product.description || 'Опис недоступний.'}
                            </p>
                            <p><strong>Кількість на складі:</strong> {product.stock}</p>
                            <p><strong>Категорія:</strong> #{product.category_id}</p>

                            <div className="product-actions">
                                <button className="btn btn-success" onClick={() => addToCart(product)}>
                                    Додати до кошика</button>
                                <button className="btn btn-outline">Повернутися до каталогу</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

