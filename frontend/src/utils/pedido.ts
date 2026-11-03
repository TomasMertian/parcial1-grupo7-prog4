import type { ItemCarrito } from './carritoReducer'
import type { ItemPedido, PedidoApi } from '../services/pedidos'

export type EstadoPedido = NonNullable<PedidoApi['estado']>

const ETIQUETAS_ESTADO: Record<EstadoPedido, string> = {
  pendiente: 'Pendiente',
  en_preparacion: 'En preparación',
  listo: 'Listo',
  entregado: 'Entregado',
}

export function etiquetaEstado(estado: EstadoPedido): string {
  return ETIQUETAS_ESTADO[estado]
}

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
