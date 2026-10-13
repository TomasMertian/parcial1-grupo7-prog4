import type { PedidoRecord } from './tipos';

export interface Pedido extends PedidoRecord {
  total: number;
}
