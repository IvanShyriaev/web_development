import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

let mockUseCart;

vi.mock('../../context/CartContext', () => ({
    useCart: () => mockUseCart()
}));

import CartPage from '../CartPage';

describe('CartPage', () => {
    const removeFromCart = vi.fn();
    const updateQuantity = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseCart = () => ({
            cart: [
                { id: 1, name: 'Bike', price: 1000, quantity: 2 },
                { id: 2, name: 'Helmet', price: 300, quantity: 1 }
            ],
            removeFromCart,
            updateQuantity
        });
    });

    test('renders items in cart and calculates total', () => {
        render(<MemoryRouter><CartPage /></MemoryRouter>);

        expect(screen.getByText('Bike')).toBeInTheDocument();
        expect(screen.getByText('Helmet')).toBeInTheDocument();
        expect(screen.getByText('₴2300.00')).toBeInTheDocument(); // 1000*2 + 300
    });

    test('updates quantity when +/- buttons are clicked', () => {
        render(<MemoryRouter><CartPage /></MemoryRouter>);

        fireEvent.click(screen.getAllByText('+')[0]);
        expect(updateQuantity).toHaveBeenCalledWith(1, 3);

        fireEvent.click(screen.getAllByText('-')[1]);
        expect(updateQuantity).toHaveBeenCalledWith(2, 0);
    });

    test('removes item from cart on click', () => {
        render(<MemoryRouter><CartPage /></MemoryRouter>);

        fireEvent.click(screen.getAllByRole('button', { name: /видалити/i })[0]);
        expect(removeFromCart).toHaveBeenCalledWith(1);
    });

    test('renders empty cart message if cart is empty', () => {
        mockUseCart = () => ({
            cart: [],
            removeFromCart,
            updateQuantity
        });

        render(<MemoryRouter><CartPage /></MemoryRouter>);

        expect(screen.getByText(/кошик порожній/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /перейти до каталогу/i })).toBeInTheDocument();
    });
});
