
import { it, describe, expect } from 'vitest';
import request from 'supertest';
import { crearDeps, makeApp } from '../../src/app';
import { Fabrica } from '../../src/models/fabrica';
import productosData from '../../src/data/productos.json';


const app = makeApp(crearDeps());

describe('Integración: endpoints de productos', () => {
    it('GET /productos debe devolver 200 y una lista', async () => {
        const response = await request(app).get('/productos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /productos/:id debe devolver 200 y el producto', async () => {
        const response = await request(app).get('/productos/pas-muffin');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
    it('GET /productos/:id debe devolver 404 y el mensaje', async () => {
        const response = await request(app).get('/productos/pas-maffin');

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
    });

    it.each([
    ['exp-poc-bra', 5020],
    ['exp-poc-col', 5740],
    ['exp-poc-eti', 6820],
    ['exp-med-bra', 6280],
    ['exp-med-col', 7360],
    ['exp-med-eti', 8980],
    ['exp-taz-bra', 7540],
    ['exp-taz-col', 8980],
    ['exp-taz-eti', 11140],
])(
    'GET /productos devuelve el precio correcto para %s',
    async (id, precioEsperado) => {
    const response = await request(app).get('/productos');

    expect(response.status).toBe(200);

    const producto = response.body.find(
        (p: { id: string }) => p.id === id,
    );

    expect(producto).toBeDefined();

    const productoOriginal = productosData.find(
        (p) => p.id === id,
    );

    expect(productoOriginal).toBeDefined();

    const productoCalculado = Fabrica.crear(productoOriginal!);
    expect(productoCalculado.calcularPrecio()).toBe(precioEsperado);
    },
);
});
