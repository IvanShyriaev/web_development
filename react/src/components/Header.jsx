import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="site-header">
            <div className="container">
                <h1 className="logo">ВелоСвіт</h1>
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/catalog">Каталог</Link></li>
                        <li><Link to="/cart">Кошик</Link></li>
                        <li><Link to="/profile">Профіль</Link></li>
                        <li><Link to="/login">Вхід</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
