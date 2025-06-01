import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/api.js';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return <button onClick={handleLogout}>Вийти</button>;
}
