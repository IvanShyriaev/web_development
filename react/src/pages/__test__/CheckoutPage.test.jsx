import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckoutPage from '../CheckoutPage';
import { vi } from 'vitest';

const clearCart = vi.fn();
const navigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigate,
    };
});

vi.mock('../../context/CartContext', () => ({
    useCart: () => ({
        cart: [
            { id: 1, name: 'Bike', price: 1000, quantity: 2 },
            { id: 2, name: 'Helmet', price: 200, quantity: 1 },
        ],
        clearCart,
    }),
}));

describe('CheckoutPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders cart items and total', () => {
        render(
            <MemoryRouter>
                <CheckoutPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Bike × 2 — ₴2000.00')).toBeInTheDocument();
        expect(screen.getByText('Helmet × 1 — ₴200.00')).toBeInTheDocument();
        expect(screen.getByText(/Загальна сума: ₴2200.00/)).toBeInTheDocument();
    });

    test('submits the form and clears cart', () => {
        window.alert = vi.fn();
        render(
            <MemoryRouter>
                <CheckoutPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Ім’я/i), { target: { value: 'Ivan' } });
        fireEvent.change(screen.getByLabelText(/Адреса/i), { target: { value: 'Street 123' } });
        fireEvent.change(screen.getByLabelText(/Телефон/i), { target: { value: '123456789' } });

        fireEvent.click(screen.getByRole('button', { name: /підтвердити замовлення/i }));

        expect(window.alert).toHaveBeenCalledWith('Замовлення оформлено!');
        expect(clearCart).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith('/');
    });
});
