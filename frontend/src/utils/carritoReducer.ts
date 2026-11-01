
export interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  tipo: string;
}

export interface ItemCarrito {
  producto: ProductoCarrito;
  cantidad: number;
}

export type AccionCarrito =
  | {
      tipo: 'AGREGAR';
      producto: ProductoCarrito;
    }
  | {
      tipo: 'RESTAR';
      productoId: string;
    }
  | {
      tipo: 'ELIMINAR';
      productoId: string;
    };

export function carritoReducer(
  estado: ItemCarrito[],
  accion: AccionCarrito
): ItemCarrito[] {
  switch (accion.tipo) {
    case 'AGREGAR': {
      const existente = estado.find(
        (item) => item.producto.id === accion.producto.id
      );

      if (existente) {
        return estado.map((item) =>
          item.producto.id === accion.producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...estado,
        {
          producto: accion.producto,
          cantidad: 1,
        },
      ];
    }

    case 'RESTAR': {
      return estado
        .map((item) =>
          item.producto.id === accion.productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0);
    }

    case 'ELIMINAR': {
      return estado.filter(
        (item) => item.producto.id !== accion.productoId
      );
    }

    default: {
      return estado;
    }
  }
}
export function calcularSubtotal(estado: ItemCarrito[]): number { //multiplica el precio del producto por la cantidad
  return estado.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );
}