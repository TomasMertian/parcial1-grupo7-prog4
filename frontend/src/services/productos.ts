import { solicitudApi } from './http'
import { MenuSchema, ProductoSchema } from '../api/contratos'
import { validarContrato } from '../api/validar'
import type { Producto, Menu } from '../api/contratos'

export async function obtenerProductos(): Promise<Menu> {
  const datos = await solicitudApi<unknown>('/productos')
  return validarContrato(MenuSchema, datos)
}

export async function obtenerProductoPorId(id: string): Promise<Producto> {
  const datos = await solicitudApi<unknown>(`/productos/${encodeURIComponent(id)}`)
  return validarContrato(ProductoSchema, datos)
}