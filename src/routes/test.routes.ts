import { Router } from 'express';
import type { PedidoRepository } from '../repositories/PedidoRepository';

export function makeTestRouter(pedidos: PedidoRepository) {
    const router = Router();

    router.post('/reset', (_req, res) => {
        pedidos.clear();
        res.status(200).json({ ok: true });
    });

    router.post('/seed', (_req, res) => {
    pedidos.clear();

    pedidos.create({
        id: 'pedido-seed-1',
        mesaId: 4,
        items: [{ productoId: 'exp-poc-bra', cantidad: 2 }],
        estado: 'pendiente',
        total: 10040,
    });

    res.status(200).json({ ok: true });
});
    return router;
}