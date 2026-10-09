//Cuentas de reportes: total facturado, unidades vendidas y más vendido.


import type { PedidoRepository } from '../repositories/PedidoRepository';
import type { ProductoRepository } from '../repositories/ProductoRepository';

export class ReportesService {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly productoRepository: ProductoRepository,
  ) {}

  obtenerFacturacionTotal(): number {
    const pedidos = this.pedidoRepository.findAll();
    const productos = this.productoRepository.findAll();

    return pedidos.reduce((total, pedido) => {
      const subtotal = pedido.items.reduce((suma, item) => {
        const producto = productos.find(
          (p) => p.id === item.productoId,
        );

        if (!producto) return suma;

        return suma + producto.precioBase * item.cantidad;
      }, 0);

      return total + subtotal;
    }, 0);
  }

  obtenerUnidadesVendidas(): { productoId: string; cantidad: number }[] {
    const pedidos = this.pedidoRepository.findAll();
    const unidades = new Map<string, number>();

    for (const pedido of pedidos) {
      for (const item of pedido.items) {
        const actual = unidades.get(item.productoId) ?? 0;
        unidades.set(item.productoId, actual + item.cantidad);
      }
    }

    return Array.from(unidades, ([productoId, cantidad]) => ({
      productoId,
      cantidad,
    }));
  }

  obtenerMasVendido():
    | { productoId: string; nombre: string; cantidad: number }
    | null {
    const unidades = this.obtenerUnidadesVendidas();
    const productos = this.productoRepository.findAll();

    if (unidades.length === 0) return null;

    const mayor = unidades.reduce((maximo, actual) =>
      actual.cantidad > maximo.cantidad ? actual : maximo,
    );

    const producto = productos.find((p) => p.id === mayor.productoId);

    if (!producto) return null;

    return {
      productoId: producto.id,
      nombre: producto.nombre,
      cantidad: mayor.cantidad,
    };
  }
}
