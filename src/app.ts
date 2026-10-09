import express, { type NextFunction, type Request, type Response } from 'express';
import { JsonProductoRepository, type ProductoRepository } from './repositories/ProductoRepository';
import { JsonPedidoRepository, type PedidoRepository } from './repositories/PedidoRepository';
import { PRODUCTOS_FILE, PEDIDOS_FILE } from './config/paths';
import { makeProductosRouter } from './routes/productos.routes';
import { makePedidosRouter } from './routes/pedidos.routes';
import { makeReportesRouter } from './routes/reportes.routes';

// Dependencias de la app (inyección de dependencias).
// En tests se puede pasar un AppDeps con repos apuntando a un JSON de prueba.
export interface AppDeps {
  productos: ProductoRepository;
  pedidos: PedidoRepository;
}

// Composition root por defecto: repos sobre los JSON reales de src/data.
export function crearDeps(): AppDeps {
  return {
    productos: new JsonProductoRepository(PRODUCTOS_FILE),
    pedidos: new JsonPedidoRepository(PEDIDOS_FILE),
  };
}

// Construye la app, NO escucha (eso lo hace server.ts).
// Los routers ya están montados; sus endpoints los implementa cada alumno.
export function makeApp(deps: AppDeps = crearDeps()) {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/productos', makeProductosRouter(deps.productos));
  app.use('/pedidos', makePedidosRouter(deps.pedidos, deps.productos));
  // Est 3: las consultas de pedidos (GET / y GET /:id) se definen aca
  // misma ruta '/pedidos' desde pedidosConsulta.routes.ts (La de arriba es del POST).
  app.use('/reportes', makeReportesRouter(deps.pedidos, deps.productos));

  app.use((_req: Request, res: Response) => res.status(404).json({ error: 'NotFound' }));
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'InternalError' });
  });
  return app;
}
