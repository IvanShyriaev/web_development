import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/api';
import { Link } from 'react-router-dom';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getUsers().then(data => setUsers(data.filter(user => user.username !== 'admin')));
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUser(selectedUserId);
            setUsers(prev => prev.filter(user => user.id !== selectedUserId));
            setMessage('Користувача успішно видалено');
        } catch {
            setMessage('Помилка при видаленні користувача');
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div className="container">
            <h2>Користувачі</h2>
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ім'я</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Дії</th>
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
                            <Link to={`/edit-user/${user.id}`} className="btn btn-outline">Редагувати</Link>
                            <button className="btn btn-danger" onClick={() => {
                                setSelectedUserId(user.id);
                                setShowModal(true);
                            }}>
                                Видалити
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="form-actions" style={{ marginTop: '20px', textAlign: 'right' }}>
                <Link to="/create-user" className="btn btn-primary">Додати користувача</Link>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Ви впевнені, що хочете видалити користувача?</p>
                        <div className="modal-actions">
                            <button onClick={handleDelete} className="btn btn-danger">Так</button>
                            <button onClick={() => setShowModal(false)} className="btn btn-outline">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            {message && (
                <div className="message-box" style={{ display: 'block' }}>{message}</div>
            )}
        </div>
    );
}
