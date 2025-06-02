import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

const renderCartHook = () => renderHook(() => useCart(), { wrapper: CartProvider });

beforeEach(() => {
    localStorage.clear();
});

describe('CartContext', () => {
    test('initializes with empty cart if localStorage is empty', () => {
        const { result } = renderCartHook();
        expect(result.current.cart).toEqual([]);
    });

    test('loads cart from localStorage if data exists', () => {
        localStorage.setItem('cart', JSON.stringify([{ id: 1, name: 'Item', quantity: 2 }]));
        const { result } = renderCartHook();
        expect(result.current.cart).toEqual([{ id: 1, name: 'Item', quantity: 2 }]);
    });

    test('adds a new item to cart with quantity 1', () => {
        const { result } = renderCartHook();

        act(() => {
            result.current.addToCart({ id: 1, name: 'Bike', price: 100 });
        });

        expect(result.current.cart).toEqual([
            { id: 1, name: 'Bike', price: 100, quantity: 1 }
        ]);
    });

    test('increments quantity if item already exists', () => {
        const { result } = renderCartHook();

        act(() => {
            result.current.addToCart({ id: 1, name: 'Bike', price: 100 });
            result.current.addToCart({ id: 1, name: 'Bike', price: 100 });
        });

        expect(result.current.cart).toEqual([
            { id: 1, name: 'Bike', price: 100, quantity: 2 }
        ]);
    });

    test('updates quantity directly with updateQuantity()', () => {
        const { result } = renderCartHook();

        act(() => {
            result.current.addToCart({ id: 2, name: 'Helmet', price: 50 });
            result.current.updateQuantity(2, 5);
        });

        expect(result.current.cart[0].quantity).toBe(5);
    });

    test('removes item if quantity is set to 0', () => {
        const { result } = renderCartHook();

        act(() => {
            result.current.addToCart({ id: 3, name: 'Bell', price: 20 });
            result.current.updateQuantity(3, 0);
        });

        expect(result.current.cart).toEqual([]);
    });

    test('removes item with removeFromCart()', () => {
        const { result } = renderCartHook();

        act(() => {
            result.current.addToCart({ id: 4, name: 'Gloves', price: 30 });
            result.current.removeFromCart(4);
        });

        expect(result.current.cart).toEqual([]);
    });

    test('clears all items with clearCart()', () => {
        const { result } = renderCartHook();

        act(() => {
            result.current.addToCart({ id: 5, name: 'Pump', price: 60 });
            result.current.addToCart({ id: 6, name: 'Lock', price: 40 });
            result.current.clearCart();
        });

        expect(result.current.cart).toEqual([]);
    });

    test('syncs cart to localStorage on update', () => {
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        const { result } = renderCartHook();
        act(() => {
            result.current.addToCart({ id: 7, name: 'Light', price: 90 });
        });

        expect(setItemSpy).toHaveBeenCalledWith('cart', JSON.stringify([
            { id: 7, name: 'Light', price: 90, quantity: 1 }
        ]));
    });
});
