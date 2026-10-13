//falta implementacion de GET productos
import {it, describe, expect} from 'vitest';
import  Request from 'supertest';
import {crearDeps, makeApp} from '../../src/app';
import { array } from 'zod';

const app = makeApp(crearDeps())
describe("integracion: endpoints de productos",() => {
    it("GET /productos debe devolver 200 y la lista ",async () => {
        const response= await Request(app).get('/productos');

        expect(response.status).toBe(200);
        expect(array(response.body)).toBe(true)
        expect(response.body).toBeDefined()
    })
})
describe("integracion: endpoints de productos",() => {
    it("GET /productos/:ID debe devolver 200 y el producto ",async () => {
        const response= await Request(app).get('/productos/pas-muffin');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined()
    })
})