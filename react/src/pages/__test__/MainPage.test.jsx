import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../api/api.js', () => {
    const mockProducts = [
        { id: 1, name: 'Bike', price: 1000 },
        { id: 2, name: 'Helmet', price: 500 },
        { id: 3, name: 'Bell', price: 200 },
        { id: 4, name: 'Pump', price: 300 }
    ];
    return {
        getProducts: vi.fn().mockResolvedValue(mockProducts)
    };
});

vi.mock('../../context/CartContext', () => ({
    useCart: () => ({
        addToCart: vi.fn()
    })
}));

import MainPage from '../MainPage';

describe('MainPage', () => {
    test('renders Hero section and 3 products from API', async () => {
        render(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Ласкаво просимо до ВелоСвіту/i)).toBeInTheDocument();

        await waitFor(() => {
            const buttons = screen.getAllByRole('button', { name: /додати в кошик/i });
            expect(buttons).toHaveLength(3);
        });

        expect(screen.getByText('Bike')).toBeInTheDocument();
        expect(screen.getByText('Helmet')).toBeInTheDocument();
        expect(screen.getByText('Bell')).toBeInTheDocument();
        expect(screen.queryByText('Pump')).not.toBeInTheDocument(); // not rendered
    });
});
