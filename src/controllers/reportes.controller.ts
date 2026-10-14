import type { Request, Response } from 'express';
import { ReportesService } from '../services/reportes.service';

export class ReportesController {
  constructor(private readonly service: ReportesService) {}

  // GET /reportes/facturacion
  obtenerFacturacion = (_req: Request, res: Response): void => {
    const facturacionTotal = this.service.obtenerFacturacionTotal();

    res.json({ facturacionTotal });
  };

  // GET /reportes/mas-vendido
  obtenerMasVendido = (_req: Request, res: Response): void => {
    const producto = this.service.obtenerMasVendido();

    res.json(producto);
  };
}
