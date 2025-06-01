import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const imagePath = `/web_development/images/${product.id}.jpg`;
    const fallbackImage = '/web_development/images/default.jpg'; // <-- без /public/
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img
                src={imagePath}
                alt={product.name}
                className="product-image"
                onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
            />
            <h4>{product.name}</h4>
            <p>₴{product.price.toFixed(2)}</p>

            <div className="product-actions">
                <Link to={`/product/${product.id}`} className="btn btn-outline">
                    Детальніше
                </Link>
                <button className="btn btn-success" onClick={() => addToCart(product)}>
                    Додати в кошик
                </button>
            </div>
        </div>
    );
}
