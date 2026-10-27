export async function obtenerProductos() {
    const respuesta = await fetch('/productos')
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudieron cargar los productos')
    }

    return datos
}

export async function obtenerProductoPorId(id) {
    const respuesta = await fetch(`/productos/${encodeURIComponent(id)}`)
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo obtener el producto')
    }

    return datos
}
