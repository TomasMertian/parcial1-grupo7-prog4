import {createContext,useContext,useReducer,type ReactNode} from 'react';
import {carritoReducer,calcularSubtotal,type ItemCarrito,type ProductoCarrito} from '../utils/carritoReducer';

interface CarritoContexto {
  items: ItemCarrito[];
  subtotal: number;
  agregarProducto: (producto: ProductoCarrito) => void;
  restarProducto: (productoId: string) => void;
  eliminarProducto: (productoId: string) => void;
  vaciarCarrito: () => void;
}

type AccionContexto =
  | { tipo: 'AGREGAR'; producto: ProductoCarrito }
  | { tipo: 'RESTAR'; productoId: string }
  | { tipo: 'ELIMINAR'; productoId: string }
  | { tipo: 'VACIAR' };

const reducerContexto = (
  estado: ItemCarrito[],
  accion: AccionContexto
): ItemCarrito[] => {
  if (accion.tipo === 'VACIAR') {
    return [];
  }

  return carritoReducer(estado, accion);
};

const CarritoContext = createContext<CarritoContexto | undefined>(
  undefined
);

interface CarritoProviderProps {
  children: ReactNode;
}

export function CarritoProvider({
  children,
}: CarritoProviderProps) {
  const [items, dispatch] = useReducer(reducerContexto, []);

  const agregarProducto = (producto: ProductoCarrito) => { //agrega una unidad o incrementa la cantidad
    dispatch({ tipo: 'AGREGAR', producto });
  };

  const restarProducto = (productoId: string) => { //resta una unidad y elimina el producto si la cantidad llega a 0
    dispatch({ tipo: 'RESTAR', productoId });
  };

  const eliminarProducto = (productoId: string) => { //elimina el producto completamente
    dispatch({ tipo: 'ELIMINAR', productoId });
  };

  const vaciarCarrito = () => { //deja el carrito vacio
    dispatch({ tipo: 'VACIAR' });
  };

  const subtotal = calcularSubtotal(items); //calcula el subtotal de todos los productos

  return (
    <CarritoContext.Provider
      value={{
        items,
        subtotal, 
        agregarProducto,
        restarProducto,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContexto { //permite acceder al carrito desde los componentes
  const contexto = useContext(CarritoContext);

  if (contexto === undefined) {
    throw new Error(
      'useCarrito debe utilizarse dentro de un CarritoProvider'
    );
  }

  return contexto;
}
