import { describe, it, expect, vi, afterEach } from 'vitest'
import { obtenerFacturacion, obtenerMasVendido } from './reportes'

afterEach(() => vi.unstubAllGlobals())

describe('contrato de reportes', () => {
  it('rechaza una facturacion sin facturacionTotal', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ total: 100 }), { status: 200 }),
    ))

    await expect(obtenerFacturacion()).rejects.toThrow(/contrato/i)
  })

  it('acepta null cuando todavia no hay ventas', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify(null), { status: 200 }),
    ))

    await expect(obtenerMasVendido()).resolves.toBeNull()
  })
})