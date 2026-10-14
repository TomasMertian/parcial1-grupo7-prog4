import type { Producto } from './Producto';
import type { Variedad, Tamano } from './tipos';

export class CafeExpreso implements Producto { //obliga a la clase 
                                               //a cumplir el contrato del modelo base.
  id: string;
  nombre: string;
  precioBase: number;
  variedad: Variedad;
  tamano: Tamano;

  constructor( //recibe el identificador, la variedad y el tamaño.
    id: string,
    variedad: Variedad,
    tamano: Tamano
  ) {
    this.id = id;
    this.variedad = variedad;
    this.tamano = tamano;
    this.nombre = `Café expreso ${tamano} ${variedad}`;
    this.precioBase = 2500; //El precio base siempre es $2.500.
}

calcularPrecio(): number { //multiplica los gramos por el precio del gramo y suma el precio base.
    const gramosPorTamano: Record<Tamano, number> = { //guarda el precio de cada tamaño
    Pocillo: 18,
    Mediano: 27,
    'Taza grande': 36,
    };

    const precioPorGramo: Record<Variedad, number> = { //guardan el precio de cada variedad
    Brasil: 140,
    Colombia: 180,
    Etiopia: 240,
    };

    return (
    this.precioBase +
      gramosPorTamano[this.tamano] * precioPorGramo[this.variedad]
    )};
}