
import { useEffect, useState } from 'react'
import { obtenerProductos } from './services/productos'
import type { Menu } from './api/contratos' 
import { obtenerMesaDeUrl } from './utils/mesa'
import { SelectorCafe } from './components/SelectorCafe' 
import { Carrito } from './components/Carrito'
import { ConfirmarPedido } from './components/ConfirmarPedido'
import { Pasteleria } from './components/Pasteleria'
import { useCarrito } from './context/CarritoContext'


type EstadoProductos =
  | { estado: 'cargando' }
  | { estado: 'error'; mensaje: string }
  | { estado: 'exito'; productos: Menu }

export default function App() {

  const { agregarProducto } = useCarrito()


  const [estado, setEstado] = useState<EstadoProductos>({ estado: 'cargando' })
  const [mesa, setMesa] = useState<number | null>(null)


  // estado para controlar si el usuario esta armando un cafe
  const [cafeSeleccionado, setCafeSeleccionado] = useState<{ id : string, nombre: string, precio: number, tipo: string } | null>(null)

  useEffect(() => {
    const numeroMesa = obtenerMesaDeUrl(window.location.search)
    setMesa(numeroMesa)
    obtenerProductos()
      .then((productos) => {
        setEstado({ estado: 'exito', productos })
      })
      .catch(() => {
        setEstado({
          estado: 'error',
          mensaje: 'No se pudieron cargar los productos.',
        })
      })
  }, [])

  // funcion para manejar cuando el usuario termina los 3 pasos del selector

const manejarAgregarAlCarrito = (seleccion: {
  variedad: string
  tamano: string
  cantidad: number
}) => {
  if (!cafeSeleccionado || estado.estado !== 'exito') return

  const productoElegido = estado.productos.find(
    (producto) =>
      producto.tipo === cafeSeleccionado.tipo &&
      producto.tipo !== 'pasteleria' &&
      producto.variedad === seleccion.variedad &&
      producto.tamano === seleccion.tamano
  )

  if (!productoElegido) return

  const productoCarrito = {
    id: productoElegido.id,
    nombre: productoElegido.nombre,
    precio: productoElegido.precio,
    tipo: productoElegido.tipo,
  }

  for (let i = 0; i < seleccion.cantidad; i++) {
    agregarProducto(productoCarrito)
  }

  setCafeSeleccionado(null)
}


  return (
    <div className="app-shell">
      <header className="encabezado text-center">
        <div className="container py-4">
          <p className="text-uppercase small mb-1 opacity-75">
            Cafetería de especialidad
          </p>
          <h1 className="h3 mb-2">Café Origen</h1>
          <p className="mb-3">Un buen café hace la diferencia.</p>

          {mesa !== null ? (
            <p className="badge text-bg-success fs-6 mb-0">
              Pedido para la Mesa {mesa}
            </p>
          ) : (
            <p className="badge text-bg-warning fs-6 mb-0">
              Retiro en barra — escaneá el QR de tu mesa
            </p>
          )}
        </div>
      </header>

      <main className="container py-4">
        <section className="mb-4" aria-labelledby="titulo-menu">
          <h2 id="titulo-menu" className="h4 mb-3">
            Nuestro menú
          </h2>

          {estado.estado === 'cargando' && (
            <p role="status" className="text-muted">
              Cargando productos...
            </p>
          )}

          {estado.estado === 'error' && (
            <p className="alert alert-danger" role="alert">
              {estado.mensaje}
            </p>
          )}

          {estado.estado === 'exito' &&
            (estado.productos.length === 0 ? (
              <p>No hay productos disponibles.</p>
            ) : (
              <div className="row g-3">
                {estado.productos
                  .filter((producto) => producto.tipo !== 'pasteleria')
                  .map((producto) => (
                    <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
                      <article className="card h-100 producto-card">
                        <div className="card-body d-flex flex-column">
                          <span className="badge text-bg-secondary align-self-start mb-2">
                            {producto.tipo}
                          </span>
                          <h3 className="h6 card-title">{producto.nombre}</h3>
                          <p className="precio mt-auto mb-2">
                            {producto.precio.toLocaleString('es-AR', {
                              style: 'currency',
                              currency: 'ARS',
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary"
                            aria-label={`Elegir opciones de ${producto.nombre}`}
                            onClick={() =>
                              setCafeSeleccionado({
                                id: String(producto.id),
                                nombre: producto.nombre,
                                precio: producto.precio,
                                tipo: producto.tipo,
                              })
                            }
                          >
                            Elegir opciones
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
              </div>
            ))}
        </section>

        {estado.estado === 'exito' && (
          <Pasteleria productos={estado.productos} />
        )}

        <Carrito />
        <ConfirmarPedido mesa={mesa} />
      </main>

      {cafeSeleccionado && (
        <>
          <div className="modal-backdrop fade show" />
          <div
            className="modal d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-selector"
            tabIndex={-1}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title h5" id="titulo-selector">
                    Personalizando: {cafeSeleccionado.nombre}
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Cerrar"
                    onClick={() => setCafeSeleccionado(null)}
                  />
                </div>
                <div className="modal-body">
                  <SelectorCafe
                    precioBase={cafeSeleccionado.precio}
                    onAgregar={manejarAgregarAlCarrito}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

