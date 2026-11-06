# Frontend

## Tecnologías

- React para construir la interfaz.
- Vite para el entorno de desarrollo y compilación.
- TypeScript para tipar el código.
- Zod para validar los datos recibidos de la API.
- Vitest para ejecutar las pruebas automatizadas de los servicios.
- Testing Library y MSW para tests de componentes e integración.
- Playwright para las pruebas E2E.
- Bootstrap 5 y SASS para los estilos.
- ESLint para analizar el código.

## Estructura del proyecto

- `src/`: código fuente del frontend.
- `src/services/`: servicios encargados de realizar las solicitudes HTTP a la API.
- `src/services/http.ts`: función compartida para realizar solicitudes y manejar errores.
- `src/services/productos.ts`: consulta el listado de productos y obtiene un producto por ID.
- `src/services/pedidos.ts`: crea pedidos, consulta el listado y obtiene un pedido por ID.
- `src/services/reportes.ts`: obtiene información de facturación y del producto más vendido.
- `src/App.tsx`: componente principal de la aplicación.
- `src/main.tsx`: punto de entrada de React.
- `src/api/`: esquemas Zod (`contratos.ts`) y `validarContrato`.
- `src/components/`: menú, selector de café, pastelería, carrito, confirmación y seguimiento.
- `src/context/CarritoContext.tsx`: estado global del carrito.
- `src/utils/`: lógica de dominio (café, carrito, pedido, mesa).
- `src/mocks/`: handlers y server de MSW.
- `src/styles/`: carpeta destinada a los estilos de la aplicación (SASS y Bootstrap).
- `tests/`: pruebas de integración con MSW (incluye `services.test.js`).
- `e2e/`: recorrido feliz con Playwright.

## Servicios de la API

Los servicios están separados por recurso: productos, pedidos y reportes. Las solicitudes utilizan rutas relativas, como `/productos` y `/pedidos`.

Vite tiene configurado un proxy para redirigir las solicitudes al backend durante el desarrollo.

Los servicios utilizan una función HTTP compartida que maneja los errores de conexión y las respuestas HTTP fallidas. Además, se utiliza Zod para validar la estructura de los datos recibidos antes de utilizarlos.

## Funcionalidad

- Selector de café en tres pasos: bebida (expreso/filtrado), tamaño
  (pocillo/mediano/taza grande) y origen (Brasil/Colombia/Etiopía).
- Cada origen muestra su descripción y el precio real que devuelve la API.
- Cantidad y botón “Agregar al pedido”, deshabilitado hasta completar los
  tres pasos.
- Pastelería, carrito con subtotal, confirmación y seguimiento del pedido.
- Mesa por `?mesa=4`; sin mesa válida, el pedido es para retirar en barra.
- Reintento del menú ante error de la API.

## Instalación y ejecución

Desde la raíz del proyecto, instalar las dependencias del frontend:

```bash
pnpm --dir frontend install
```

Iniciar el servidor de desarrollo:

```bash
pnpm --dir frontend dev
```

## Validaciones

Compilar el frontend:

```bash
pnpm --dir frontend build
```

Ejecutar ESLint:

```bash
pnpm --dir frontend lint
```

Verificar los tipos:

```bash
pnpm --dir frontend exec tsc --noEmit
```

Ejecutar las pruebas automatizadas:

```bash
pnpm --dir frontend test
```

Ejecutar el E2E:

```bash
pnpm --dir frontend test:e2e
```

## Tests

- **Unitarios y de componentes:** `src/**/*.test.ts(x)`.
- **Integración:** `tests/*.integration.test.tsx` con MSW. Cubren carga del
  menú, flujo completo del café, cuerpo del `POST /pedidos`, error 4xx que
  conserva el carrito, error 500 con reintento, API caída y respuesta que no
  cumple el contrato.
- **E2E:** `e2e/pedidos.spec.ts` con Playwright. Levanta solo la API
  (`NODE_ENV=test`, `PEDIDOS_FILE=.e2e-pedidos.json`) y Vite; antes de cada
  test ejecuta `reset` y `seed`. El proyecto `mobile` verifica 375 px sin
  scroll horizontal.

Conviene cerrar un `pnpm dev` de la API en el puerto 3000 antes del E2E para
que Playwright use su propia instancia.

## División de responsabilidades

### Integrante 1: Federica Vignales Rocca

Mi tarea estuvo enfocada en la adaptación del backend a los requerimientos del trabajo práctico y en la conexión del frontend con la API.

Las tareas desarrolladas fueron:

- Adaptación y verificación de los endpoints de productos y pedidos.
- Implementación de endpoints de prueba para reiniciar y cargar datos de pedidos.
- Desarrollo de los servicios del frontend para consultar productos, crear y consultar pedidos, y obtener reportes.
- Configuración del proxy de Vite para comunicar el frontend con el backend durante el desarrollo.
- Escritura y ejecución de pruebas automatizadas para verificar el funcionamiento de los servicios.
- Documentación de los endpoints de la API y de la estructura del frontend.

