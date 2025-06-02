import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('../../api/api', () => ({
    getUserById: vi.fn()
}));

import { getUserById } from '../../api/api';
import ProfilePage from '../ProfilePage';

describe('ProfilePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test('redirects to login if user_id is not in localStorage', () => {
        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('shows loading text while fetching user', () => {
        localStorage.setItem('user_id', '123');
        getUserById.mockReturnValue(new Promise(() => {})); // never resolves

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        expect(screen.getByText(/завантаження/i)).toBeInTheDocument();
    });

    test('renders user profile after successful fetch', async () => {
        localStorage.setItem('user_id', '123');
        getUserById.mockResolvedValue({
            username: 'testuser',
            email: 'test@example.com',
            phone: '123456789',
            created_at: '2025-01-01T00:00:00.000Z'
        });

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Мій профіль/i)).toBeInTheDocument();
            expect(screen.getByText(/Ім’я:/)).toBeInTheDocument();
            expect(screen.getByText(/testuser/i)).toBeInTheDocument();
            expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/123456789/i)).toBeInTheDocument();
            expect(screen.getByText('01.01.2025')).toBeInTheDocument();
        });
    });

    test('calls logout and navigates to /login', async () => {
        localStorage.setItem('token', 'abc');
        localStorage.setItem('user_id', '123');

        getUserById.mockResolvedValue({
            username: 'user',
            email: 'mail@test.com',
            phone: null,
            created_at: '2025-01-01T00:00:00.000Z'
        });

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        await screen.findByText(/Мій профіль/);
        fireEvent.click(screen.getByRole('button', { name: /вийти/i }));

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('user_id')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
