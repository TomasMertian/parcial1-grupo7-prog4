import { Fabrica } from "../models/fabrica";
import { JsonProductoRepository } from "../repositories/ProductoRepository";
import { Producto } from "../models/Producto";

export class productoService {
    private repository: JsonProductoRepository;

    constructor(){
        //inicializamos el repo indicando la ruta del archivo json que actua como bdd
        this.repository = new JsonProductoRepository('./src/data/productos.json')
    }

    public obtenerTodos(): Producto[] | null{
        //se obtienen los registros crudos 

        const data = this.repository.findAll() 
        //transforma cada registro crudo en una instancia de clase real(pasteleria, expreso etc)
        const dataLista = data.map(item => Fabrica.crear(item))
        return null
    }

    public obtenerPorId(id:string): Producto | undefined | null{
        //busca el registro crudo por id
        const data = this.repository.findById(id)
        //si no existe retorna undefined
        if (!data) {
            return undefined
        }
        // si salta el filtro lo pasa por fabrica para crear la instancia de clase real
        const producto = Fabrica.crear(data)
        return null
    }
}