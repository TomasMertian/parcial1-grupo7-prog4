import { Request,Response } from "express";
import { productoService } from "../services/producto.service";
export class productoController {
    private service: productoService;

    constructor(){
        //instanciamos el servicio para usarlo
        this.service = new productoService();
    }
    
    //endpoint GET /productos
    public obtenerTodos = (_req:Request, res:Response): void => {

        try{
            //le pedimos al service que haga su parte(service => repo => fabrica => productos)
            const productos = this.service.obtenerTodos();
            //devolvemos un ok con la lista
            res.status(200).json(productos)
        }catch (error){
            res.status(500)
        };
    }

        //endpoint GET /productos/:ID

    public obtenerPorID = (req:Request, res:Response): void =>{
        try{
            //sacamos el id que pasa por parametro el usuario
            const id = req.params.id as string;

            //service busca ese id 
            const producto = this.service.obtenerPorId(id);
            //evaluamos segun el servide
            if (producto) {
                //si existe devolvemos un ok con el producto
                res.status(200).json(producto)
            }else{
                //sino un error 404
                res.status(404).json("producto no encontrado")
            }
        }catch (error){
            res.status(500)
        }
    }
        
}