import { existsSync, readFileSync, writeFileSync } from 'fs';
import { PedidoRecord } from '../models/tipos';

// Contrato de acceso a pedidos. Los services dependen de esta interfaz,
// no de la implementación JSON.
export interface PedidoRepository {
  findAll(): PedidoRecord[];
  findById(id: string): PedidoRecord | undefined;
  create(pedido: PedidoRecord): PedidoRecord;
}

// Implementación sobre un archivo JSON (src/data/pedidos.json).
export class JsonPedidoRepository implements PedidoRepository {
  constructor(private readonly filePath: string) {}

  private read(): PedidoRecord[] {
    if (!existsSync(this.filePath)) return [];
    const raw = readFileSync(this.filePath, 'utf8').trim();
    return raw ? (JSON.parse(raw) as PedidoRecord[]) : [];
  }

  private write(pedidos: PedidoRecord[]): void {
    writeFileSync(this.filePath, JSON.stringify(pedidos, null, 2));
  }

  findAll(): PedidoRecord[] {
    return this.read();
  }

  findById(id: string): PedidoRecord | undefined {
    return this.read().find((pedido) => pedido.id === id);
  }

  create(pedido: PedidoRecord): PedidoRecord {
    const pedidos = this.read();
    pedidos.push(pedido);
    this.write(pedidos);
    return pedido;
  }
}
