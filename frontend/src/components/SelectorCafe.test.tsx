import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SelectorCafe } from './SelectorCafe'
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
]

describe('Componente SelectorCafe', () => {
  it('muestra los tres pasos y el botón deshabilitado', () => {
    render(<SelectorCafe productos={productos} onAgregar={vi.fn()} />)

    expect(screen.getByText(/paso 1: elegí la bebida/i)).toBeInTheDocument()
    expect(screen.getByText(/paso 2: elegí el tamaño/i)).toBeInTheDocument()
    expect(screen.getByText(/paso 3: elegí el origen/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /agregar al pedido/i }),
    ).toBeDisabled()
  })

  it('agrega el producto correcto según bebida, tamaño y origen', async () => {
    const usuario = userEvent.setup()
    const onAgregar = vi.fn()

    render(<SelectorCafe productos={productos} onAgregar={onAgregar} />)

    await usuario.click(screen.getByRole('radio', { name: 'Expreso' }))
    await usuario.click(screen.getByRole('radio', { name: 'Mediano' }))

    expect(
      screen.getByText(/acidez media, cuerpo equilibrado/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/\$\s*7\.360/)).toBeInTheDocument()

    await usuario.click(screen.getByRole('radio', { name: /colombia/i }))
    await usuario.click(
      screen.getByRole('button', { name: /agregar al pedido/i }),
    )

    expect(onAgregar).toHaveBeenCalledWith(productos[0], 1)
  })
})