import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from '../Hero';
import userEvent from '@testing-library/user-event';

function Catalog() {
    return <div>Каталог товарів</div>;
}

describe('Hero', () => {
    test('renders with text', () => {
        render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>
        );

        expect(screen.getByText(/Ласкаво просимо до ВелоСвіту!/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Перейти до каталогу/i })).toBeInTheDocument();
    });

    test('navigate to /catalog after pressing button', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/catalog" element={<Catalog />} />
                </Routes>
            </MemoryRouter>
        );

        const button = screen.getByRole('link', { name: /Перейти до каталогу/i });
        await user.click(button);

        expect(screen.getByText(/Каталог товарів/i)).toBeInTheDocument();
    });
});

