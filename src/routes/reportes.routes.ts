import { Router } from 'express';
import type { PedidoRepository } from '../repositories/PedidoRepository';
import type { ProductoRepository } from '../repositories/ProductoRepository';
import { ReportesService } from '../services/reportes.service';
import { ReportesController } from '../controllers/reportes.controller';

// Router de reportes. Ya está montado en app.ts y se deja sin endpoints lo completa Est 5.
// Recibe pedidos y productos: los reportes necesitan el nombre del producto
// (mas-vendido) y recalcular precios (facturacion), porque el total no se persiste.
export function makeReportesRouter(
  _pedidos: PedidoRepository,
  _productos: ProductoRepository,
): Router {
  const router = Router();

  const service = new ReportesService(_pedidos, _productos);
  const controller = new ReportesController(service);

  router.get('/facturacion', controller.obtenerFacturacion);
  router.get('/mas-vendido', controller.obtenerMasVendido);

  return router;
}