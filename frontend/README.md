# Frontend

## Tecnologías

- React
- Vite
- JavaScript
- Vitest para las pruebas de los servicios
- ESLint para analizar el código

## Estructura del proyecto

- `src/`: código fuente del frontend.
- `src/services/`: funciones que realizan las solicitudes HTTP a la API.
- `src/App.jsx`: componente principal de la aplicación.
- `src/main.jsx`: punto de entrada de React.
- `src/App.css` y `src/index.css`: estilos de la aplicación.
- `tests/`: pruebas automatizadas de los servicios.

## Servicios de la API

Los servicios están separados por recurso:

- `productos.js`: consulta el listado de productos y obtiene un producto por ID.
- `pedidos.js`: crea pedidos, consulta el listado y obtiene un pedido por ID.
- `reportes.js`: obtiene la facturación total y el producto más vendido.

Las solicitudes utilizan rutas relativas, como `/productos` y `/pedidos`. Vite tiene configurado un proxy para redirigir las solicitudes al backend durante el desarrollo.

Los servicios verifican las respuestas HTTP y generan errores cuando las solicitudes fallan.

## Instalación y ejecución

Desde la raíz del proyecto, instalar las dependencias del frontend:

`pnpm --dir frontend install`

Iniciar el servidor de desarrollo:

`pnpm --dir frontend dev`

## Validaciones

Compilar el frontend:

`pnpm --dir frontend build`

Ejecutar ESLint:

`pnpm --dir frontend lint`

Ejecutar las pruebas de los servicios:

`pnpm --dir frontend exec vitest run`


## División de responsabilidades
### Integrante 1 : Federica Vignales Rocca

Mi tarea estuvo enfocada en la adaptación del backend a los requerimientos del trabajo práctico y en la conexión del frontend con la API.

Las tareas que desarrollé fueron:

- Adaptación y verificación de los endpoints de productos y pedidos.

- Implementación de endpoints de prueba para reiniciar y cargar datos de pedidos.

- Desarrollo de los servicios del frontend para consultar productos, crear y consultar pedidos, y obtener reportes.

- Configuración del proxy de Vite para comunicar el frontend con el backend durante el desarrollo.

- Escritura y ejecución de pruebas automatizadas para verificar el funcionamiento de los servicios.

- Documentación de los endpoints de la API y de la estructura del frontend.

- Los servicios del frontend se encuentran en src/services/ y sus pruebas en tests/services.test.js.