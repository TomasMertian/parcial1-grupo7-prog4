
export async function obtenerFacturacion() {
    const respuesta = await fetch('/reportes/facturacion')
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo obtener la facturación')
    }

    return datos
}

export async function obtenerMasVendido() {
    const respuesta = await fetch('/reportes/mas-vendido')
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo obtener el producto más vendido')
    }

    return datos
}
