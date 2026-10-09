
import { describe, it, expect, vi } from 'vitest';
import { ReportesService } from '../../src/services/reportes.service';
import type { PedidoRepository } from '../../src/repositories/PedidoRepository';
import type { ProductoRepository } from '../../src/repositories/ProductoRepository';

describe('ReportesService', () => {
  const pedidos = [
    {
      id: 'P1',
      mesa: 1,
      estado: 'entregado' as const,
      items: [
        { productoId: 'exp-poc-bra', cantidad: 2 },
        { productoId: 'pas-muffin', cantidad: 1 },
      ],
    },
    {
      id: 'P2',
      mesa: 2,
      estado: 'entregado' as const,
      items: [
        { productoId: 'exp-poc-bra', cantidad: 1 },
        { productoId: 'pas-selva', cantidad: 2 },
      ],
    },
  ];

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
    {
      id: 'pas-selva',
      nombre: 'Porción de torta selva negra',
      precioBase: 4200,
      tipo: 'pasteleria' as const,
    },
  ];

  function crearServicio() {
    const pedidoRepo: PedidoRepository = {
      findAll: vi.fn(() => pedidos),
      findById: vi.fn(),
      create: vi.fn(),
    };

    const productoRepo: ProductoRepository = {
      findAll: vi.fn(() => productos),
      findById: vi.fn(),
    };

    return new ReportesService(pedidoRepo, productoRepo);
  }

  it('calcula las unidades vendidas por producto', () => {
    const servicio = crearServicio();

    expect(servicio.obtenerUnidadesVendidas()).toEqual([
      { productoId: 'exp-poc-bra', cantidad: 3 },
      { productoId: 'pas-muffin', cantidad: 1 },
      { productoId: 'pas-selva', cantidad: 2 },
    ]);
  });

  it('identifica el producto más vendido', () => {
    const servicio = crearServicio();

    expect(servicio.obtenerMasVendido()).toEqual({
      productoId: 'exp-poc-bra',
      nombre: 'Expreso Pocillo Brasil',
      cantidad: 3,
    });
  });

  it('calcula la facturación con el precio final del expreso', () => {
    const servicio = crearServicio();

    // 3 expresos Brasil Pocillo a $5020
    // 1 muffin a $2500
    // 2 porciones de selva negra a $4200
    expect(servicio.obtenerFacturacionTotal()).toBe(
      3 * 5020 + 1 * 2500 + 2 * 4200,
    );
  });
});
