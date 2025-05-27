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
}

export async function getCategories() {
    const response = await fetch(`${BASE_URL}categories/`);
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    return response.json();
}
