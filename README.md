# Cafetería Origen — Parcial 1 + TP3 (Prog4)

Este repositorio reúne dos entregas:

- **Backend — Parcial 1:** la API de la cafetería, en la raíz del repo (`src/`, `tests/`, `package.json`, `tsconfig.json`).
- **Frontend — TP3:** la interfaz que consume esa API, en la carpeta `frontend/`.

El detalle propio del front está en [`frontend/README.md`](frontend/README.md).

## Tecnologías

### Backend (Parcial 1)

- Node.js 24 LTS
- TypeScript
- Express
- Vitest + Supertest
- JSON para guardar productos y pedidos
- TDD para el desarrollo de los tests
- pnpm

### Frontend (TP3)

- Vite
- TypeScript
- Zod
- Vitest + Testing Library + MSW
- Playwright para E2E
- Bootstrap 5 + SASS
- ESLint
- pnpm

## Comandos

### Backend (raíz)

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

### Frontend (dentro de `frontend/`)

```bash
pnpm install            # instalar dependencias
pnpm dev                # servidor de desarrollo (Vite)
pnpm build              # compilar el front
pnpm lint               # ejecutar ESLint

pnpm test               # tests unitarios y de integración
pnpm test:e2e           # tests E2E con Playwright
```

## Estructura de carpetas

### Raíz del repositorio (backend — Parcial 1)

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
│   │   ├── pedidos.service.ts             Est 4 
│   │   ├── pedidosConsulta.service.ts     Est 3  
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
├── frontend/                              TP3 (detalle abajo)
├── vitest.config.ts                       base
├── tsconfig.json                          base
├── package.json                           base
└── .gitignore
```

### Frontend — TP3 (`frontend/`)

```text
frontend/
├── src/
│   ├── api/                 contratos y validación con Zod
│   ├── components/          menú, selector de café, pastelería, carrito,
│   │                        confirmación y seguimiento
│   ├── context/             estado global del carrito
│   ├── services/            llamadas HTTP a la API
│   ├── utils/               lógica de café, carrito, pedido y mesa
│   ├── mocks/               handlers y server de MSW
│   ├── styles/              SASS + Bootstrap
│   ├── App.tsx
│   └── main.tsx
├── tests/                   tests de integración con MSW
├── e2e/                     tests E2E con Playwright
├── public/
├── vite.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Aportes al proyecto
# Integrante: Federica Vignales Rocca

Me encargué de la adaptación de la API para cumplir con los requerimientos del trabajo práctico 3, incluyendo los ajustes necesarios en los endpoints, el manejo de respuestas y errores, y la incorporación de los endpoints de prueba para facilitar la ejecución de las pruebas de integración.

## Integrante: Santiago De Dios

Me encargue de la parte de frontend y testing del TP3:

- **Validacion con Zod:** esquemas estrictos (una fuente de verdad con `z.infer`)
  para productos, pedidos y reportes, con validacion de toda respuesta de la API
  y del formato de error, desarrollado con ciclos TDD (`ROJO` / `VERDE`).
- **Tests de integracion con MSW 2:** junto a los tests del grupo, complete casos
  de respuesta invalida y de mantenimiento del carrito ante errores.
- **Estilos con SASS y Bootstrap:** base con paleta de cafeteria en variables,
  Bootstrap configurado antes del import, layout de la pantalla principal con
  cards, grilla responsive y barra inferior de confirmacion con subtotal.
- **Adaptacion mobile:** una columna a 375 px, targets tactiles de 44 px y sin
  scroll horizontal (verificado en el E2E).
- **Accesibilidad:** idioma y titulo del documento, roles `status`/`alert`,
  selector de cafe en tres pasos con radios accesibles, descripcion y precio
  por origen, y nombres accesibles en todos los controles.
- **E2E con Playwright:** recorrido feliz contra API real con `reset`/`seed`,
  override de `PEDIDOS_FILE` para no tocar los datos reales y proyecto mobile
  con chequeo de 375 px.

## Integrante: Santiago De dios PARCIAL — Productos y pastelería

Me encargué del modelo de productos y pastelería, de la fábrica que crea la clase correcta según el tipo, y de la capa de servicios, controladores y rutas de `/productos`.

