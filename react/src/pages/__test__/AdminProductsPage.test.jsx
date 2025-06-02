import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../api/api.js', () => {
    const mockGetProducts = vi.fn().mockResolvedValue([
        { id: 1, name: 'Bike A', price: 1000, stock: 3, category_id: 1 },
        { id: 2, name: 'Bike B', price: 1500, stock: 5, category_id: 2 },
    ]);
    const mockDeleteProduct = vi.fn().mockResolvedValue({});

    return {
        getProducts: mockGetProducts,
        deleteProduct: mockDeleteProduct,
        __esModule: true,
        __mocks: { mockGetProducts, mockDeleteProduct },
    };
});

import AdminProductsPage from '../AdminProductsPage';
import * as api from '../../api/api';

describe('AdminProductsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders products list', async () => {
        render(<MemoryRouter><AdminProductsPage /></MemoryRouter>);
        await waitFor(() => {
            expect(screen.getByText('Bike A')).toBeInTheDocument();
            expect(screen.getByText('Bike B')).toBeInTheDocument();
        });
    });

    test('shows and hides delete confirmation modal', async () => {
        render(<MemoryRouter><AdminProductsPage /></MemoryRouter>);
        await screen.findByText('Bike A');
        fireEvent.click(screen.getAllByText('Видалити')[0]);
        expect(screen.getByText(/ви впевнені/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText('Скасувати'));
        await waitFor(() => {
            expect(screen.queryByText(/ви впевнені/i)).not.toBeInTheDocument();
        });
    });

    test('deletes a product and shows success message', async () => {
        render(<MemoryRouter><AdminProductsPage /></MemoryRouter>);
        await screen.findByText('Bike A');
        fireEvent.click(screen.getAllByText('Видалити')[0]);
        fireEvent.click(screen.getByText('Так'));
        await waitFor(() => {
            expect(api.deleteProduct).toHaveBeenCalledWith(1);
            expect(screen.getByText(/успішно видалено/i)).toBeInTheDocument();
        });
    });

    test('shows error if fetching fails', async () => {
        api.getProducts.mockRejectedValueOnce(new Error('Fetch fail'));
        render(<MemoryRouter><AdminProductsPage /></MemoryRouter>);
        await waitFor(() => {
            expect(screen.getByText(/не вдалося завантажити/i)).toBeInTheDocument();
        });
    });

    test('shows error if deleting fails', async () => {
        render(<MemoryRouter><AdminProductsPage /></MemoryRouter>);
        await screen.findByText('Bike A');
        api.deleteProduct.mockRejectedValueOnce(new Error('Delete fail'));
        fireEvent.click(screen.getAllByText('Видалити')[0]);
        fireEvent.click(screen.getByText('Так'));
        await waitFor(() => {
            expect(screen.getByText(/помилка при видаленні/i)).toBeInTheDocument();
        });
    });
});
