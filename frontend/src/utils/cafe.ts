import type { Producto } from '../api/contratos'

export type Bebida = 'expreso' | 'filtrado'
export type Tamano = 'Pocillo' | 'Mediano' | 'Taza grande'
export type Variedad = 'Brasil' | 'Colombia' | 'Etiopia'

export interface Origen {
  variedad: Variedad
  nombre: string
  descripcion: string
}

export const BEBIDAS: { valor: Bebida; nombre: string }[] = [
  { valor: 'expreso', nombre: 'Expreso' },
  { valor: 'filtrado', nombre: 'Filtrado' },
]

export const TAMANOS: Tamano[] = ['Pocillo', 'Mediano', 'Taza grande']

export const ORIGENES: Origen[] = [
  {
    variedad: 'Brasil',
    nombre: 'Brasil',
    descripcion: 'Acidez baja, cuerpo intenso y notas a chocolate y frutos secos.',
  },
  {
    variedad: 'Colombia',
    nombre: 'Colombia',
    descripcion: 'Acidez media, cuerpo equilibrado y notas cítricas y florales.',
  },
  {
    variedad: 'Etiopia',
    nombre: 'Etiopía',
    descripcion: 'Acidez alta, cuerpo ligero y notas a jazmín y frutos rojos.',
  },
]

export function buscarCafe(
  productos: Producto[],
  bebida: Bebida | '',
  tamano: Tamano | '',
  variedad: Variedad | '',
): Producto | undefined {
  if (bebida === '' || tamano === '' || variedad === '') {
    return undefined
  }

  return productos.find((producto) => {
    if (producto.tipo === 'pasteleria') return false

    return (
      producto.tipo === bebida &&
      producto.variedad === variedad &&
      producto.tamano === tamano
    )
  })
}