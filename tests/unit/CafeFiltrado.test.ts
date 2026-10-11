import { describe, it, expect } from 'vitest';
import { CafeFiltrado } from '../../src/models/CafeFiltrado.js'; //todavia no existe el archivo

describe('Modelo - CafeFiltrado', () => {
    describe('Variedad: Brasil (140 $/g)', () => {
    it('Pocillo (6g) -> Precio final: 4040', () => {
        const cafe = new CafeFiltrado('Brasil', 'Pocillo');
        expect(cafe.calcularPrecio()).toBe(4040);
    });

    it('Mediano (15g) -> Precio final: 5300', () => {
        const cafe = new CafeFiltrado('Brasil', 'Mediano');
        expect(cafe.calcularPrecio()).toBe(5300);
    });

    it('Taza grande (25g) -> Precio final: 6700', () => {
        const cafe = new CafeFiltrado('Brasil', 'Taza grande');
        expect(cafe.calcularPrecio()).toBe(6700);
    });
});

describe('Variedad: Colombia (180 $/g)', () => {
    it('Pocillo (6g) -> Precio final: 4280', () => {
        const cafe = new CafeFiltrado('Colombia', 'Pocillo');
        expect(cafe.calcularPrecio()).toBe(4280);
    });

    it('Mediano (15g) -> Precio final: 5900', () => {
        const cafe = new CafeFiltrado('Colombia', 'Mediano');
        expect(cafe.calcularPrecio()).toBe(5900);
    });

    it('Taza grande (25g) -> Precio final: 7700', () => {
        const cafe = new CafeFiltrado('Colombia', 'Taza grande');
        expect(cafe.calcularPrecio()).toBe(7700);
    });
});

describe('Variedad: Etiopía (240 $/g)', () => {
    it('Pocillo (6g) -> Precio final: 4640', () => {
        const cafe = new CafeFiltrado('Etiopía', 'Pocillo');
        expect(cafe.calcularPrecio()).toBe(4640);
    });

    it('Mediano (15g) -> Precio final: 6800', () => {
        const cafe = new CafeFiltrado('Etiopía', 'Mediano');
        expect(cafe.calcularPrecio()).toBe(6800);
    });

    it('Taza grande (25g) -> Precio final: 9200', () => {
        const cafe = new CafeFiltrado('Etiopía', 'Taza grande');
        expect(cafe.calcularPrecio()).toBe(9200);
    });
});
};