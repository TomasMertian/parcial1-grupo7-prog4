import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import {
  crearCuerpoPedido,
  etiquetaEstado,
  formatearPrecio,
  mensajeDeError,
} from './pedido'

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

describe('etiquetaEstado', () => {
  it('traduce los cuatro estados del pedido', () => {
    expect(etiquetaEstado('pendiente')).toBe('Pendiente')
    expect(etiquetaEstado('en_preparacion')).toBe('En preparación')
    expect(etiquetaEstado('listo')).toBe('Listo')
    expect(etiquetaEstado('entregado')).toBe('Entregado')
  })
})

describe('formatearPrecio', () => {
  it('formatea en pesos argentinos sin decimales', () => {
    expect(formatearPrecio(7360)).toMatch(/\$\s*7\.360/)
  })
})

describe('mensajeDeError', () => {
  it('traduce un error de contrato a un mensaje legible', () => {
    expect(mensajeDeError(new ZodError([]), 'Error genérico')).toBe(
      'La API devolvió datos con formato inesperado',
    )
  })

  it('conserva el mensaje de un Error común', () => {
    expect(mensajeDeError(new Error('La mesa no existe'), 'Error genérico')).toBe(
      'La mesa no existe',
    )
  })

  it('usa el mensaje por defecto si no es un Error', () => {
    expect(mensajeDeError('raro', 'No se pudo confirmar el pedido')).toBe(
      'No se pudo confirmar el pedido',
    )
  })
})
