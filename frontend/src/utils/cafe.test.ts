import { describe, expect, it } from 'vitest'
import { buscarCafe } from './cafe'
import type { Producto } from '../api/contratos'

const productos: Producto[] = [
  {
    tipo: 'expreso',
    id: 'exp-med-col',
    nombre: 'Café expreso Mediano Colombia',
    precioBase: 2500,
    precio: 7360,
    variedad: 'Colombia',
    tamano: 'Mediano',
  },
  {
    tipo: 'filtrado',
    id: 'fil-poc-bra',
    nombre: 'Café Filtrado Brasil - Pocillo',
    precioBase: 3200,
    precio: 4040,
    variedad: 'Brasil',
    tamano: 'Pocillo',
  },
  {
    tipo: 'pasteleria',
    id: 'pas-muffin',
    nombre: 'Muffin de chocolate',
    precioBase: 2500,
    precio: 2500,
  },
]

describe('buscarCafe', () => {
  it('encuentra la combinación de bebida, tamaño y origen', () => {
    expect(buscarCafe(productos, 'expreso', 'Mediano', 'Colombia')).toBe(
      productos[0],
    )
  })

  it('devuelve undefined si falta una elección', () => {
    expect(buscarCafe(productos, '', 'Mediano', 'Colombia')).toBeUndefined()
    expect(buscarCafe(productos, 'expreso', '', 'Colombia')).toBeUndefined()
    expect(buscarCafe(productos, 'expreso', 'Mediano', '')).toBeUndefined()
  })

  it('devuelve undefined si la combinación no existe', () => {
    expect(
      buscarCafe(productos, 'expreso', 'Taza grande', 'Etiopia'),
    ).toBeUndefined()
  })
})