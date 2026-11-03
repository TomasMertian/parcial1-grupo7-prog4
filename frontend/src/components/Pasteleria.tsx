
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
    <section className="mb-4" aria-labelledby="titulo-pasteleria">
      <h2 id="titulo-pasteleria" className="h4 mb-3">
        Pastelería
      </h2>

      <div className="row g-3">
        {productosPasteleria.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <article className="card h-100 producto-card">
              <div className="card-body d-flex flex-column">
                <h3 className="h6 card-title">{producto.nombre}</h3>
                <p className="precio mb-3">
                  {producto.precio.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    maximumFractionDigits: 0,
                  })}
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-auto"
                  aria-label={`Agregar al carrito: ${producto.nombre}`}
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
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
