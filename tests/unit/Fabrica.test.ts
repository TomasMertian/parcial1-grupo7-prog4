import {it, describe, expect} from 'vitest'
import { Fabrica } from '../../src/models/fabrica'
import { Pasteleria } from '../../src/models/pasteleria';

describe("test unitario fabrica",() => {
    it("debe crear una instancia de Producto", () => {
        const datosCrudos = {id:"pas-muffin",nombre:"Muffin de chocolate",precioBase:2500,tipo:"pasteleria"};
        
        const producto = Fabrica.crear(datosCrudos)!

        expect(producto).toBeInstanceOf(Pasteleria);
    })  
})