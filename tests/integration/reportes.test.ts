import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { makeApp } from '../../src/app';
import { JsonProductoRepository } from '../../src/repositories/ProductoRepository';
import { JsonPedidoRepository } from '../../src/repositories/PedidoRepository';

describe('Integración: Reportes', () => {
    let dir: string;
    let app: ReturnType<typeof makeApp>;
    let archivoPedidos: string;
    let archivoProductos: string;
    
    beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'reportes-'));
    archivoPedidos = join(dir, 'pedidos.json');
    archivoProductos = join(dir, 'productos.json');

    const productosDePrueba = [
        {
        id: '1',
        nombre: 'Selva Negra de prueba',
        precioBase: 100,
        tipo: 'pasteleria',
    },
    {
        id: '2',
        nombre: 'Muffin de prueba',
        precioBase: 50,
        tipo: 'pasteleria',
    },
    ];

    const pedidosDePrueba = [
        {
        id: '1',
        mesa: 1,
        items: [
            { productoId: '1', cantidad: 2 },
            { productoId: '2', cantidad: 1 },
        ],
        estado: 'entregado',
    },
    {
        id: '2',
        mesa: 2,
        items: [{ productoId: '1', cantidad: 1 }],
        estado: 'entregado',
    },
    ];

    writeFileSync(archivoProductos, JSON.stringify(productosDePrueba));
    writeFileSync(archivoPedidos, JSON.stringify(pedidosDePrueba));

    app = makeApp({
        productos: new JsonProductoRepository(archivoProductos),
        pedidos: new JsonPedidoRepository(archivoPedidos),
    });
});

afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
});

it('GET /reportes/facturacion -> devuelve la facturación total', async () => {
    const respuesta = await request(app).get('/reportes/facturacion');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ facturacionTotal: 350 });
});

it('GET /reportes/mas-vendido -> devuelve el producto más vendido', async () => {
    const respuesta = await request(app).get('/reportes/mas-vendido');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
        productoId: '1',
        nombre: 'Selva Negra de prueba',
        cantidad: 3,
    });
});

it('GET /reportes/mas-vendido -> devuelve null si no hay ventas', async () => {
    writeFileSync(archivoPedidos, JSON.stringify([]));

    const respuesta = await request(app).get('/reportes/mas-vendido');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toBeNull();
});
});
