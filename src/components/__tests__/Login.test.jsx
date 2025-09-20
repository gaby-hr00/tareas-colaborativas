import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Login from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';
import bcrypt from 'bcryptjs';

// Mock de useNavigate para simular la navegación
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

// Mock de la librería bcryptjs, asegurando que tiene un export por defecto
vi.mock('bcryptjs', () => ({
    default: {
        compare: vi.fn(),
    },
}));

// Mock de los datos de usuario para las pruebas
const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashed-password-123',
};

// Función de ayuda para renderizar el componente
const renderLogin = () => {
    render(
        <Router>
            <Login />
        </Router>
    );
};

// Mock del objeto global fetch
global.fetch = vi.fn();

describe('Componente de Login', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        // Configuración por defecto para el mock de fetch
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([mockUser]),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('debe renderizar el formulario de inicio de sesión', () => {
        renderLogin();
        // Verificación de que todos los elementos están en el documento
        expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    test('debe manejar el inicio de sesión exitoso y redirigir', async () => {
        // Asegurar que bcrypt.compare retorna true para el login exitoso
        vi.mocked(bcrypt).compare.mockResolvedValueOnce(true);

        renderLogin();

        // Simular la entrada de datos
        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        const passwordInput = screen.getByPlaceholderText(/contraseña/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Simular el envío del formulario
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);

        // Esperar la redirección
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/list'); // ⬅️ CAMBIO AQUÍ
        });
    });

    test('debe mostrar un error si el usuario no es encontrado', async () => {
        // Mock de fetch para simular un usuario no encontrado
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]),
        });

        renderLogin();

        // Simular la entrada de datos con un correo inexistente
        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        const passwordInput = screen.getByPlaceholderText(/contraseña/i);
        fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'anypassword' } });

        // Simular el envío del formulario
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);

        // Esperar el mensaje de error
        await waitFor(() => {
            expect(screen.getByText('❌ Usuario no encontrado')).toBeInTheDocument();
        });
    });

    test('debe mostrar un error para credenciales incorrectas', async () => {
        // Mock de bcrypt.compare para simular una contraseña incorrecta
        vi.mocked(bcrypt).compare.mockResolvedValueOnce(false);

        renderLogin();

        // Simular la entrada de datos con una contraseña incorrecta
        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        const passwordInput = screen.getByPlaceholderText(/contraseña/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });

        // Simular el envío del formulario
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);

        // Esperar el mensaje de error
        await waitFor(() => {
            expect(screen.getByText('❌ Credenciales incorrectas')).toBeInTheDocument();
        });
    });

    test('debe mostrar un error si el servidor no es alcanzable', async () => {
        // Mock de fetch para simular un error de red
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        renderLogin();

        // Simular la entrada de datos
        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        const passwordInput = screen.getByPlaceholderText(/contraseña/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Simular el envío del formulario
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);

        // Esperar el mensaje de error
        await waitFor(() => {
            expect(screen.getByText('⚠️ No se pudo conectar con el servidor')).toBeInTheDocument();
        });
    });
});