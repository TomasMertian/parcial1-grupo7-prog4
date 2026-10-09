//**Se prueba con**

//- Unit: los 9 precios de la tabla.

import { describe, it, expect } from 'vitest';
import { CafeExpreso } from '../../src/models/CafeExpreso';

describe('CafeExpreso', () => {
it.each([
    ['Pocillo', 'Brasil', 5020],
    ['Pocillo', 'Colombia', 5740],
    ['Pocillo', 'Etiopia', 6820],
    ['Mediano', 'Brasil', 6280],
    ['Mediano', 'Colombia', 7360],
    ['Mediano', 'Etiopia', 8980],
    ['Taza grande', 'Brasil', 7540],
    ['Taza grande', 'Colombia', 8980],
    ['Taza grande', 'Etiopia', 11140],
    ] as const)(
    'calcula el precio de %s con café %s',
    (tamano, variedad, precioEsperado) => {
    const cafe = new CafeExpreso('E1', variedad, tamano);

    expect(cafe.calcularPrecio()).toBe(precioEsperado);
    },);
});