- **Modelo de Pastelería (`Pasteleria.ts`):** Clase del producto de pastelería (muffin, selva negra) con precio fijo igual a `precioBase`.
- **Fábrica (`fabrica.ts`):** Crea la clase correcta según el `tipo` del JSON (`expreso`, `filtrado` o `pasteleria`). Es la base que usan los demás modelos.
- **Servicio de Productos (`productos.service.ts`):** Lista todos los productos y busca uno por id.
- **Controlador (`productos.controller.ts`):** Atiende las peticiones HTTP de productos y arma la respuesta.
- **Rutas (`productos.routes.ts`):** Define los endpoints de `/productos`.
- **Endpoints:** `GET /productos` devuelve 200 con la lista de los 20 productos; `GET /productos/:id` devuelve 200 con el producto o 404 si no existe.
- **Testing y Calidad (Unit & Integration):**
  - *Unitarios:* el muffin cuesta 2500 y la selva negra 4200, y la fábrica crea la clase correcta según `tipo`.
  - *Integración:* `GET /productos` devuelve 200 con 20 productos, uno existente devuelve 200 y uno inexistente devuelve 404.
- **Dependencias:** se apoya en `Producto.ts`, `tipos.ts` y `ProductoRepository.ts`; depende de la base previa y de los modelos de Est 2 y Est 3, y habilita a Est 4 para precios y reportes.

## Endpoints de la API (backend — Parcial 1)

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
| GET | `/reportes/facturacion` | Devuelve `{ facturacionTotal }` con la suma de todos los pedidos. |
| GET | `/reportes/mas-vendido` | Devuelve `{ productoId, nombre, cantidad }` o `null` si no hay ventas. |

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

## Como levantar la API y el front

El front necesita la API corriendo: Vite hace proxy de `/productos`, `/pedidos` y
`/reportes` a `http://localhost:3000`.

Terminal 1 (raiz del repo, API):

```bash
pnpm install
pnpm dev
```

API en `http://localhost:3000` (health check: `GET /health`).

Terminal 2 (front):

```bash
cd frontend
pnpm install
pnpm dev
```

Front en `http://localhost:5173`.

Para entrar como mesa: `http://localhost:5173/?mesa=4`.
Sin `?mesa`, o con un valor invalido (texto, cero, negativo), el pedido es para
retirar en barra.

## Como correr cada nivel de tests

Backend (raiz):

```bash
pnpm test               # todos los tests
pnpm test:unit          # solo unitarios (tests/unit)
pnpm test:integration   # solo integracion (tests/integration)
```

Frontend (`cd frontend`):

```bash
pnpm test               # unitarios de componentes/utilidades + integracion con MSW
```

E2E con Playwright (`cd frontend`):

```bash
pnpm exec playwright install chromium   # una sola vez
pnpm test:e2e
```

Notas del E2E:

- `playwright.config.ts` levanta la API con `NODE_ENV=test` y
  `PEDIDOS_FILE=.e2e-pedidos.json`, y el front con Vite en 5173.
- Antes de cada test se llaman `POST /__test__/reset` y `POST /__test__/seed`
  para dejar los pedidos en un estado conocido.
- Conviene cerrar el `pnpm dev` de la API antes de correr E2E, para que
  Playwright use su propia instancia y no se escriba en `src/data/pedidos.json`.
- El proyecto `mobile` corre con viewport 375x812 y verifica que
  `document.documentElement.scrollWidth <= 375` (sin scroll horizontal).

## Contrato de la API que usa el front

Ejemplo de producto (`GET /productos`):

```json
{
  "id": "exp-poc-col",
  "tipo": "expreso",
  "nombre": "Cafe expreso Pocillo Colombia",
  "precioBase": 2500,
  "precio": 5840,
  "variedad": "Colombia",
  "tamano": "Pocillo"
}
```

Ejemplo de pedido (`POST /pedidos`, respuesta 201):

```json
{
  "id": "3f1c...",
  "mesaId": 4,
  "items": [{ "productoId": "exp-poc-col", "cantidad": 1 }],
  "estado": "pendiente",
  "total": 5840
}
```

Cuerpo que envia el front en `POST /pedidos`:

```json
{
  "mesaId": 4,
  "items": [{ "productoId": "exp-poc-col", "cantidad": 1 }]
}
```

`mesaId` es opcional: si falta, el pedido es para retirar en barra.

### Validacion de respuestas con Zod

