import { Router } from 'express';
import type { ProductoRepository } from '../repositories/ProductoRepository';
import type { PedidoRepository } from '../repositories/PedidoRepository';

// Router de pedidos. Al igual que los demás, ya está montado en app.ts y se
// deja sin endpoints de forma intencional para completarlo entre Est 4 y Est 5.
// Al ser un archivo compartido por ambos, conviene coordinarse antes de editarlo.
export function makePedidosRouter(
  _pedidos: PedidoRepository,
  _productos: ProductoRepository,
): Router {
  const router = Router();

  // TODO(Est 4): POST /    -> crea el pedido y devuelve 201 con el total calculado
  // TODO(Est 5): GET /     -> lista los pedidos de todas las mesas
  // TODO(Est 5): GET /:id  -> pedido por id (200, o 404 si no existe)

  return router;
}
