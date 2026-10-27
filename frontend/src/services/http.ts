
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
        const error =
        typeof datos === 'object' &&
        datos !== null &&
        'error' in datos &&
        typeof datos.error === 'string'
        ? datos.error
        : mensajeError
        
        throw new Error(error)
    }
    
    return datos as T
}