Los esquemas viven en `frontend/src/api/contratos.ts` y `frontend/src/api/validar.ts`.
Cada tipo se deriva del esquema con `z.infer` (una sola fuente de verdad) y toda
respuesta se valida antes de usarse. Si no cumple el contrato, el front lanza:

```
La respuesta de la API no cumple el contrato
```

## Trabajo del TP3

- **Contratos Zod**: esquemas estrictos para productos, pedidos y reportes;
  `validarContrato` unifica el error de contrato; el error de la API se valida
  con `ErrorApiSchema`; `mas-vendido` acepta `null`.
- **Tests de integracion con MSW 2**: carga del menu, pedido completo verificando
  el cuerpo del `POST`, 4xx que conserva el carrito, 500 con reintento, API caida
  y respuesta que no cumple el contrato.
- **Estilos con SASS y Bootstrap**: paleta de cafeteria en `_variables.scss`,
  Bootstrap configurado antes del import, layout con `container`, cards y
  `list-group`.
- **Mobile 375 px**: una columna por debajo de 768 px, barra inferior con subtotal
  y boton de confirmar, sin scroll horizontal.
- **Accesibilidad**: `lang="es"`, titulo de pagina, `role="status"` para carga,
  `role="alert"` para errores, selector de cafe en tres pasos con radios
  accesibles y boton con nombre accesible.
- **E2E con Playwright**: recorrido feliz (mesa, cafe, pasteleria, confirmacion) y
  chequeo de 375 px.
- **TDD**: commits `ROJO` (test que falla) y `VERDE` (implementacion) por rama.

## Integrante: Renata Turani 

Me encargué de la lógica de negocio y modelado del **Café Filtrado**, así como del flujo completo (rutas, controladores y servicios) para la **Consulta de Pedidos** en la API.

- **Modelo de Café Filtrado (`CafeFiltrado.ts`):** Implementación del cálculo dinámico del precio final utilizando la fórmula `3200 + gramos(tamaño) × precioPorGramo(variedad)`. Se configuraron las equivalencias exactas de gramos por tamaño (Pocillo: 6g, Mediano: 15g, Taza grande: 25g) y precio por gramo según el origen (Brasil: $140, Colombia: $180, Etiopía: $240).
- **Consulta de Pedidos:** Desarrollo de la capa de servicios (`pedidosConsulta.service.ts`) y controladores (`pedidosConsulta.controller.ts`) para listar todos los pedidos guardados y buscar pedidos específicos por su ID, manejando correctamente los estados de respuesta.
- **Nuevos Endpoints:** Creación de `pedidosConsulta.routes.ts` y su respectivo montaje en `app.ts` para habilitar las rutas `GET /pedidos` (lista completa de todas las mesas) y `GET /pedidos/:id` (devolviendo 200 si existe o 404 si no se encuentra).
- **Testing y Calidad (Unit & Integration):** 
  - *Unitarios:* Desarrollo de pruebas para validar los 9 precios finales posibles de la tabla de filtrados, y verificación de los métodos de listar y buscar pedidos utilizando datos de prueba.
  - *Integración:* Pruebas para garantizar que `GET /productos` retorne el precio calculado correcto para los cafés filtrados, y validación de los códigos de estado (200 y 404) en los endpoints de pedidos.

## Integrante: Tomás Mertian

Me encargué de la implementación inicial del módulo de pedidos en la API: modelo, servicio, controlador, ruta `POST /pedidos` y sus pruebas unitarias y de integración.

- **Modelo de Pedido (`Pedido.ts`):** Definición de la interfaz `Pedido`, con `id`, `mesa`, `items`, `estado` y `total`.
- **Servicio de Pedidos (`pedidos.service.ts`):** Implementación de `PedidosService`, con el cálculo del total a partir de los precios de los productos y la creación del pedido en estado `pendiente`.
- **Controlador (`pedidos.controller.ts`):** Validación del cuerpo con Zod y respuesta `201` con el pedido creado; los datos inválidos y los productos inexistentes devuelven `400` con `{ error }`.
- **Ruta (`pedidos.routes.ts`):** Registro de `POST /pedidos` y conexión del controlador con los repositorios de pedidos y productos.
- **Testing y Calidad:** Pruebas unitarias del servicio y de integración de `POST /pedidos`, incluyendo el cálculo del total y los casos de error.
- **TP3 — parte frontend:** la confirmación, el envío a la API, la información del pedido, el seguimiento y el manejo de errores están documentados en `frontend/README.md`.
