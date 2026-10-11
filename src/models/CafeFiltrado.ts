import type { Producto } from './Producto';
import type { Variedad, Tamano } from './tipos';

export class CafeFiltrado implements Producto {
    id: string;
    nombre: string;
    precioBase: number = 3200;

    variedad: Variedad;
    tamano: Tamano;

    constructor(id: string, variedad: Variedad, tamano: Tamano) {
        this.id = id; 
        this.nombre = `Café Filtrado ${variedad} - ${tamano}`;
        this.variedad = variedad;
        this.tamano = tamano;
    }

    calcularPrecio(): number {
        let gramos = 0;
        if (this.tamano === 'Pocillo') gramos = 6;
        else if (this.tamano === 'Mediano') gramos = 15;
        else if (this.tamano === 'Taza grande') gramos = 25;

        let precioPorGramo = 0;
        if (this.variedad === 'Brasil') precioPorGramo = 140;
        else if (this.variedad === 'Colombia') precioPorGramo = 180;
        else if (this.variedad === 'Etiopia') precioPorGramo = 240;

    return this.precioBase + (gramos * precioPorGramo);
    }
}