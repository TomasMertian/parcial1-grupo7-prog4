
import { describe, it, expect } from 'vitest';
import { carritoReducer } from './carritoReducer';

describe('carritoReducer', () => {
  it('agrega un producto al carrito con cantidad 1', () => {
    const estadoInicial: {
  producto: typeof producto;
  cantidad: number;
}   [] = [];

    const producto = {
      id: 'pas-muffin',
      nombre: 'Muffin de chocolate',
      precio: 2500,
      tipo: 'pasteleria',
    };

    const nuevoEstado = carritoReducer(estadoInicial, {
      tipo: 'AGREGAR',
      producto,
    });

    expect(nuevoEstado).toEqual([
      {
        producto,
        cantidad: 1,
      },
    ]);
  });
});


it('aumenta la cantidad cuando se agrega el mismo producto nuevamente', () => {
  const producto = {
    id: 'pas-muffin',
    nombre: 'Muffin de chocolate',
    precio: 2500,
    tipo: 'pasteleria',
  };

  const estadoInicial = [
    {
      producto,
      cantidad: 1,
    },
  ];

  const nuevoEstado = carritoReducer(estadoInicial, {
    tipo: 'AGREGAR',
    producto,
  });

  expect(nuevoEstado).toEqual([
    {
      producto,
      cantidad: 2,
    },
  ]);
});


it('resta una unidad de un producto del carrito', () => {
  const producto = {
    id: 'pas-muffin',
    nombre: 'Muffin de chocolate',
    precio: 2500,
    tipo: 'pasteleria',
  };

  const estadoInicial = [
    {
      producto,
      cantidad: 2,
    },
  ];

  const nuevoEstado = carritoReducer(estadoInicial, {
    tipo: 'RESTAR',
    productoId: 'pas-muffin',
  });

  expect(nuevoEstado).toEqual([
    {
      producto,
      cantidad: 1,
    },
  ]);
});
