import {it, describe, expect} from 'vitest'
import { Fabrica } from '../../src/models/fabrica'
import { Pasteleria } from '../../src/models/pasteleria';
import { CafeExpreso } from '../../src/models/CafeExpreso';
import { CafeFiltrado } from '../../src/models/CafeFiltrado';

describe("test unitario fabrica",() => {
    it("debe crear una instancia de Pasteleria", () => {
        const datosCrudos = {id:"pas-muffin",nombre:"Muffin de chocolate",precioBase:2500,tipo:"pasteleria"};
        
        const producto = Fabrica.crear(datosCrudos)

        expect(producto).toBeInstanceOf(Pasteleria);
    });
    it("debe crear una instancia de cafeExpreso", () => {
        const datosCrudos = {"id": "exp-taz-bra", "nombre": "Expreso Taza grande Brasil", "precioBase": 2500, "tipo": "expreso", "variedad": "Brasil", "tamano": "Taza grande"};
        
        const producto = Fabrica.crear(datosCrudos)

        expect(producto).toBeInstanceOf(CafeExpreso);
    });
    it("debe crear una instancia de cafeFiltrado", () => {
        const datosCrudos = {"id": "fil-poc-col", "nombre": "Filtrado Pocillo Colombia", "precioBase": 3200, "tipo": "filtrado", "variedad": "Colombia", "tamano": "Pocillo"};
        
        const producto = Fabrica.crear(datosCrudos)

        expect(producto).toBeInstanceOf(CafeFiltrado);
    });
})