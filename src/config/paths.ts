import { resolve } from 'path';

// Rutas centralizadas a los archivos JSON que leen los repositorios.
// Se resuelven desde la raíz del proyecto porque el build (tsc) no copia
// los .json a dist/. De este modo funcionan tanto en desarrollo como compilados.
export const DATA_DIR = resolve(process.cwd(), 'src', 'data');
export const PRODUCTOS_FILE = resolve(DATA_DIR, 'productos.json');
export const PEDIDOS_FILE = resolve(DATA_DIR, 'pedidos.json');
