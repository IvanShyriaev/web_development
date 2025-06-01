import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import ProductGrid from '../components/ProductGrid.jsx';

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError('Не вдалося завантажити товари');
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h2>Каталог товарів</h2>
            {error && <div className="message-box error">{error}</div>}
            <ProductGrid products={products} />
        </div>
    );
}
