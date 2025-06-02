import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateProduct from '../CreateProductPage';
import * as api from '../../api/api';

vi.mock('../../api/api');

const mockCategories = [
    { id: 1, name: 'Категорія 1' },
    { id: 2, name: 'Категорія 2' },
];

const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/назва товару/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/опис товару/i), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByLabelText(/ціна/i), { target: { value: '100.50' } });
    fireEvent.change(screen.getByLabelText(/кількість/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/категорія/i), { target: { value: '1' } });
};

describe('CreateProduct', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders form and loads categories', async () => {
        api.getCategories.mockResolvedValue(mockCategories);
        render(<MemoryRouter><CreateProduct /></MemoryRouter>);

        expect(await screen.findByText('Категорія 1')).toBeInTheDocument();
        expect(screen.getByLabelText(/назва товару/i)).toBeInTheDocument();
    });

    test('shows error if categories fail to load', async () => {
        api.getCategories.mockRejectedValue(new Error('Failed'));
        render(<MemoryRouter><CreateProduct /></MemoryRouter>);

        expect(await screen.findByText(/не вдалося завантажити категорії/i)).toBeInTheDocument();
    });

    test('submits form and shows success message', async () => {
        api.getCategories.mockResolvedValue(mockCategories);
        api.createProduct.mockResolvedValue({});
        render(<MemoryRouter><CreateProduct /></MemoryRouter>);

        await screen.findByText('Категорія 1');
        fillForm();

        fireEvent.click(screen.getByRole('button', { name: /додати товар/i }));

        expect(await screen.findByText(/товар успішно додано/i)).toBeInTheDocument();
        await waitFor(() => expect(api.createProduct).toHaveBeenCalled());
    });

    test('shows error if createProduct fails', async () => {
        api.getCategories.mockResolvedValue(mockCategories);
        api.createProduct.mockRejectedValue(new Error('Error'));
        render(<MemoryRouter><CreateProduct /></MemoryRouter>);

        await screen.findByText('Категорія 1');
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /додати товар/i }));

        expect(await screen.findByText(/помилка при створенні товару/i)).toBeInTheDocument();
    });
});
