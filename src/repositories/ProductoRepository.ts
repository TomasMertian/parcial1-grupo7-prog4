import { existsSync, readFileSync } from 'fs';
import { ProductoRecord } from '../models/tipos';

// Contrato de acceso a productos. Los services dependen de esta interfaz,
// no de la implementación JSON.
export interface ProductoRepository {
  findAll(): ProductoRecord[];
  findById(id: string): ProductoRecord | undefined;
}

// Implementación sobre un archivo JSON (src/data/productos.json).
export class JsonProductoRepository implements ProductoRepository {
  constructor(private readonly filePath: string) {}

  private read(): ProductoRecord[] {
    if (!existsSync(this.filePath)) return [];
    const raw = readFileSync(this.filePath, 'utf8').trim();
    return raw ? (JSON.parse(raw) as ProductoRecord[]) : [];
  }

  findAll(): ProductoRecord[] {
    return this.read();
  }

  findById(id: string): ProductoRecord | undefined {
    return this.read().find((producto) => producto.id === id);
  }
}
