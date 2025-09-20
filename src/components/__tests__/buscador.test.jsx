import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Buscador from '../search';

describe('Buscador', () => {
  test('debe renderizar el input de búsqueda y el icono', () => {
    const mockSetBusqueda = vi.fn();
    render(<Buscador busqueda="" setBusqueda={mockSetBusqueda} loading={false} />);

    // Verifica si el input de búsqueda se renderiza correctamente por su placeholder
    const searchInput = screen.getByPlaceholderText(/buscar por título o descripción.../i);
    expect(searchInput).toBeInTheDocument();

    // Verifica si el icono de búsqueda se renderiza usando el testId
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('debe actualizar el valor del input y llamar a setBusqueda en cada cambio', () => {
    const mockSetBusqueda = vi.fn();
    const initialBusqueda = '';
    render(<Buscador busqueda={initialBusqueda} setBusqueda={mockSetBusqueda} loading={false} />);

    const searchInput = screen.getByPlaceholderText(/buscar por título o descripción.../i);
    const newBusqueda = 'nueva busqueda';

    // Simula la escritura en el input
    fireEvent.change(searchInput, { target: { value: newBusqueda } });

    // La función mock se debe haber llamado con el nuevo valor
    expect(mockSetBusqueda).toHaveBeenCalledWith(newBusqueda);
  });

  test('debe mostrar el spinner de carga cuando loading es true y la búsqueda no está vacía', () => {
    const mockSetBusqueda = vi.fn();
    const busquedaValue = 'algun texto';
    render(<Buscador busqueda={busquedaValue} setBusqueda={mockSetBusqueda} loading={true} />);

    // Verifica que el spinner esté presente usando su testId
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  test('no debe mostrar el spinner de carga cuando loading es false', () => {
    const mockSetBusqueda = vi.fn();
    render(<Buscador busqueda="algun texto" setBusqueda={mockSetBusqueda} loading={false} />);

    // Usa queryByTestId para asegurar que el spinner NO está en el documento
    const spinner = screen.queryByTestId('loading-spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  test('no debe mostrar el spinner de carga cuando el input de búsqueda está vacío', () => {
    const mockSetBusqueda = vi.fn();
    render(<Buscador busqueda="" setBusqueda={mockSetBusqueda} loading={true} />);

    // Usa queryByTestId para asegurar que el spinner NO está en el documento
    const spinner = screen.queryByTestId('loading-spinner');
    expect(spinner).not.toBeInTheDocument();
  });
});