import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../api/api', () => ({
    loginUser: vi.fn()
}));

import { loginUser } from '../../api/api';
import LoginPage from '../LoginPage';

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test('renders the login form', () => {
        render(<MemoryRouter><LoginPage /></MemoryRouter>);
        expect(screen.getByLabelText(/ім’я користувача/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /увійти/i })).toBeInTheDocument();
    });

    test('logs in successfully and navigates to home', async () => {
        loginUser.mockResolvedValue({ token: 'abc123', user_id: '42' });

        render(<MemoryRouter><LoginPage /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText(/ім’я користувача/i), { target: { value: 'test' } });
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'secret' } });

        fireEvent.click(screen.getByRole('button', { name: /увійти/i }));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('abc123');
            expect(localStorage.getItem('user_id')).toBe('42');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

});
