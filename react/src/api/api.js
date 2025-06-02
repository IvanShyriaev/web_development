const BASE_URL = 'http://localhost:8000/api/v1/';

export async function getProducts() {
    const response = await fetch(`${BASE_URL}products/`);
    if (!response.ok) {
        throw new Error(`Помилка API: ${response.status}`);
    }
    return response.json();
}

export async function createProduct(productData) {
    const response = await fetch(`${BASE_URL}products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error(`Помилка при створенні товару: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return null;
}

export async function deleteProduct(productId) {
    const response = await fetch(`${BASE_URL}products/${productId}/`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Помилка при видаленні товару: ${response.status}`);
    }

    return response.json();
}

export async function getCategories() {
    const response = await fetch(`${BASE_URL}categories/`);
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    return response.json();
}

export async function loginUser(credentials) {
    const res = await fetch(`${BASE_URL}login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    return await res.json();
}

export function logoutUser() {
    localStorage.removeItem('token');
}

export async function getProductById(id) {
    const response = await fetch(`${BASE_URL}products/${id}/`);
    if (!response.ok) {
        throw new Error('Не вдалося отримати товар');
    }
    return await response.json();
}

export async function updateProduct(id, productData) {
    const response = await fetch(`${BASE_URL}products/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error('Не вдалося оновити товар');
    }
    return await response.json();
}

export async function getUsers() {
    const res = await fetch(`${BASE_URL}users/`);
    return res.json();
}

export async function getUserById(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}users/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!res.ok) {
        throw new Error('Не вдалося отримати користувача');
    }

    return await res.json();
}

export async function createUser(user) {
    const res = await fetch(`${BASE_URL}users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return res.json();
}

export async function updateUser(id, user) {
    const res = await fetch(`${BASE_URL}users/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`${BASE_URL}users/${id}/`, { method: 'DELETE' });

    if (!res.ok) {
        throw new Error('Не вдалося видалити користувача');
    }

    return res.json();
}

