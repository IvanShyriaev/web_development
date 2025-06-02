import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../api/api', () => {
    const mockProduct = {
        id: 5,
        name: 'Test Bike',
        price: 999,
        description: 'A fast bike',
        stock: 10,
        category_id: 3
    };
    return {
        getProductById: vi.fn().mockResolvedValue(mockProduct)
    };
});

const addToCart = vi.fn();
vi.mock('../../context/CartContext', () => ({
    useCart: () => ({ addToCart })
}));

import ProductPage from '../ProductPage';

describe('ProductPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders loading then product details', async () => {
        render(
            <MemoryRouter>
                <ProductPage/>
            </MemoryRouter>
        );

        expect(screen.getByText(/Завантаження/i))
            .toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test Bike'))
                .toBeInTheDocument();
            expect(screen.getByText(/₴999/))
                .toBeInTheDocument();
            expect(screen.getByText(/A fast bike/))
                .toBeInTheDocument();
            expect(screen.getByText(/Кількість на складі: 10/))
                .toBeInTheDocument();
            expect(screen.getByText(/Категорія: #3/))
                .toBeInTheDocument();
        });
    });


    test('calls addToCart on button click', async () => {
        render(
            <MemoryRouter>
                <ProductPage />
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText('Test Bike'));
        const button = screen.getByRole('button', { name: /додати до кошика/i });
        button.click();
        expect(addToCart).toHaveBeenCalledTimes(1);
    });

    test('falls back to default image if product image fails to load', async () => {
        render(
            <MemoryRouter>
                <ProductPage />
            </MemoryRouter>
        );

        const img = await screen.findByRole('img');

        fireEvent.error(img);

        expect(img.src).toContain('/web_development/images/default.jpg');
    });
});

