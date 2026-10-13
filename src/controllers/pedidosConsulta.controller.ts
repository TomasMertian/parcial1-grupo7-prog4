import type { Request, Response } from 'express';
import type { PedidosConsultaService } from '../services/pedidosConsulta.service.js';

export class PedidosConsultaController {
    constructor(private readonly pedidosConsultaService: PedidosConsultaService) {}

    listar = (req: Request, res: Response): void => {
        const pedidos = this.pedidosConsultaService.listar();
        res.status(200).json(pedidos);
    };

    obtener = (req: Request, res: Response): void => {
        const id = req.params.id as string;
        const pedido = this.pedidosConsultaService.obtener(id);

        if (!pedido) {
            res.status(404).json({ error: 'Pedido no encontrado' });
            return;
    }

        res.status(200).json(pedido);
    };
}