import { getProducts } from './api.js';
import createProductCard from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('product-grid');
    container.innerHTML = '';

    try {
        const products = await getProducts();

        products.forEach((product) => {
            const card = createProductCard(product);
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<p>Не вдалося завантажити товари.</p>';
    }
});
