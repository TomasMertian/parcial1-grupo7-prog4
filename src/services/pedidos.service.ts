import { randomUUID } from 'crypto';
import { Fabrica } from '../models/fabrica';
import type { Pedido } from '../models/Pedido';
import type { ItemPedido, ProductoRecord } from '../models/tipos';
import type { PedidoRepository } from '../repositories/PedidoRepository';
import type { ProductoRepository } from '../repositories/ProductoRepository';

export interface NuevoPedido {
  mesaId?: number;
  items: ItemPedido[];
}

export class ProductoNoExisteError extends Error {
  constructor(public readonly productoId: string) {
    super(`El producto ${productoId} no existe`);
    this.name = 'ProductoNoExisteError';
  }
}

export class PedidosService {
  constructor(
    private readonly pedidos: PedidoRepository,
    private readonly productos: ProductoRepository,
  ) {}

  private calcularPrecio(producto: ProductoRecord): number {
    return Fabrica.crear(producto).calcularPrecio();
  }

  calcularTotal(items: ItemPedido[]): number {
    return items.reduce((total, item) => {
      const producto = this.productos.findById(item.productoId);
      if (!producto) {
        throw new ProductoNoExisteError(item.productoId);
      }
      return total + this.calcularPrecio(producto) * item.cantidad;
    }, 0);
  }

  crear(datos: NuevoPedido): Pedido {
    const pedido: Pedido = {
      id: randomUUID(),
      mesaId: datos.mesaId,
      items: datos.items,
      estado: 'pendiente',
      total: this.calcularTotal(datos.items),
    };

    this.pedidos.create({
      id: pedido.id,
      mesaId: pedido.mesaId,
      items: pedido.items,
      estado: pedido.estado,
      total: pedido.total,
    });

    return pedido;
  }
}
