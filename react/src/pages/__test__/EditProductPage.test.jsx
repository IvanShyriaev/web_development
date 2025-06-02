import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProductPage from '../EditProductPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '../../api/api';

vi.mock('../../api/api');

describe('EditProductPage', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 123.45,
        stock: 10,
        category_id: 1,
    };

    const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' }
    ];

    beforeEach(() => {
        api.getProductById.mockResolvedValue(mockProduct);
        api.getCategories.mockResolvedValue(mockCategories);
        api.updateProduct.mockResolvedValue({});
    });

    test('renders product form and updates values', async () => {
        render(
            <MemoryRouter initialEntries={['/edit-product/1']}>
                <Routes>
                    <Route path="/edit-product/:id" element={<EditProductPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByDisplayValue('Test Product')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/Ціна:/i), { target: { value: '199.99' } });
        fireEvent.click(screen.getByRole('button', { name: /оновити товар/i }));

        await waitFor(() =>
            expect(api.updateProduct).toHaveBeenCalledWith('1', expect.objectContaining({ price: '199.99' }))
        );
    });

    test('shows error message on fetch failure', async () => {
        api.getProductById.mockRejectedValueOnce(new Error('fail'));

        render(
            <MemoryRouter initialEntries={['/edit-product/999']}>
                <Routes>
                    <Route path="/edit-product/:id" element={<EditProductPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/помилка при завантаженні товару/i)).toBeInTheDocument();
    });

    test('shows error message if updateProduct fails', async () => {
        const fakeProduct = {
            id: 1,
            name: 'Старий товар',
            description: 'Опис',
            price: 100,
            stock: 10,
            category_id: 1
        };
        const fakeCategories = [{ id: 1, name: 'Категорія 1' }];

        api.getProductById.mockResolvedValue(fakeProduct);
        api.getCategories.mockResolvedValue(fakeCategories);
        api.updateProduct.mockRejectedValue(new Error('Помилка'));

        render(
            <MemoryRouter initialEntries={['/edit-product/1']}>
                <Routes>
                    <Route path="/edit-product/:id" element={<EditProductPage />} />
                </Routes>
            </MemoryRouter>
        );

        await screen.findByDisplayValue('Старий товар');


        fireEvent.change(screen.getByLabelText(/назва/i), {
            target: { value: 'Новий товар' }
        });

        fireEvent.click(screen.getByRole('button', { name: /оновити товар/i }));

        await waitFor(() => {
            expect(screen.getByText(/помилка при оновленні товару/i)).toBeInTheDocument();
        });
    });
});
