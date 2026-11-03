import { ZodError } from 'zod'
import type { ItemCarrito } from './carritoReducer'
import type { ItemPedido, PedidoApi } from '../services/pedidos'

export type EstadoPedido = NonNullable<PedidoApi['estado']>

export interface PedidoConfirmado {
  id: string
  estado: EstadoPedido
  total: number
  mesaId?: number
}

const ETIQUETAS_ESTADO: Record<EstadoPedido, string> = {
  pendiente: 'Pendiente',
  en_preparacion: 'En preparación',
  listo: 'Listo',
  entregado: 'Entregado',
}

export function etiquetaEstado(estado: EstadoPedido): string {
  return ETIQUETAS_ESTADO[estado]
}

export function formatearPrecio(precio: number): string {
  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
}

export function mensajeDeError(
  causa: unknown,
  mensajePorDefecto: string,
): string {
  if (causa instanceof ZodError) {
    return 'La API devolvió datos con formato inesperado'
  }

  return causa instanceof Error ? causa.message : mensajePorDefecto
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
