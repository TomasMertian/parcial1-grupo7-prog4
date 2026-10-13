import { Router } from 'express';
import type { ProductoRepository } from '../repositories/ProductoRepository';
import { productoController } from '../controllers/productos.controller';
// Router de productos. Ya está montado en app.ts y se deja sin endpoints de
// forma intencional: cada integrante agrega acá las rutas que le corresponden,
// sin necesidad de modificar app.ts.
export function makeProductosRouter(_repo: ProductoRepository): Router {
  const router = Router();


  const controller = new productoController()
  // TODO(Est 1): GET /     -> lista de todos los productos (200)
  router.get('/', (controller.obtenerTodos))
  
  // TODO(Est 1): GET /:id  -> producto por id (200, o 404 si no existe)
  router.get('/:id', (controller.obtenerPorID))
  return router;
}
