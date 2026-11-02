import { Fabrica } from "../models/fabrica";
import type { ProductoRepository } from "../repositories/ProductoRepository";
import { Producto } from "../models/Producto";

export class productoService {

    constructor(private readonly repository: ProductoRepository){
        //inicializamos el repo indicando la ruta del archivo json que actua como bdd
    }

    //metodo que obtiene todos los productos y les calcula el precio
    public obtenerTodos() {
    const data = this.repository.findAll();

    return data.map((item) => {
        const producto = Fabrica.crear(item);

        return {
            ...producto,
            precio: producto.calcularPrecio(),
            tipo: item.tipo,
        };
    });
}

    //metodo que obtiene un producto por id y le calcula el precio
    public obtenerPorId(id: string) {
    const data = this.repository.findById(id);

    if (!data) {
        return undefined;
    }

    const producto = Fabrica.crear(data);

    return {
        ...producto,
        precio: producto.calcularPrecio(),
        tipo: data.tipo,
    };
}
}