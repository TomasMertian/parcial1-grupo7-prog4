import { describe, expect, it } from 'vitest'
import { crearCuerpoPedido } from './pedido'

const muffin = {
  producto: { id: 'pas-muffin', nombre: 'Muffin de chocolate', precio: 2500, tipo: 'pasteleria' },
  cantidad: 2,
}

describe('crearCuerpoPedido', () => {
  it('mapea los ítems del carrito al contrato de la API', () => {
    expect(crearCuerpoPedido([muffin], 4)).toEqual({
      mesaId: 4,
      items: [{ productoId: 'pas-muffin', cantidad: 2 }],
    })
  })

  it('omite mesaId cuando el pedido es para retirar en barra', () => {
    const cuerpo = crearCuerpoPedido([muffin], null)
    expect(cuerpo).toEqual({ items: [{ productoId: 'pas-muffin', cantidad: 2 }] })
    expect(cuerpo).not.toHaveProperty('mesaId')
  })
})
