
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
    <section>
      <h2>Mi carrito</h2>

      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <div className="lista-carrito">
            {items.map((item) => (
              <article key={item.producto.id} className="item-carrito">
                <h3>{item.producto.nombre}</h3>

                <p>
                  Precio unitario: $
                  {item.producto.precio.toLocaleString('es-AR')}
                </p>

                <p>Cantidad: {item.cantidad}</p>

                <p>
                  Subtotal del producto: $
                  {(item.producto.precio * item.cantidad).toLocaleString('es-AR')}
                </p>

                <button
                  type="button"
                  onClick={() => restarProducto(item.producto.id)}
                >
                  Restar
                </button>

                <button
                  type="button"
                  onClick={() => eliminarProducto(item.producto.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <p>
            <strong>
              Subtotal del carrito: ${subtotal.toLocaleString('es-AR')}
            </strong>
          </p>

          <button type="button" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </>
      )}
    </section>
  );
}
