import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../context/CartContext', () => ({
    useCart: () => ({ addToCart: vi.fn() })
}));

vi.mock('../../api/api.js', () => {
    return {
        getProducts: vi.fn()
    };
});

import { getProducts } from '../../api/api';
import CatalogPage from '../CatalogPage';

describe('CatalogPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders products after successful API call', async () => {
        getProducts.mockResolvedValue([
            { id: 1, name: 'Bike', price: 1000 },
            { id: 2, name: 'Helmet', price: 500 }
        ]);

        render(
            <MemoryRouter>
                <CatalogPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Каталог товарів/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Bike')).toBeInTheDocument();
            expect(screen.getByText('Helmet')).toBeInTheDocument();
            expect(screen.getAllByRole('button', { name: /додати в кошик/i })).toHaveLength(2);
        });
    });

    test('shows error message when API call fails', async () => {
        getProducts.mockRejectedValue(new Error('Fetch failed'));

        render(
            <MemoryRouter>
                <CatalogPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/не вдалося завантажити товари/i)).toBeInTheDocument();
        });
    });
});
