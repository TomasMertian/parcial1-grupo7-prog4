import { describe, it, expect, vi, afterEach } from 'vitest'
import { obtenerProductos } from './productos'

afterEach(() => vi.unstubAllGlobals())

describe('contrato de productos', () => {
  it('rechaza un menú con precio en texto', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify([
        { id: 'x', nombre: 'Muffin', precioBase: 2500, precio: '2500', tipo: 'pasteleria' },
      ]), { status: 200 }),
    ))

    await expect(obtenerProductos()).rejects.toThrow(/contrato/i)
  })
})