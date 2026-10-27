import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { makeApp } from '../../src/app';
import { JsonProductoRepository } from '../../src/repositories/ProductoRepository';
import { JsonPedidoRepository } from '../../src/repositories/PedidoRepository';
import { PRODUCTOS_FILE } from '../../src/config/paths';

describe('POST /pedidos', () => {
  let dir: string;
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'pedidos-'));
    app = makeApp({
      productos: new JsonProductoRepository(PRODUCTOS_FILE),
      pedidos: new JsonPedidoRepository(join(dir, 'pedidos.json')),
    });
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('crea el pedido y responde 201 con el total', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({ mesa: 1, items: [{ productoId: 'exp-poc-bra', cantidad: 2 }] });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.total).toBe(2 * 5020);
    expect(respuesta.body.estado).toBe('pendiente');
  });

  it('crea un pedido para una mesa cuando se proporciona mesaId', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({
        mesaId: 1,
        items: [{ productoId: 'exp-poc-bra', cantidad: 2 }],
      });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.mesaId).toBe(1);
});

  it('crea un pedido para retirar en barra cuando no se proporciona mesaId', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({
        items: [{ productoId: 'exp-poc-bra', cantidad: 2 }],
      });
      
      expect(respuesta.status).toBe(201);
      expect(respuesta.body).not.toHaveProperty('mesaId');
});

  it('guarda el total del pedido para poder consultarlo después', async () => {
    const creacion = await request(app)
      .post('/pedidos')
      .send({
        mesaId: 1,
        items: [{ productoId: 'exp-poc-bra', cantidad: 2 }],
      });

      expect(creacion.status).toBe(201);

    const consulta = await request(app)
      .get(`/pedidos/${creacion.body.id}`);

      expect(consulta.status).toBe(200);
      expect(consulta.body.estado).toBe('pendiente');
      expect(consulta.body.items).toEqual([
        { productoId: 'exp-poc-bra', cantidad: 2 },
      ]);
      expect(consulta.body.total).toBe(2 * 5020);
    });

  it('responde 400 si los datos son invalidos', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({ mesa: 1, items: [] });

    expect(respuesta.status).toBe(400);
  });

  it('responde 400 si un producto no existe', async () => {
    const respuesta = await request(app)
      .post('/pedidos')
      .send({ mesa: 1, items: [{ productoId: 'no-existe', cantidad: 1 }] });

    expect(respuesta.status).toBe(400);
  });
});
