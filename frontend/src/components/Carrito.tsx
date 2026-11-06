
import { useCarrito } from '../context/CarritoContext';

export function Carrito() {
  const {
    items,
    subtotal,
    restarProducto,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  return (
    <section className="mb-4" aria-labelledby="mi-carrito">
      <h2 id="mi-carrito" className="h4 mb-3">
        Mi carrito
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li key={item.producto.id} className="list-group-item">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <h3 className="h6 mb-1">{item.producto.nombre}</h3>
                    <p className="mb-0 small text-muted">
                      Precio unitario: $
                      {item.producto.precio.toLocaleString('es-AR')}
                    </p>
                    <p className="mb-0">Cantidad: {item.cantidad}</p>
                    <p className="mb-0 small">
                      Subtotal del producto: $
                      {(item.producto.precio * item.cantidad).toLocaleString('es-AR')}
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      aria-label={`Restar una unidad de ${item.producto.nombre}`}
                      onClick={() => restarProducto(item.producto.id)}
                    >
                      Restar
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Eliminar ${item.producto.nombre} del carrito`}
                      onClick={() => eliminarProducto(item.producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mb-3">
            <strong>Subtotal del carrito: ${subtotal.toLocaleString('es-AR')}</strong>
          </p>

          <button type="button" className="btn btn-outline-danger" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </>
      )}
    </section>
  );
}
