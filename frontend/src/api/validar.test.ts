import { describe, it, expect } from 'vitest'
import { ErrorApiSchema } from './validar'

describe('ErrorApiSchema', () => {
  it('acepta { error: string }', () => {
    expect(ErrorApiSchema.parse({ error: 'Producto no existe' })).toEqual({
      error: 'Producto no existe',
    })
  })

  it('rechaza un objeto sin error', () => {
    expect(() => ErrorApiSchema.parse({ mensaje: 'algo' })).toThrow()
  })
})