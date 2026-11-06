import type { EstadoPedido, ItemPedido } from './tipos';

export interface Pedido {
  id: string;
  mesaId?: number;
  items: ItemPedido[];
  estado: EstadoPedido;
  total: number;
}
