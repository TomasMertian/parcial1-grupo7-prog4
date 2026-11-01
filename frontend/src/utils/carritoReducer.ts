
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
  }
}
