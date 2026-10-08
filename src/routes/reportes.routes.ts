import { Router } from 'express';
import type { PedidoRepository } from '../repositories/PedidoRepository';

// Router de reportes. Ya está montado en app.ts y se deja sin endpoints de forma
// intencional; lo completa Est 5.
export function makeReportesRouter(_pedidos: PedidoRepository): Router {
  const router = Router();

  // TODO(Est 5): GET /facturacion  -> { facturacionTotal }
  // TODO(Est 5): GET /mas-vendido  -> { productoId, nombre, cantidad } o null si no hay ventas

  return router;
}
