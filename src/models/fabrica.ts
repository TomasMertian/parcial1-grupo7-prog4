import { Pasteleria } from "./pasteleria";
import { CafeExpreso } from "./CafeExpreso";
import { CafeFiltrado } from "./CafeFiltrado";

export class Fabrica {
    //recibe el producto tal como viene del json
    public static crear(data:any) {
        switch (data.tipo){
            case 'expreso':
                //si el tipo es expreso le pasa los datos que le pida el constructor
                return new CafeExpreso(data.id, data.variedad, data.tamano);
            case 'filtrado':
                return new CafeFiltrado(data.id, data.variedad, data.tamano);
            case 'pasteleria':
                return new Pasteleria(data.id, data.nombre, data.precioBase,data.tipo);
            default:
                throw new Error(`tipo no encontrado ${data.tipo}`)

        }
    }
}