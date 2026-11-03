import { z } from 'zod'
import { solicitudApi } from './http'
import { validarContrato } from '../api/validar'

const FacturacionSchema = z.object({ facturacionTotal: z.number() })

const MasVendidoSchema = z.object({
  productoId: z.string(),
  nombre: z.string(),
  cantidad: z.number(),
})

export type Facturacion = z.infer<typeof FacturacionSchema>
export type MasVendido = z.infer<typeof MasVendidoSchema>

export async function obtenerFacturacion(): Promise<Facturacion> {
  const datos = await solicitudApi<unknown>(
    '/reportes/facturacion',
    {},
    'No se pudo obtener la facturación',
  )
  return validarContrato(FacturacionSchema, datos)
}

export async function obtenerMasVendido(): Promise<MasVendido | null> {
  const datos = await solicitudApi<unknown>(
    '/reportes/mas-vendido',
    {},
    'No se pudo obtener el producto más vendido',
  )
  return validarContrato(MasVendidoSchema.nullable(), datos)
}
