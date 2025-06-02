import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogoutButton from '../LogoutButton';
import { logoutUser } from '../../api/api';

vi.mock('../../api/api', () => ({
    logoutUser: vi.fn(),
}));

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('LogoutButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('calls logoutUser on click', async () => {
        render(<LogoutButton />);
        const button = screen.getByRole('button', { name: /вийти/i });
        await userEvent.click(button);
        expect(logoutUser).toHaveBeenCalledTimes(1);
    });

    test('navigates to /login on logout', async () => {
        render(<LogoutButton />);
        const button = screen.getByRole('button', { name: /вийти/i });
        await userEvent.click(button);
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
});
