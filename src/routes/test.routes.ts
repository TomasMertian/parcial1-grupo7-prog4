import { Router } from 'express';
import type { PedidoRepository } from '../repositories/PedidoRepository';

export function makeTestRouter(pedidos: PedidoRepository) {
    const router = Router();

    router.post('/reset', (_req, res) => {
        pedidos.clear();
        res.status(200).json({ ok: true });
    });
    return router;
}