import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext.jsx';

describe('ProductGrid', () => {
    const products = [
        { id: 1, name: 'Bike A', price: 7000 },
        { id: 2, name: 'Helmet B', price: 800 },
    ];

const renderWithRouter = (ui) => render(
    <CartProvider>
        <MemoryRouter>
            {ui}
        </MemoryRouter>
    </CartProvider>
);

    test('renders a ProductCard for each product with correct name and button', () => {
        renderWithRouter(<ProductGrid products={products} />);

        for (const product of products) {
            expect(screen.getByText(product.name)).toBeInTheDocument();
        }

        const buttons = screen.getAllByRole('button', { name: 'Додати в кошик' });
        expect(buttons).toHaveLength(products.length);
    });

    test('renders no ProductCards when products is empty', () => {
        renderWithRouter(<ProductGrid products={[]} />);
        expect(screen.queryByRole('button', { name: 'Додати в кошик' })).toBeNull();
    });
});


