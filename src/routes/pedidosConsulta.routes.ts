import { Router } from 'express';
import { JsonPedidoRepository } from '../repositories/PedidoRepository.js';
import { PedidosConsultaService } from '../services/pedidosConsulta.service.js';
import { PedidosConsultaController } from '../controllers/pedidosConsulta.controller.js';

export const pedidosConsultaRouter = Router();

// instancie el repositorio apuntando al archivo de pedidos
const pedidosRepo = new JsonPedidoRepository('./src/data/pedidos.json');

// instancie el servicio de consulta de pedidos con el repositorio
const pedidosConsultaService = new PedidosConsultaService(pedidosRepo);

// le pase el servicio a mi controlador de consulta de pedidos
const controlador = new PedidosConsultaController(pedidosConsultaService);

// defini los dos endpoints
pedidosConsultaRouter.get('/pedidos', controlador.listar);
pedidosConsultaRouter.get('/pedidos/:id', controlador.obtener);