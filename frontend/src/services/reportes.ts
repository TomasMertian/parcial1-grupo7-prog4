import { z } from 'zod'
import { solicitudApi } from './http'

const FacturacionSchema = z.object({}).passthrough()

const MasVendidoSchema = z.object({
    productoId: z.string(),
    nombre: z.string(),
    cantidad: z.number(),
})

export async function obtenerFacturacion() {
    const datos = await solicitudApi<unknown>(
        '/reportes/facturacion',
        {},
        'No se pudo obtener la facturación',
    )
    
    return FacturacionSchema.parse(datos)
}

export async function obtenerMasVendido() {
    const datos = await solicitudApi<unknown>(
        '/reportes/mas-vendido',
        {},
        'No se pudo obtener el producto más vendido',
    )
    
    return MasVendidoSchema.parse(datos)
}
