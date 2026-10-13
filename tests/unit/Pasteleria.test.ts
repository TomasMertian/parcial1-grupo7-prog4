import {it, describe, expect } from 'vitest';
import { Pasteleria } from "../../src/models/pasteleria";


describe("Pasteleria test",() => {
    const muffin = new Pasteleria("pas-muffin","Muffin de chocolate",2500,"pasteleria")
    const selvaNegra = new Pasteleria("pas-selva","Porción de torta selva negra",4200,"pasteleria")

    it ("muffin debe costar 2500",() =>{
        expect(muffin.calcularPrecio()).toBe(2500)
    });

    it("muffin debe costar 4200",() =>{
        expect(selvaNegra.calcularPrecio()).toBe(4200)
    })


})