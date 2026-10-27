# Frontend

## Tecnologías

- React para construir la interfaz.
- Vite para el entorno de desarrollo y compilación.
- TypeScript para tipar el código.
- Zod para validar los datos recibidos de la API.
- Vitest para ejecutar las pruebas automatizadas de los servicios.
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
- `src/styles/`: carpeta destinada a los estilos de la aplicación.
- `tests/services.test.js`: pruebas automatizadas de los servicios.

## Servicios de la API

Los servicios están separados por recurso: productos, pedidos y reportes. Las solicitudes utilizan rutas relativas, como `/productos` y `/pedidos`.

Vite tiene configurado un proxy para redirigir las solicitudes al backend durante el desarrollo.

Los servicios utilizan una función HTTP compartida que maneja los errores de conexión y las respuestas HTTP fallidas. Además, se utiliza Zod para validar la estructura de los datos recibidos antes de utilizarlos.

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

Ejecutar las pruebas automatizadas de los servicios:

```bash
pnpm --dir frontend exec vitest run
```

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
