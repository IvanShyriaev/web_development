import { describe, test, expect, vi } from 'vitest';
import * as api from '../api.js';


describe('getProducts', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'getProducts_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.getProducts();
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.getProducts()).rejects.toThrow();
    });
});


describe('createProduct', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'createProduct_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.createProduct(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.createProduct(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('deleteProduct', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'deleteProduct_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.deleteProduct(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.deleteProduct(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('getCategories', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'getCategories_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.getCategories();
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.getCategories()).rejects.toThrow();
    });
});


describe('loginUser', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'loginUser_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.loginUser(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.loginUser(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('getProductById', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'getProductById_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.getProductById(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.getProductById(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('updateProduct', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'updateProduct_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.updateProduct(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.updateProduct(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('getUsers', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'getUsers_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.getUsers();
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.getUsers()).rejects.toThrow();
    });
});


describe('getUserById', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'getUserById_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.getUserById(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.getUserById(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('createUser', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'createUser_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.createUser(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.createUser(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('updateUser', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'updateUser_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.updateUser(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.updateUser(123, {name: 'test'})).rejects.toThrow();
    });
});


describe('deleteUser', () => {
    test('success response', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ result: 'deleteUser_ok' }),
                headers: {
                    get: () => 'application/json'
                }
            })
        );
        const res = await api.deleteUser(123, {name: 'test'});
        expect(res).toBeDefined();
    });

    test('error response', async () => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));
        await expect(api.deleteUser(123, {name: 'test'})).rejects.toThrow();
    });
});

describe('logoutUser', () => {
    test('removes token from localStorage', () => {
        const removeItem = vi.spyOn(Storage.prototype, 'removeItem');
        api.logoutUser();
        expect(removeItem).toHaveBeenCalledWith('token');
    });
});
