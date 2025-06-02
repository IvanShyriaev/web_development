import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const addToCart = vi.fn();

vi.mock('../../context/CartContext', () => ({
    useCart: () => ({ addToCart })
}));

import ProductCard from '../ProductCard';

const product = {
    id: 1,
    name: 'Тестовий велосипед',
    price: 12345.678
};

const productWithMissingImage = {
    id: 99,
    name: 'Тестовий велосипед',
    price: 9999.99
};

function renderProductCard(customProduct = product) {
    return render(
        <MemoryRouter>
            <ProductCard product={customProduct} />
        </MemoryRouter>
    );
}

describe('ProductCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders name and price', () => {
        renderProductCard();
        expect(screen.getByText(/Тестовий велосипед/i)).toBeInTheDocument();
        expect(screen.getByText(/₴12345.68/)).toBeInTheDocument();
    });

    test('has link "Детальніше"', () => {
        renderProductCard();
        const link = screen.getByRole('link', { name: /детальніше/i });
        expect(link).toHaveAttribute('href', '/product/1');
    });

    test('renders image with correct path', () => {
        renderProductCard();
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', '/web_development/images/1.jpg');
        expect(img).toHaveAttribute('alt', 'Тестовий велосипед');
    });

    test('renders default image if product image fails to load', () => {
        renderProductCard(productWithMissingImage);
        const img = screen.getByRole('img');
        fireEvent.error(img);
        expect(img.src).toContain('/web_development/images/default.jpg');
    });

    test('calls addToCart on button click', async () => {
        renderProductCard();
        const button = screen.getByRole('button', { name: /додати в кошик/i });
        await userEvent.click(button);
        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenCalledWith(product);
    });
});
