export default function ProductCard({ product }) {
    const imagePath = `images/${product.id}.jpg`;
    const fallbackImage = 'images/default.jpg';

    return (
        <div className="product-card">
            <img
                src={imagePath}
                alt={product.name}
                className="product-image"
                onError={(e) => { e.target.src = fallbackImage; }}
            />
            <h4>{product.name}</h4>
            <p>₴{product.price}</p>
            <a href={`/product?id=${product.id}`} className="btn btn-outline">Детальніше</a>
        </div>
    );
}
