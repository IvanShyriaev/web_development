import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header';

vi.mock('../../context/CartContext', () => ({
    useCart: () => ({
        cart: [
            { id: 1, name: 'Велосипед A', quantity: 2 },
            { id: 2, name: 'Велосипед B', quantity: 1 }
        ]
    })
}));

function CurrentLocation() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}

function renderWithRouterAndLocation(ui) {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="*" element={
                    <>
                        {ui}
                        <CurrentLocation />
                    </>
                } />
            </Routes>
        </MemoryRouter>
    );
}

describe('Header render', () => {
    test('renders site title', () => {
        renderWithRouterAndLocation(<Header />);
        expect(screen.getByText(/ВелоСвіт/i)).toBeInTheDocument();
    });

    test('renders navigation links to all pages', () => {
        renderWithRouterAndLocation(<Header />);
        expect(screen.getByText(/Головна/i)).toBeInTheDocument();
        expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
        expect(screen.getByText(/Кошик/i)).toBeInTheDocument();
        expect(screen.getByText(/Профіль/i)).toBeInTheDocument();
        expect(screen.getByText(/Вхід/i)).toBeInTheDocument();
    });

    test('displays cart item count badge', () => {
        renderWithRouterAndLocation(<Header />);
        const badge = screen.getByText('3');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('cart-badge');
    });
});

describe('Header navigation', () => {
    test('navigates to home page ("/") on link click', async () => {
        renderWithRouterAndLocation(<Header />);
        await userEvent.click(screen.getByText(/Головна/i));
        expect(screen.getByTestId('location')).toHaveTextContent('/');
    });

    test('navigates to catalog page ("/catalog") on link click', async () => {
        renderWithRouterAndLocation(<Header />);
        await userEvent.click(screen.getByText(/Каталог/i));
        expect(screen.getByTestId('location')).toHaveTextContent('/catalog');
    });

    test('navigates to cart page ("/cart") on link click', async () => {
        renderWithRouterAndLocation(<Header />);
        await userEvent.click(screen.getByText(/Кошик/i));
        expect(screen.getByTestId('location')).toHaveTextContent('/cart');
    });

    test('navigates to profile page ("/profile") on link click', async () => {
        renderWithRouterAndLocation(<Header />);
        await userEvent.click(screen.getByText(/Профіль/i));
        expect(screen.getByTestId('location')).toHaveTextContent('/profile');
    });

    test('navigates to login page ("/login") on link click', async () => {
        renderWithRouterAndLocation(<Header />);
        await userEvent.click(screen.getByText(/Вхід/i));
        expect(screen.getByTestId('location')).toHaveTextContent('/login');
    });
});

