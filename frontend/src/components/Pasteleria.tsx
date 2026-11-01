
import type { Producto } from '../api/contratos';
import { useCarrito } from '../context/CarritoContext';

interface PasteleriaProps {
  productos: Producto[];
}

export function Pasteleria({ productos }: PasteleriaProps) {
  const { agregarProducto } = useCarrito();

  const productosPasteleria = productos.filter(
    (producto) => producto.tipo === 'pasteleria',
  );

  if (productosPasteleria.length === 0) {
    return <p>No hay productos de pastelería disponibles.</p>;
  }

  return (
    <section>
      <h2>Pastelería</h2>

      <div className="lista-productos">
        {productosPasteleria.map((producto) => (
          <article className="producto" key={producto.id}>
            <div>
              <h3>{producto.nombre}</h3>
              <p>
                {producto.precio.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                agregarProducto({
                  id: producto.id,
                  nombre: producto.nombre,
                  precio: producto.precio,
                  tipo: producto.tipo,
                })
              }
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
