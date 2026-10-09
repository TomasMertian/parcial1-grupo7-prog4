import { Router } from 'express';
import type { ProductoRepository } from '../repositories/ProductoRepository';

// Router de productos. Ya está montado en app.ts y se deja sin endpoints de
// forma intencional: cada integrante agrega acá las rutas que le corresponden,
// sin necesidad de modificar app.ts.
export function makeProductosRouter(_repo: ProductoRepository): Router {
  const router = Router();

  // TODO(Est 1): GET /     -> lista de todos los productos (200)
  // TODO(Est 1): GET /:id  -> producto por id (200, o 404 si no existe)

  return router;
}
