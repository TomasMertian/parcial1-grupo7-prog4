import type { Request, Response } from 'express';
import { ReportesService } from '../services/reportes.service';

export class ReportesController {
    constructor(private readonly service: ReportesService) {}

    // GET /reportes/facturacion
    obtenerFacturacion = (_req: Request, res: Response): void => {
        try {
            const facturacionTotal = this.service.obtenerFacturacionTotal();

            res.status(200).json({ facturacionTotal });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    // GET /reportes/mas-vendido
    obtenerMasVendido = (_req: Request, res: Response): void => {
        try {
            const producto = this.service.obtenerMasVendido();

            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
}