export type Variedad = 'Brasil' | 'Colombia' | 'Etiopia';
export type Tamano = 'Pocillo' | 'Mediano' | 'Taza grande';
export type TipoProducto = 'expreso' | 'filtrado' | 'pasteleria';
export type EstadoPedido = 'pendiente' | 'en_preparacion' | 'listo' | 'entregado';

export interface ItemPedido {
  productoId: string;
  cantidad: number;
}

// Registro tal como se guarda en productos.json
export interface ProductoRecord {
  id: string;
  nombre: string;
  precioBase: number;
  tipo: TipoProducto;
  variedad?: Variedad;
  tamano?: Tamano;
}

// Registro tal como se guarda en pedidos.json
export interface PedidoRecord {
  id: string;
  mesa: number;
  items: ItemPedido[];
  estado: EstadoPedido;
}
