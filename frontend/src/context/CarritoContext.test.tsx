
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from './CarritoContext';

function CarritoPrueba() {
  const {
    items,
    subtotal,
    agregarProducto,
    restarProducto,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  const producto = {
    id: 'pas-muffin',
    nombre: 'Muffin de chocolate',
    precio: 2500,
    tipo: 'pasteleria',
  };

  return (
    <div>
      <p>Productos: {items.length}</p>
      <p>Subtotal: {subtotal}</p>
      <p>Cantidad: {items[0]?.cantidad ?? 0}</p>

      <button onClick={() => agregarProducto(producto)}>
        Agregar
      </button>

      <button onClick={() => restarProducto(producto.id)}>
        Restar
      </button>

      <button onClick={() => eliminarProducto(producto.id)}>
        Eliminar
      </button>

      <button onClick={vaciarCarrito}>
        Vaciar
      </button>
    </div>
  );
}

describe('CarritoContext', () => {
  it('inicia con el carrito vacío y subtotal cero', () => {
    render(
      <CarritoProvider>
        <CarritoPrueba />
      </CarritoProvider>
    );

    expect(screen.getByText('Productos: 0')).toBeTruthy();
    expect(screen.getByText('Subtotal: 0')).toBeTruthy();
  });

  it('agrega un producto y actualiza el subtotal', () => {
    render(
      <CarritoProvider>
        <CarritoPrueba />
      </CarritoProvider>
    );

    act(() => {
      screen.getByRole('button', { name: 'Agregar' }).click();
    });

    expect(screen.getByText('Productos: 1')).toBeTruthy();
    expect(screen.getByText('Cantidad: 1')).toBeTruthy();
    expect(screen.getByText('Subtotal: 2500')).toBeTruthy();
  });

  it('resta una unidad del producto', () => {
    render(
      <CarritoProvider>
        <CarritoPrueba />
      </CarritoProvider>
    );

    act(() => {
      screen.getByRole('button', { name: 'Agregar' }).click();
      screen.getByRole('button', { name: 'Agregar' }).click();
    });

    act(() => {
      screen.getByRole('button', { name: 'Restar' }).click();
    });

    expect(screen.getByText('Cantidad: 1')).toBeTruthy();
    expect(screen.getByText('Subtotal: 2500')).toBeTruthy();
  });

  it('elimina el producto del carrito', () => {
    render(
      <CarritoProvider>
        <CarritoPrueba />
      </CarritoProvider>
    );

    act(() => {
      screen.getByRole('button', { name: 'Agregar' }).click();
    });

    act(() => {
      screen.getByRole('button', { name: 'Eliminar' }).click();
    });

    expect(screen.getByText('Productos: 0')).toBeTruthy();
    expect(screen.getByText('Subtotal: 0')).toBeTruthy();
  });
  
it('vacía el carrito y reinicia el subtotal', () => {
  render(
    <CarritoProvider>
      <CarritoPrueba />
    </CarritoProvider>
  );

  act(() => {
    screen.getByRole('button', { name: 'Agregar' }).click();
  });

  act(() => {
    screen.getByRole('button', { name: 'Vaciar' }).click();
  });

  expect(screen.getByText('Productos: 0')).toBeTruthy();
  expect(screen.getByText('Subtotal: 0')).toBeTruthy();
});

});
