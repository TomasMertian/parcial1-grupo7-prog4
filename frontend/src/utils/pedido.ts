import type { ItemCarrito } from './carritoReducer'
import type { ItemPedido } from '../services/pedidos'

export function crearCuerpoPedido(
  items: ItemCarrito[],
  mesaId: number | null,
): { mesaId?: number; items: ItemPedido[] } {
  return {
    ...(mesaId !== null ? { mesaId } : {}),
    items: items.map(({ producto, cantidad }) => ({
      productoId: producto.id,
      cantidad,
    })),
  }
}
