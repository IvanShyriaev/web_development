import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h2>Ласкаво просимо до ВелоСвіту!</h2>
                <p>У нас ви знайдете якісні велосипеди на будь-який смак</p>
                <Link to="/catalog" className="btn btn-primary">
                    Перейти до каталогу
                </Link>
            </div>
        </section>
    );
}
