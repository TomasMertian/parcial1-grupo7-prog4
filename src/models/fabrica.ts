import { Pasteleria } from "./pasteleria";
import { CafeExpreso } from "./CafeExpreso";
import { CafeFiltrado } from "./CafeFiltrado";
import { Producto } from "./Producto";

export class Fabrica {
    //recibe el producto tal como viene del json
    public static crear(data:any):Producto | null{
        switch (data.tipo){
            case 'expreso':
                //si el tipo es expreso le pasa los datos que le pida el constructor
                return  new CafeExpreso(data.id, data.variedad, data.tamano);
            case 'filtrado':
                return  null //new CafeFiltrado(data.id, data.variedad, data.tamano);
            case 'pasteleria':
                return  new Pasteleria(data.id, data.nombre, data.precioBase,data.tipo);
            default:
                throw new Error(`tipo no encontrado ${data.tipo}`)

        }
    }
}