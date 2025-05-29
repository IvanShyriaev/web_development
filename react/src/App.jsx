import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainPage from './pages/MainPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; // Додай свою сторінку профілю
import Header from './components/Header.jsx'; // Заголовок з навігацією
import AdminPanelPage from './pages/AdminPanelPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import CreateProduct from './pages/CreateProductPage.jsx';
import Footer from './components/Footer.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import AdminUsersPage from './pages/AdminUsersPage.jsx';
import CreateUserPage from './pages/CreateUserPage.jsx';
import EditUserPage from './pages/EditUserPage.jsx';
import LoginPage from './pages/LoginPage';
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/logout/', {}, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
        } catch (err) {
            console.error('Logout error:', err);
        }
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="page-wrapper">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/admin-panel" element={<AdminPanelPage />} />
                        <Route path="/admin-products" element={<AdminProductsPage />} />
                        <Route path="/create-product" element={<CreateProduct />} />
                        <Route path="/edit-product/:id" element={<EditProductPage />} />
                        <Route path="/admin-users" element={<AdminUsersPage />} />
                        <Route path="/create-user" element={<CreateUserPage />} />
                        <Route path="/edit-user/:id" element={<EditUserPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}


export default App;
