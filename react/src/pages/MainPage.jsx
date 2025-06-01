import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/api.js';

export default function MainPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(data => setProducts(data.slice(0, 3)));
    }, []);

    return (
        <div className="page-wrapper">
            <Hero />
            <ProductGrid products={products} />
        </div>
    );
}
