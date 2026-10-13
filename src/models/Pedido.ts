import type { EstadoPedido, ItemPedido } from './tipos';

export interface Pedido {
  id: string;
  mesa: number;
  items: ItemPedido[];
  estado: EstadoPedido;
  total: number;
}
