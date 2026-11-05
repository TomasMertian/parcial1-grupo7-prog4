
import { useCallback, useEffect, useState } from 'react'
import { obtenerProductos } from './services/productos'
import type { Menu, Producto } from './api/contratos' 
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


 
  const cargarProductos = useCallback(async () => {
  setEstado({ estado: 'cargando' })

  try {
    const productos = await obtenerProductos()
    setEstado({ estado: 'exito', productos })
  } catch (causa) {
    setEstado({
      estado: 'error',
      mensaje:
        causa instanceof Error
          ? causa.message
          : 'No se pudieron cargar los productos.',
    })
  }
  }, [])

  useEffect(() => {
    setMesa(obtenerMesaDeUrl(window.location.search))
    void cargarProductos()
  }, [cargarProductos])

  // funcion para manejar cuando el usuario termina los 3 pasos del selector

  const manejarAgregarAlCarrito = (producto: Producto, cantidad: number) => {
    const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      tipo: producto.tipo,
    }

    for (let i = 0; i < cantidad; i++) {
      agregarProducto(productoCarrito)
    }
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
            <div className="alert alert-danger" role="alert">
              <p className="mb-2">{estado.mensaje}</p>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => void cargarProductos()}
              >
                Reintentar
              </button>
            </div>
          )}

          {estado.estado === 'exito' &&
            (estado.productos.length === 0 ? (
              <p>No hay productos disponibles.</p>
            ) : (
              <div className="card producto-card">
                <div className="card-body">
                  <h3 className="h5 card-title">Café en tres pasos</h3>
                  <SelectorCafe
                    productos={estado.productos}
                    onAgregar={manejarAgregarAlCarrito}
                  />
                </div>
              </div>
    ))}
        </section>

        {estado.estado === 'exito' && (
          <Pasteleria productos={estado.productos} />
        )}

        <Carrito />
        <ConfirmarPedido mesa={mesa} />
      </main>

    </div>
  )
}

