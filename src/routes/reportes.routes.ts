import { Router } from 'express';
import type { PedidoRepository } from '../repositories/PedidoRepository';
import type { ProductoRepository } from '../repositories/ProductoRepository';

// Router de reportes. Ya está montado en app.ts y se deja sin endpoints de forma
// intencional; lo completa Est 5.
// Recibe pedidos y productos: los reportes necesitan el nombre del producto
// (mas-vendido) y recalcular precios (facturacion), porque el total no se persiste.
export function makeReportesRouter(
  _pedidos: PedidoRepository,
  _productos: ProductoRepository,
): Router {
  const router = Router();

  // TODO(Est 5): GET /facturacion  -> { facturacionTotal }
  // TODO(Est 5): GET /mas-vendido  -> { productoId, nombre, cantidad } o null si no hay ventas

  return router;
}
