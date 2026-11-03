import type { ZodType } from 'zod'

export function validarContrato<T>(schema: ZodType<T>, datos: unknown): T {
  const resultado = schema.safeParse(datos)
  if (!resultado.success) {
    throw new Error('La respuesta de la API no cumple el contrato')
  }
  return resultado.data
}