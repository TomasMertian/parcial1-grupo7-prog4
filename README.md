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

## Aportes al proyecto
# Integrante: Federica Vignales Rocca

Me encargué de la adaptación de la API para cumplir con los requerimientos del trabajo práctico 3, incluyendo los ajustes necesarios en los endpoints, el manejo de respuestas y errores, y la incorporación de los endpoints de prueba para facilitar la ejecución de las pruebas de integración.

## Endpoints de la API

### Productos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/productos` | Lista los productos con su `precio` calculado y su `tipo`. |
| GET | `/productos/:id` | Obtiene un producto por ID, incluyendo `precio` y `tipo`. |

Si el producto no existe, la API responde con estado `404` y un JSON con el campo `error`.

### Pedidos

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/pedidos` | Crea un pedido a partir de los productos y cantidades recibidos. Acepta `mesaId` opcional. |
| GET | `/pedidos` | Consulta los pedidos registrados. |
| GET | `/pedidos/:id` | Obtiene un pedido por ID, incluyendo `id`, `mesaId` si corresponde, `estado`, `items` y `total`. |

#### Crear un pedido

Ejemplo del cuerpo de la solicitud:

    {
      "mesaId": 1,
      "items": [
        {
          "productoId": "exp-poc-bra",
          "cantidad": 2
        }
      ]
    }

El campo `mesaId` es opcional. Si se omite, el pedido se crea sin mesa asignada.

El `total` no se envía en la solicitud: lo calcula la API según los precios de los productos y sus cantidades. El pedido se crea con estado inicial `pendiente`.

#### Consultar un pedido

La respuesta de `GET /pedidos/:id` incluye el estado, los productos y sus cantidades, y el total calculado y guardado al crear el pedido.

### Reportes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/reportes` | Consulta los reportes disponibles. |

### Endpoints de prueba

Estos endpoints están habilitados únicamente cuando la variable de entorno `NODE_ENV` tiene el valor `test`.

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/__test__/reset` | Elimina los pedidos existentes en el repositorio de prueba. |
| POST | `/__test__/seed` | Carga los pedidos de prueba definidos para iniciar con datos conocidos. |

Se utilizan para que las pruebas de integración y E2E comiencen con un estado conocido y consistente.

### Formato de errores

Los errores de la API se responden en formato JSON, con el campo `error`.

Ejemplo:

    {
      "error": "Producto no encontrado"
    }

