import { Router } from 'express';
import type { ProductoRepository } from '../repositories/ProductoRepository';

// Router de productos. Ya está montado en app.ts y se deja sin endpoints de
// forma intencional: cada integrante agrega acá las rutas que le corresponden,
// sin necesidad de modificar app.ts.
export function makeProductosRouter(_repo: ProductoRepository): Router {
  const router = Router();

  // TODO(Est 1): GET /     -> lista de todos los productos (200)
  router.get('/', (_req,res) => {
    // se usa funcion del repositorio de productos que busca todos los objetos 
    res.status(200).json(_repo.findAll())
  }); 
  
  // TODO(Est 1): GET /:id  -> producto por id (200, o 404 si no existe)
  router.get('/:id', (req,res)=> {
    // se declaran los parametros que pasa el usuario (ID)
    const id = req.params.id
    // se genera una variable que devuelve el producto o undefind
    const producto = _repo.findById(id)

    if (producto){
      //si se encontro se devuelve el producto
      res.status(200).json(producto)
    } else{
      res.status(404).json("producto no encontrado")
    }
  });
  return router;
}
