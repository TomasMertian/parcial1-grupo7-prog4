export async function crearPedido(pedido) {
    const respuesta = await fetch('/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo crear el pedido')
    }

    return datos
}

export async function obtenerPedidos() {
    const respuesta = await fetch('/pedidos')
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudieron obtener los pedidos')
    }

    return datos
}

export async function obtenerPedidoPorId(id) {
    const respuesta = await fetch(`/pedidos/${encodeURIComponent(id)}`)
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo obtener el pedido')
    }

    return datos
}

