import { getProducts, deleteProduct } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('product-table-body');
    const messageBox = document.getElementById('message-box');
    const confirmModal = document.getElementById('confirm-modal');
    const confirmYesBtn = document.getElementById('confirm-yes');
    const confirmNoBtn = document.getElementById('confirm-no');

    let productIdToDelete = null;
    let deleteTargetRow = null;

    const showMessage = (text, type = 'error') => {
        if (messageBox) {
            messageBox.textContent = text;
            messageBox.className = `message-box ${type}`;
            messageBox.style.display = 'block';
        }
    };

    const openConfirmModal = (productId, rowElement) => {
        productIdToDelete = productId;
        deleteTargetRow = rowElement;
        confirmModal.classList.remove('hidden');
    };

    const closeConfirmModal = () => {
        confirmModal.classList.add('hidden');
        productIdToDelete = null;
        deleteTargetRow = null;
    };

    confirmYesBtn.addEventListener('click', async () => {
        if (productIdToDelete && deleteTargetRow) {
            try {
                await deleteProduct(productIdToDelete);
                deleteTargetRow.remove();
                showMessage('Товар успішно видалено', 'success');
            } catch (error) {
                showMessage('Помилка при видаленні товару', 'error');
            }
        }
        closeConfirmModal();
    });

    confirmNoBtn.addEventListener('click', () => {
        closeConfirmModal();
    });

    try {
        const products = await getProducts();

        products.forEach((product) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category_id || '—'}</td>
                <td>
                    <a href="edit-product.html?id=${product.id}" class="btn btn-outline">Редагувати</a>
                    <button class="btn btn-danger delete-btn" data-id="${product.id}">Видалити</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        tableBody.addEventListener('click', (e) => {
            const { target } = e;

            if (target.classList.contains('delete-btn')) {
                const { id } = target.dataset;
                openConfirmModal(id, target.closest('tr'));
            }
        });
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="6">Не вдалося завантажити товари</td></tr>';
        showMessage('Помилка при завантаженні товарів', 'error');
    }
});
