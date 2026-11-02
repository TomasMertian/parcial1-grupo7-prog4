
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Producto } from '../api/contratos';
import { Pasteleria } from './Pasteleria';

const { agregarProducto } = vi.hoisted(() => ({
  agregarProducto: vi.fn(),
}));

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarProducto,
  }),
}));

const productos: Producto[] = [
  {
    id: '1',
    nombre: 'Muffin de chocolate',
    precioBase: 2000,
    precio: 2500,
    tipo: 'pasteleria',
  },
  {
    id: '2',
    nombre: 'Café expreso',
    precioBase: 1500,
    precio: 1800,
    tipo: 'expreso',
    variedad: 'Brasil',
    tamano: 'Mediano',
  },
];

describe('Componente Pasteleria', () => {
  beforeEach(() => {
    agregarProducto.mockClear();
  });

  it('muestra solamente los productos de pastelería', () => {
    render(<Pasteleria productos={productos} />);

    expect(
      screen.getByText('Muffin de chocolate'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Café expreso'),
    ).not.toBeInTheDocument();
  });

  it('agrega el producto al carrito al presionar el botón', () => {
    render(<Pasteleria productos={productos} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /agregar al carrito/i,
      }),
    );

    expect(agregarProducto).toHaveBeenCalledWith({
      id: '1',
      nombre: 'Muffin de chocolate',
      precio: 2500,
      tipo: 'pasteleria',
    });
  });
});
