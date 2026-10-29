import { afterEach, describe, expect, it, vi } from 'vitest'
import { obtenerProductos, obtenerProductoPorId } from '../src/services/productos.js'
import {
    crearPedido,
    obtenerPedidos,
    obtenerPedidoPorId,
} from '../src/services/pedidos.js'
import {
    obtenerFacturacion,
    obtenerMasVendido,
} from '../src/services/reportes.js'

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('Servicio de productos', () => {
    it('obtiene la lista de productos', async () => {
        const productos = [{ 
        id: 'exp-poc-bra', 
        nombre: 'Expreso Brasil', 
        precioBase: 4000, 
        precio: 5020, 
        tipo: 'expreso', 
        variedad: 'Brasil', 
        tamano: 'Pocillo' 
}]
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(productos), { status: 200 }),
        ))

        await expect(obtenerProductos()).resolves.toEqual(productos)
        expect(fetch).toHaveBeenCalledWith('/productos')
    })

    it('obtiene un producto por ID', async () => {
        const producto = { 
        id: 'exp-poc-bra', 
        nombre: 'Expreso Brasil', 
        precioBase: 4000, 
        precio: 5020, 
        tipo: 'expreso', 
        variedad: 'Brasil', 
        tamano: 'Pocillo' 
        }
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(producto), { status: 200 }),
        ))
        
        await expect(obtenerProductoPorId('exp-poc-bra')).resolves.toEqual(producto)
        expect(fetch).toHaveBeenCalledWith('/productos/exp-poc-bra')
    })

    it('informa un error cuando falla la consulta de productos', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 }),
        ))
        
        await expect(obtenerProductos()).rejects.toThrow('Error interno')
    })
})

describe('Servicio de pedidos', () => {
    it('crea un pedido enviando los datos en JSON', async () => {
        const pedido = {
            mesaId: 4,
            items: [{ productoId: 'exp-poc-bra', cantidad: 2 }],
        }
        const creado = { id: 'pedido-1', ...pedido, estado: 'pendiente', total: 10040 }
        
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(creado), { status: 201 }),
        ))
        
        await expect(crearPedido(pedido)).resolves.toEqual(creado)
        
        expect(fetch).toHaveBeenCalledWith('/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido),
        })
    })


    it('obtiene la lista de pedidos', async () => {
        const pedidos = [{ id: 'pedido-1', estado: 'pendiente', total: 10040 }]
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(pedidos), { status: 200 }),
        ))
        
        await expect(obtenerPedidos()).resolves.toEqual(pedidos)
        expect(fetch).toHaveBeenCalledWith('/pedidos')
    })
    
    it('obtiene un pedido por ID', async () => {
        const pedido = { id: 'pedido-1', estado: 'pendiente', total: 10040, items: [] }
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(pedido), { status: 200 }),
        ))
        
        await expect(obtenerPedidoPorId('pedido-1')).resolves.toEqual(pedido)
        expect(fetch).toHaveBeenCalledWith('/pedidos/pedido-1')
    })

    it('informa un error si el pedido no existe', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify({ error: 'Pedido no encontrado' }), { status: 404 }),
        ))
        
        await expect(obtenerPedidoPorId('inexistente'))
        .rejects.toThrow('Pedido no encontrado')
    })
})

describe('Servicio de reportes', () => {
    it('obtiene la facturación total', async () => {
        const reporte = { facturacionTotal: 15060 }

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(reporte), { status: 200 }),
        ))

        await expect(obtenerFacturacion()).resolves.toEqual(reporte)
        expect(fetch).toHaveBeenCalledWith('/reportes/facturacion')
    })

    it('obtiene el producto más vendido', async () => {
        const reporte = {
            productoId: 'exp-poc-bra',
            nombre: 'Expreso Brasil',
            cantidad: 3,
        }

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify(reporte), { status: 200 }),
        ))

        await expect(obtenerMasVendido()).resolves.toEqual(reporte)
        expect(fetch).toHaveBeenCalledWith('/reportes/mas-vendido')
    })

    it('informa un error si falla la consulta de reportes', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
            new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
                status: 500,
            }),
        ))

        await expect(obtenerFacturacion()).rejects.toThrow(
            'Error interno del servidor',
        )
    })
})
