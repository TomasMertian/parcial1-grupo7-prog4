# Cafetería Origen — Parcial 1 (Prog4)

## Tecnologías

- Node.js 24 LTS
- TypeScript
- Express
- Vitest + Supertest
- JSON para guardar productos y pedidos
- TDD para el desarrollo de los tests
- pnpm

## Comandos

```bash
pnpm install            # instalar dependencias
pnpm dev                # servidor en desarrollo (tsx watch)
pnpm build              # compilar TypeScript -> dist/
pnpm start              # correr el build (node dist/src/server.js)

pnpm test               # correr todos los tests
pnpm test:watch         # tests en modo watch
pnpm test:unit          # solo tests unitarios (tests/unit)
pnpm test:integration   # solo tests de integración (tests/integration)
```

## Estructura de carpetas

```text
parcial1-grupo7-prog4/
├── src/
│   ├── app.ts                             base
│   ├── server.ts                          base
│   ├── config/
│   │   └── paths.ts                       base
│   ├── models/
│   │   ├── tipos.ts                       base
│   │   ├── Producto.ts                    base
│   │   ├── Pasteleria.ts                  Est 1
│   │   ├── fabrica.ts                     Est 1
│   │   ├── CafeExpreso.ts                 Est 2
│   │   ├── CafeFiltrado.ts                Est 3
│   │   └── Pedido.ts                      Est 4
│   ├── repositories/
│   │   ├── ProductoRepository.ts          base
│   │   └── PedidoRepository.ts            base
│   ├── services/
│   │   ├── productos.service.ts           Est 1
│   │   ├── pedidos.service.ts             Est 4   ← (calcularTotal + crear)
│   │   ├── pedidosConsulta.service.ts     Est 3   ← (listar + obtener)
│   │   └── reportes.service.ts            Est 2   
│   ├── controllers/
│   │   ├── productos.controller.ts        Est 1
│   │   ├── pedidos.controller.ts          Est 4   (POST)          
│   │   ├── pedidosConsulta.controller.ts  Est 3   (GET)       
│   │   └── reportes.controller.ts         Est 5
│   ├── routes/
│   │   ├── productos.routes.ts            Est 1
│   │   ├── pedidos.routes.ts              Est 4   (POST)
│   │   ├── pedidosConsulta.routes.ts      Est 3   (GET)   
│   │   └── reportes.routes.ts             Est 5
│   └── data/
│       ├── productos.json                 base
│       └── pedidos.json                   base
├── tests/
│   ├── unit/
│   └── integration/
├── vitest.config.ts                       base
├── tsconfig.json                          base
├── package.json                           base
└── .gitignore
```