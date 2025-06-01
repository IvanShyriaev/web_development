import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="site-header">
            <div className="container">
                <h1 className="logo">ВелоСвіт</h1>
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li><Link to="/">🌐 Головна</Link></li>
                        <li><Link to="/catalog/">🚲 Каталог</Link></li>
                        <li>
                            <Link to="/cart/" className="cart-link">
                                🛒 Кошик
                                {totalItems > 0 && (
                                    <span className="cart-badge">{totalItems}</span>
                                )}
                            </Link>
                        </li>
                        <li><Link to="/profile/">👤 Профіль</Link></li>
                        <li><Link to="/login/">🚪 Вхід</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
