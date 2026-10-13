import { Producto } from "./Producto";
export class Pasteleria implements Producto{
    id:string;
    nombre: string;
    precioBase: number;
    tipo:string;
    constructor(id:string, nombre:string,precioBase:number,tipo:string) {
        this.id = id
        this.nombre = nombre
        this.precioBase = precioBase
        this.tipo = tipo
    }

    getNombre() {
        return this.nombre
    }
    getTipo() {
        return this.tipo
    }
    calcularPrecio(): number {
        return 2500
    }
    getString() {
        return `Nombre: ${this.nombre}, Precio: ${this.precioBase}, Tipo: ${this.tipo}`
    }


}