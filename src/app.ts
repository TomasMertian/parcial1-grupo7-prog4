import express, { type NextFunction, type Request, type Response } from 'express';

// PLOMERÍA (Fase 1). Construye la app, NO escucha.
// Los routers de dominio se agregan en la Fase 2 (tras definir contratos y persistencia).
export function makeApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));

  // TODO (Fase 2): montar los routers cuando existan.
  // app.use('/productos', makeProductosRouter(...));
  // app.use('/pedidos', makePedidosRouter(...));
  // app.use('/reportes', makeReportesRouter(...));

  app.use((_req: Request, res: Response) => res.status(404).json({ error: 'NotFound' }));
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'InternalError' });
  });
  return app;
}
