
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Carrito } from './Carrito';

const { restarProducto, eliminarProducto, vaciarCarrito } = vi.hoisted(() => ({
  restarProducto: vi.fn(),
  eliminarProducto: vi.fn(),
  vaciarCarrito: vi.fn(),
}));

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    items: [
      {
        producto: {
          id: '1',
          nombre: 'Muffin de chocolate',
          precio: 2500,
          tipo: 'pasteleria',
        },
        cantidad: 2,
      },
    ],
    subtotal: 5000,
    restarProducto,
    eliminarProducto,
    vaciarCarrito,
  }),
}));

describe('Componente Carrito', () => {
  beforeEach(() => {
    restarProducto.mockClear();
    eliminarProducto.mockClear();
    vaciarCarrito.mockClear();
  });

  it('muestra los productos, cantidades y subtotal', () => {
    render(<Carrito />);

    expect(screen.getByText('Muffin de chocolate')).toBeInTheDocument();
    expect(screen.getByText(/cantidad:\s*2/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal del carrito: \$5\.000/)).toBeInTheDocument();
  });

  it('permite restar una unidad', () => {
    render(<Carrito />);

    fireEvent.click(screen.getByRole('button', { name: /restar/i }));

    expect(restarProducto).toHaveBeenCalledWith('1');
  });

  it('permite eliminar un producto', () => {
    render(<Carrito />);

    fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));

    expect(eliminarProducto).toHaveBeenCalledWith('1');
  });

  it('permite vaciar el carrito', () => {
    render(<Carrito />);

    fireEvent.click(screen.getByRole('button', { name: /vaciar carrito/i }));

    expect(vaciarCarrito).toHaveBeenCalled();
  });
});
