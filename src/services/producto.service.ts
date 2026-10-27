import { Fabrica } from "../models/fabrica";
import { JsonProductoRepository } from "../repositories/ProductoRepository";
import { Producto } from "../models/Producto";

export class productoService {
    private repository: JsonProductoRepository;

    constructor(){
        //inicializamos el repo indicando la ruta del archivo json que actua como bdd
        this.repository = new JsonProductoRepository('./src/data/productos.json')
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

    public obtenerPorId(id:string): Producto | undefined{
        //busca el registro crudo por id
        const data = this.repository.findById(id)
        //si no existe retorna undefined
        if (!data) {
            return undefined
        }
        // si salta el filtro lo pasa por fabrica para crear la instancia de clase real
        const producto = Fabrica.crear(data)
        return producto
    }
}