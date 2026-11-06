import { z } from 'zod'
import { solicitudApi } from './http'
import { validarContrato } from '../api/validar'

const ItemPedidoSchema = z.object({
  productoId: z.string().min(1),
  cantidad: z.number().int().positive(),
})

const PedidoSchema = z.object({
  id: z.string().min(1),
  mesaId: z.number().int().positive().optional(),
  items: z.array(ItemPedidoSchema),
  estado: z.enum(['pendiente', 'en_preparacion', 'listo', 'entregado']),
  total: z.number(),
})

const PedidosSchema = z.array(PedidoSchema)

export const NuevoPedidoSchema = z.object({
  mesaId: z.number().int().positive().optional(),
  items: z.array(ItemPedidoSchema).min(1),
})

export type ItemPedido = z.infer<typeof ItemPedidoSchema>
export type PedidoApi = z.infer<typeof PedidoSchema>
export type NuevoPedido = z.infer<typeof NuevoPedidoSchema>

export async function crearPedido(pedido: NuevoPedido): Promise<PedidoApi> {
  const datos = await solicitudApi<unknown>('/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  })
  return validarContrato(PedidoSchema, datos)
}

export async function obtenerPedidos(): Promise<PedidoApi[]> {
  const datos = await solicitudApi<unknown>('/pedidos')
  return validarContrato(PedidosSchema, datos)
}

export async function obtenerPedidoPorId(id: string): Promise<PedidoApi> {
  const datos = await solicitudApi<unknown>(`/pedidos/${encodeURIComponent(id)}`)
  return validarContrato(PedidoSchema, datos)
}