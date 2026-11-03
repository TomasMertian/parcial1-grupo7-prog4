import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmarPedido } from './ConfirmarPedido'

const mocks = vi.hoisted(() => ({
  vaciarCarrito: vi.fn(),
  crearPedido: vi.fn(),
  obtenerPedidoPorId: vi.fn(),
  items: [] as {
    producto: { id: string; nombre: string; precio: number; tipo: string }
    cantidad: number
  }[],
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ items: mocks.items, vaciarCarrito: mocks.vaciarCarrito }),
}))

vi.mock('../services/pedidos', () => ({
  crearPedido: mocks.crearPedido,
  obtenerPedidoPorId: mocks.obtenerPedidoPorId,
}))

const muffin = {
  producto: { id: 'pas-muffin', nombre: 'Muffin de chocolate', precio: 2500, tipo: 'pasteleria' },
  cantidad: 2,
}

describe('ConfirmarPedido', () => {
  beforeEach(() => {
    mocks.items = []
    mocks.vaciarCarrito.mockClear()
    mocks.crearPedido.mockReset()
    mocks.obtenerPedidoPorId.mockReset()
  })

  it('deshabilita el botón con el carrito vacío', () => {
    render(<ConfirmarPedido mesa={4} />)
    expect(screen.getByRole('button', { name: /confirmar pedido/i })).toBeDisabled()
  })

  it('envía mesa e ítems y muestra número, estado y total', async () => {
    const usuario = userEvent.setup()
    mocks.items = [muffin]
    mocks.crearPedido.mockResolvedValue({
      id: 'pedido-1',
      mesaId: 4,
      estado: 'pendiente',
      total: 5000,
      items: [],
    })

    render(<ConfirmarPedido mesa={4} />)
    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(mocks.crearPedido).toHaveBeenCalledWith({
      mesaId: 4,
      items: [{ productoId: 'pas-muffin', cantidad: 2 }],
    })
    expect(await screen.findByText(/pedido #pedido-1/i)).toBeInTheDocument()
    expect(screen.getByText(/estado:\s*pendiente/i)).toBeInTheDocument()
    expect(screen.getByText(/5\.000/)).toBeInTheDocument()
    expect(mocks.vaciarCarrito).toHaveBeenCalledTimes(1)
  })

  it('omite mesaId cuando no hay mesa', async () => {
    const usuario = userEvent.setup()
    mocks.items = [muffin]
    mocks.crearPedido.mockResolvedValue({
      id: 'pedido-1',
      estado: 'pendiente',
      total: 5000,
      items: [],
    })

    render(<ConfirmarPedido mesa={null} />)
    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(mocks.crearPedido).toHaveBeenCalledWith({
      items: [{ productoId: 'pas-muffin', cantidad: 2 }],
    })
    expect(await screen.findByText(/retiro en barra/i)).toBeInTheDocument()
  })
})
