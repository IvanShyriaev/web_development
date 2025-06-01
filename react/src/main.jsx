import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/css/main.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';




ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartProvider>
            <BrowserRouter basename="/web_development/">
                <App />
            </BrowserRouter>
        </CartProvider>
    </React.StrictMode>
);
