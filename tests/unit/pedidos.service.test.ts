import { describe, it, expect, vi } from 'vitest';
import { PedidosService, ProductoNoExisteError } from '../../src/services/pedidos.service';
import type { PedidoRepository } from '../../src/repositories/PedidoRepository';
import type { ProductoRepository } from '../../src/repositories/ProductoRepository';

const productos = [
  {
    id: 'exp-poc-bra',
    nombre: 'Expreso Pocillo Brasil',
    precioBase: 2500,
    tipo: 'expreso' as const,
    variedad: 'Brasil' as const,
    tamano: 'Pocillo' as const,
  },
  {
    id: 'pas-muffin',
    nombre: 'Muffin de chocolate',
    precioBase: 2500,
    tipo: 'pasteleria' as const,
  },
];

function crearServicio() {
  const pedidoRepo: PedidoRepository = {
    findAll: vi.fn(() => []),
    findById: vi.fn(),
    create: vi.fn((pedido) => pedido),
  };

  const productoRepo: ProductoRepository = {
    findAll: vi.fn(() => productos),
    findById: vi.fn((id) => productos.find((producto) => producto.id === id)),
  };

  return { servicio: new PedidosService(pedidoRepo, productoRepo), pedidoRepo, productoRepo };
}

describe('PedidosService', () => {
  it('calcula el total segun cantidades', () => {
    const { servicio } = crearServicio();

    expect(
      servicio.calcularTotal([
        { productoId: 'exp-poc-bra', cantidad: 2 },
        { productoId: 'pas-muffin', cantidad: 3 },
      ]),
    ).toBe(2 * 5020 + 3 * 2500);
  });

  it('calcula el total cuando todos los productos existen', () => {
    const { servicio, productoRepo } = crearServicio();

    const total = servicio.calcularTotal([
      { productoId: 'exp-poc-bra', cantidad: 1 },
      { productoId: 'pas-muffin', cantidad: 1 },
    ]);

    expect(total).toBe(5020 + 2500);
    expect(productoRepo.findById).toHaveBeenCalledWith('exp-poc-bra');
    expect(productoRepo.findById).toHaveBeenCalledWith('pas-muffin');
  });

  it('crea un pedido pendiente con el total calculado', () => {
    const { servicio, pedidoRepo } = crearServicio();

    const pedido = servicio.crear({
      mesaId: 3,
      items: [{ productoId: 'exp-poc-bra', cantidad: 1 }],
    });

    expect(pedido.total).toBe(5020);
    expect(pedido.estado).toBe('pendiente');
    expect(pedidoRepo.create).toHaveBeenCalledWith({
      id: pedido.id,
      mesaId: 3,
      items: [{ productoId: 'exp-poc-bra', cantidad: 1 }],
      estado: 'pendiente',
      total: 5020,
    });
  });

  it('lanza error si un producto no existe', () => {
    const { servicio } = crearServicio();

    expect(() =>
      servicio.calcularTotal([{ productoId: 'no-existe', cantidad: 1 }]),
    ).toThrow(ProductoNoExisteError);
  });
});
