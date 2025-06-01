import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(data => setUsers(data.filter(user => user.username !== 'admin')));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити користувача?')) {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="container">
            <h2>Користувачі</h2>
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th><th>Ім'я</th><th>Email</th><th>Роль</th><th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => navigate(`/edit-user/${user.id}`)} className="btn btn-outline">Редагувати</button>
                            <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Видалити</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="form-actions" style={{ marginTop: '20px', textAlign: 'right' }}>
                <button onClick={() => navigate('/create-user')} className="btn btn-primary">
                    Додати користувача
                </button>
            </div>
        </div>
    );
}
