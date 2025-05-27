import { createProduct, getCategories } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('.product-form');
    const categorySelect = document.getElementById('category_id');

    function showMessage(message, type = 'success') {
        const box = document.getElementById('message-box');
        box.textContent = message;
        box.className = `message-box ${type}`;
        box.style.display = 'block';
    }

    // Завантаження категорій з API
    try {
        const categories = await getCategories();
        categories.forEach((cat) => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        showMessage('Не вдалося завантажити категорії:', error);
    }

    // Обробка надсилання форми
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock'), 10),
            category_id: parseInt(formData.get('category_id'), 10),
        };

        try {
            await createProduct(productData);
            showMessage('Товар успішно додано!', 'success');
            form.reset();
        } catch (error) {
            showMessage('Помилка при створенні товару', 'error');
        }
    });
});
