import type { Request, Response } from 'express';
import { z } from 'zod';
import { PedidosService, ProductoNoExisteError } from '../services/pedidos.service';

const pedidoSchema = z.object({
  mesa: z.number().int(),
  items: z
    .array(
      z.object({
        productoId: z.string().min(1),
        cantidad: z.number().int().positive(),
      }),
    )
    .min(1),
});

export class PedidosController {
  constructor(private readonly service: PedidosService) {}

  crear = (req: Request, res: Response): void => {
    const parseo = pedidoSchema.safeParse(req.body);

    if (!parseo.success) {
      res.status(400).json({ error: 'DatosInvalidos' });
      return;
    }

    try {
      const pedido = this.service.crear(parseo.data);
      res.status(201).json(pedido);
    } catch (error) {
      if (error instanceof ProductoNoExisteError) {
        res.status(400).json({ error: error.message });
        return;
      }
      throw error;
    }
  };
}
