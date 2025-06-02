import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminPanelPage from '../AdminPanelPage';

describe('AdminPanelPage', () => {
    test('renders heading and section options', () => {
        render(
            <MemoryRouter>
                <AdminPanelPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { level: 2, name: /адміністративна панель/i }))
            .toBeInTheDocument();

        expect(screen.getByText(/Оберіть розділ для керування/i)).toBeInTheDocument();

        expect(screen.getByRole('heading', { level: 3, name: /товари/i })).toBeInTheDocument();
        expect(screen.getByText(/керування асортиментом/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /товари/i })).toHaveAttribute('href', '/admin-products');

        expect(screen.getByRole('heading', { level: 3, name: /користувачі/i })).toBeInTheDocument();
        expect(screen.getByText(/перегляд, редагування та видалення/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /користувачі/i })).toHaveAttribute('href', '/admin-users');
    });
});
