import { Router } from 'express';
import type { ProductoRepository } from '../repositories/ProductoRepository';
import type { PedidoRepository } from '../repositories/PedidoRepository';
import { PedidosService } from '../services/pedidos.service';
import { PedidosController } from '../controllers/pedidos.controller';

export function makePedidosRouter(
  pedidos: PedidoRepository,
  productos: ProductoRepository,
): Router {
  const router = Router();
  const service = new PedidosService(pedidos, productos);
  const controller = new PedidosController(service);

  router.post('/', controller.crear);

  return router;
}
