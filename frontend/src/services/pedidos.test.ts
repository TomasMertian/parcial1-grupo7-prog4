import { describe, it, expect, vi, afterEach } from 'vitest'
import { crearPedido } from './pedidos'

afterEach(() => vi.unstubAllGlobals())

describe('contrato de pedidos', () => {
  it('rechaza una respuesta sin id, estado ni total', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 201 }),
    ))

    await expect(
      crearPedido({ mesaId: 4, items: [{ productoId: 'x', cantidad: 1 }] }),
    ).rejects.toThrow(/contrato/i)
  })
})