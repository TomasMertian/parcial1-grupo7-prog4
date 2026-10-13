import {it, describe, expect } from 'vitest';
import { Pasteleria } from "../../src/models/pasteleria";


describe("Pasteleria test",() => {
    const muffin = new Pasteleria("pas-muffin","Muffin de chocolate",2000,"pasteleria")
    const selvaNegra = new Pasteleria("pas-selva","Porción de torta selva negra",4000,"pasteleria")

    it ("muffin debe costar 2400",() =>{
        expect(muffin.calcularPrecio()).toBe(2500)
    });

    it("muffin debe costar 4200",() =>{
        expect(selvaNegra.calcularPrecio()).toBe(4200)
    })


})