import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
    return (
        <section className="popular-products">
            <div className="container">
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
