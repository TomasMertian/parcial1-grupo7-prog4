import { solicitudApi } from './http'
import { z } from 'zod'

const ItemPedidoSchema = z.object({
    productoId: z.string(),
    cantidad: z.number().int().positive(),
})

const PedidoSchema = z.object({
    id: z.string().optional(),
    mesaId: z.number().optional(),
    items: z.array(ItemPedidoSchema).optional(),
    estado: z
    .enum(['pendiente', 'en_preparacion', 'listo', 'entregado'])
    .optional(),
    total: z.number().optional(),
})

const PedidosSchema = z.array(PedidoSchema)

export type ItemPedido = z.infer<typeof ItemPedidoSchema>
export type PedidoApi = {
    id?: string
    mesaId?: number
    items: ItemPedido[]
    estado?: 'pendiente' | 'en_preparacion' | 'listo' | 'entregado'
    total?: number
}

export async function crearPedido(pedido: PedidoApi): Promise<PedidoApi> {
    const datos = await solicitudApi<unknown>('/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
    })
    
    return PedidoSchema.parse(datos) as PedidoApi
}

export async function obtenerPedidos(): Promise<PedidoApi[]> {
    const datos = await solicitudApi<unknown>('/pedidos')
    return PedidosSchema.parse(datos) as PedidoApi[]
}

export async function obtenerPedidoPorId(id: string): Promise<PedidoApi> {
    const datos = await solicitudApi<unknown>(
    `/pedidos/${encodeURIComponent(id)}`,
)

return PedidoSchema.parse(datos) as PedidoApi
}

