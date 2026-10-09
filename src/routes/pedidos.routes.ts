import { Router } from 'express';
import type { ProductoRepository } from '../repositories/ProductoRepository';
import type { PedidoRepository } from '../repositories/PedidoRepository';

// Router de pedidos. Ya está montado en app.ts; Est 4 agrega acá el POST /.
// Las consultas (GET / y GET /:id) viven en pedidosConsulta.routes.ts (Est 3),
// que se monta en app.ts sobre la misma ruta '/pedidos'.
export function makePedidosRouter(
  _pedidos: PedidoRepository,
  _productos: ProductoRepository,
): Router {
  const router = Router();

  // TODO(Est 4): POST /    -> crea el pedido y devuelve 201 con el total calculado
  // (GET / y GET /:id: ver pedidosConsulta.routes.ts — Est 3)

  return router;
}
