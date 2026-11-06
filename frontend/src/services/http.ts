import { ErrorApiSchema } from '../api/validar'
export async function solicitudApi<T>(
    url: string,
    opciones: RequestInit = {},
    mensajeError = 'No se pudo completar la solicitud',
): Promise<T> {
    let respuesta: Response
    
    try {
        respuesta = Object.keys(opciones).length > 0
        ? await fetch(url, opciones)
        : await fetch(url)
    } catch {
        throw new Error('No se pudo conectar con la API')
    }
    
    let datos: unknown
    
    try {
        datos = await respuesta.json()
    } catch {
        throw new Error('La API devolvió una respuesta inválida')
    }
    
    if (!respuesta.ok) {
        const resultado = ErrorApiSchema.safeParse(datos)
    
        throw new Error(
            resultado.success ? resultado.data.error : mensajeError,
        )
    }
    
    return datos as T
}
