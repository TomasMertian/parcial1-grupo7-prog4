import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SeguimientoPedido } from './SeguimientoPedido'

const { obtenerPedidoPorId } = vi.hoisted(() => ({ obtenerPedidoPorId: vi.fn() }))

vi.mock('../services/pedidos', () => ({ obtenerPedidoPorId }))

const pedido = { id: 'pedido-1', estado: 'pendiente' as const, total: 5000, mesaId: 4 }

describe('SeguimientoPedido', () => {
  beforeEach(() => {
    obtenerPedidoPorId.mockReset()
  })

  it('muestra número, mesa, estado y total', () => {
    render(<SeguimientoPedido pedido={pedido} />)

    expect(screen.getByText(/pedido #pedido-1/i)).toBeInTheDocument()
    expect(screen.getByText(/mesa 4/i)).toBeInTheDocument()
    expect(screen.getByText(/estado:\s*pendiente/i)).toBeInTheDocument()
    expect(screen.getByText(/5\.000/)).toBeInTheDocument()
  })

  it('actualiza el estado sin recargar la página', async () => {
    const usuario = userEvent.setup()
    obtenerPedidoPorId.mockResolvedValue({ id: 'pedido-1', estado: 'en_preparacion', total: 5000 })

    render(<SeguimientoPedido pedido={pedido} />)
    await usuario.click(screen.getByRole('button', { name: /actualizar estado/i }))

    expect(obtenerPedidoPorId).toHaveBeenCalledWith('pedido-1')
    expect(await screen.findByText(/estado:\s*en preparación/i)).toBeInTheDocument()
  })

  it('muestra el error si falla la actualización y conserva el estado anterior', async () => {
    const usuario = userEvent.setup()
    obtenerPedidoPorId.mockRejectedValue(new Error('Pedido no encontrado'))

    render(<SeguimientoPedido pedido={pedido} />)
    await usuario.click(screen.getByRole('button', { name: /actualizar estado/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Pedido no encontrado')
    expect(screen.getByText(/estado:\s*pendiente/i)).toBeInTheDocument()
  })
})
