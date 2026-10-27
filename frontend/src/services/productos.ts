import { solicitudApi } from './http'
import { z } from 'zod'

const ProductoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    tipo: z.string().optional(),
    precio: z.number(),
})

const ProductosSchema = z.array(ProductoSchema)

export type ProductoApi = z.infer<typeof ProductoSchema>

export async function obtenerProductos(): Promise<ProductoApi[]> {
    const datos = await solicitudApi<unknown>('/productos')
    return ProductosSchema.parse(datos)
}


const ProductoPorIdSchema = z.object({
    id: z.string(),
    nombre: z.string().optional(),
    tipo: z.string().optional(),
    precio: z.number(),
})

export async function obtenerProductoPorId(
    id: string,
): Promise<z.infer<typeof ProductoPorIdSchema>> {
    const datos = await solicitudApi<unknown>(
        `/productos/${encodeURIComponent(id)}`,
    )
    return ProductoPorIdSchema.parse(datos)
}