Los servicios del frontend se encuentran en `src/services/` y las pruebas automatizadas en `tests/services.test.js`.

### Integrante: Renata Turani 

Mi tarea estuvo enfocada en el desarrollo de la interfaz de usuario para el escaneo de mesas, la visualización dinámica del menú consumido desde la API y la creación del flujo interactivo para la personalización de bebidas.

Las tareas desarrolladas fueron:

- **Lectura dinámica de mesa (`obtenerMesaDeUrl`):** Implementación de la lógica para capturar y validar el número de mesa a partir de los parámetros de la URL (`?mesa=X`), gestionando los estados visuales en la cabecera ("Retiro en barra" vs "Pedido para la Mesa X").
- **Carga y visualización del Menú:** Consumo del endpoint de productos integrando validaciones estrictas con Zod. Se manejó la unión discriminada de estados de la UI (`cargando`, `error` y `exito`) mostrando alertas o la grilla de productos según correspondiera.
- **Selector de Café Interactivo (`SelectorCafe.tsx`):** Desarrollo mediante metodología TDD (Rojo/Verde) de un componente modal en 3 pasos para la personalización de bebidas expreso y filtradas:
  - **Paso 1:** Selección de la variedad de grano (Brasil, Colombia, Etiopía).
  - **Paso 2:** Selección de tamaño de taza (Pocillo, Mediano, Taza grande).
  - **Paso 3:** Selector de cantidad con cálculo dinámico del precio final multiplicando el precio base. 
- **Testing Unitario:** Desarrollo de pruebas unitarias (`SelectorCafe.test.tsx` y `Menu.test.tsx`) garantizando que el flujo de los 3 pasos, los cálculos y los estados de error de la API funcionen correctamente.

### Integrante: Santiago De Dios

Me encargué de la parte de frontend y testing del TP3:

- **Validación con Zod:** esquemas estrictos (una fuente de verdad con
  `z.infer`) para productos, pedidos y reportes, con validación de toda
  respuesta de la API y del formato de error, desarrollado con ciclos TDD
  (`ROJO` / `VERDE`).
- **Tests de integración con MSW 2:** junto a los tests del grupo, completé
  casos de respuesta inválida y de mantenimiento del carrito ante errores.
- **Selector de café en tres pasos:** bebida (expreso/filtrado), tamaño y
  origen, con descripción y precio por origen tomados de la API.
- **Estilos con SASS y Bootstrap:** base con paleta de cafetería en variables,
  Bootstrap configurado antes del import, layout de la pantalla principal con
  cards, grilla responsive y barra inferior de confirmación con subtotal.
- **Adaptación mobile:** una columna a 375 px, targets táctiles de 44 px y sin
  scroll horizontal (verificado en el E2E).
- **Accesibilidad:** idioma y título del documento, roles `status`/`alert`,
  selector con radios accesibles, descripción y precio por origen, y nombres
  accesibles en todos los controles.
- **E2E con Playwright:** recorrido feliz contra API real con `reset`/`seed`,
  override de `PEDIDOS_FILE` para no tocar los datos reales y proyecto mobile
  con chequeo de 375 px.
- **TDD:** commits `ROJO` (test que falla) y `VERDE` (implementación) por rama.

## Integrante: Surop Maitena

- **Mi tarea estuvo enfocada en el desarrollo e integración del módulo de pastelería y carrito de compras, incluyendo la gestión del estado, las cantidades de los productos y el cálculo de subtotales.**

*Las tareas desarrolladas fueron:*

`Pastelería (Pasteleria.tsx):` Desarrollo del componente encargado de filtrar y mostrar los productos correspondientes a la categoría de pastelería, incluyendo su nombre, precio y botón para agregarlos al carrito.

`Carrito de compras (Carrito.tsx):` Implementación de la interfaz para visualizar los productos agregados, sus precios unitarios, cantidades y subtotales individuales. Se incorporaron las acciones para agregar productos, restar unidades, eliminar productos y vaciar el carrito.

`Gestión del estado global (CarritoContext.tsx):`  Implementación del contexto para compartir el estado del carrito entre los distintos componentes de la aplicación, centralizando las operaciones relacionadas con los productos agregados.

`Lógica del carrito (carritoReducer.ts):` Desarrollo del reducer encargado de administrar las acciones del carrito, permitiendo agregar productos, incrementar o disminuir cantidades y eliminar productos. También se implementó la función para calcular el subtotal general según los productos y sus cantidades.

`Integración con la aplicación (App.tsx y main.tsx):` Incorporación de los componentes de pastelería y carrito en la aplicación principal, junto con la configuración del proveedor del contexto (CarritoProvider) para que el estado del carrito esté disponible en los componentes correspondientes.

`Testing unitario y de componentes:` Desarrollo y ejecución de pruebas automatizadas para verificar el funcionamiento de la pastelería, el carrito y su contexto, mediante los archivos `Pasteleria.test.tsx, Carrito.test.tsx y CarritoContext.test.tsx.` También se realizaron pruebas para comprobar el comportamiento de las acciones del reducer en `carritoReducer.test.ts.`