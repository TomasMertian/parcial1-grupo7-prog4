import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ConfirmarPedido } from './ConfirmarPedido'

const mocks = vi.hoisted(() => ({
  vaciarCarrito: vi.fn(),
  items: [] as {
    producto: { id: string; nombre: string; precio: number; tipo: string }
    cantidad: number
  }[],
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ items: mocks.items, vaciarCarrito: mocks.vaciarCarrito }),
}))

describe('ConfirmarPedido', () => {
  beforeEach(() => {
    mocks.items = []
    mocks.vaciarCarrito.mockClear()
  })

  it('deshabilita el botón con el carrito vacío', () => {
    render(<ConfirmarPedido mesa={4} />)
    expect(screen.getByRole('button', { name: /confirmar pedido/i })).toBeDisabled()
  })
})
