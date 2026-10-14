import { Router } from 'express';
import { PedidosConsultaService } from '../services/pedidosConsulta.service.js';
import { PedidosConsultaController } from '../controllers/pedidosConsulta.controller.js';
import type { PedidoRepository } from '../repositories/PedidoRepository.js';

export function makePedidosConsultaRouter(pedidosRepo: PedidoRepository) {
    const router = Router();
    const servicio = new PedidosConsultaService(pedidosRepo);
    const controlador = new PedidosConsultaController(servicio);

    router.get('/', controlador.listar);
    router.get('/:id', controlador.obtener);

    return router;
}