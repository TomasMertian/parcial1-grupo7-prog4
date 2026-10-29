import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { makeApp } from '../../src/app';
import { JsonProductoRepository } from '../../src/repositories/ProductoRepository';
import { JsonPedidoRepository } from '../../src/repositories/PedidoRepository';
import { PRODUCTOS_FILE } from '../../src/config/paths';

describe('Integración: Consultas de Pedidos (GET /pedidos)', () => {
    let dir: string;
    let app: ReturnType<typeof makeApp>;
    let archivoPedidos: string;

    beforeEach(() => {
        // cree un directorio temporal para no tocar la base de datos real
        dir = mkdtempSync(join(tmpdir(), 'pedidos-consulta-'));
        archivoPedidos = join(dir, 'pedidos.json');

        // cree un archivo de pedidos temporal con datos de prueba
        const pedidosDePrueba = [
            { id: 'pedido-123', mesa: 5, items: [], total: 1000, estado: 'pendiente' }
        ];
        writeFileSync(archivoPedidos, JSON.stringify(pedidosDePrueba));

        // cree la app con los repositorios apuntando a los archivos temporales
        app = makeApp({
            productos: new JsonProductoRepository(PRODUCTOS_FILE),
            pedidos: new JsonPedidoRepository(archivoPedidos),
        });
    });

    afterEach(() => {
    // borre el directorio temporal y sus archivos despues de cada test
    rmSync(dir, { recursive: true, force: true });
    });

    it('GET /pedidos -> deberia devolver 200 y la lista de pedidos', async () => {
        const respuesta = await request(app).get('/pedidos');

        expect(respuesta.status).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
        expect(respuesta.body).toHaveLength(1);
        expect(respuesta.body[0].mesa).toBe(5);
    });

    it('GET /pedidos/:id -> deberia devolver el pedido con estado, items y total', async () => {
        const respuesta = await request(app).get('/pedidos/pedido-123');

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.id).toBe('pedido-123');
        expect(respuesta.body.estado).toBe('pendiente');
        expect(respuesta.body.items).toEqual([]);
        expect(respuesta.body.total).toBe(1000);
    });

    it('GET /pedidos/:id -> deberia devolver 404 si el ID no existe', async () => {
        const respuesta = await request(app).get('/pedidos/id-falso-404');

        expect(respuesta.status).toBe(404);
        expect(respuesta.body.error).toBe('Pedido no encontrado');
    });
});