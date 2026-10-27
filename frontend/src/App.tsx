
import { useEffect, useState } from 'react'
import { obtenerProductos } from './services/productos'
import type { ProductoApi } from './services/productos'
import './App.css'

type EstadoProductos =
  | { estado: 'cargando' }
  | { estado: 'error'; mensaje: string }
  | { estado: 'exito'; productos: ProductoApi[] }

function App() {
  const [estado, setEstado] = useState<EstadoProductos>({
    estado: 'cargando',
  })

  useEffect(() => {
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

  return (
    <main className="menu">
      <header className="encabezado">
        <p className="subtitulo">CAFETERÍA DE ESPECIALIDAD</p>
        <h1>Café Origen</h1>
        <p>Un buen café hace la diferencia.</p>
      </header>

      <section className="productos">
        <h2>Nuestro menú</h2>

        {estado.estado === 'cargando' && (
          <p role="status">Cargando productos...</p>
        )}

        {estado.estado === 'error' && (
          <p className="mensaje-error" role="alert">
            {estado.mensaje}
          </p>
        )}

        {estado.estado === 'exito' && (
          <>
            {estado.productos.length === 0 ? (
              <p>No hay productos disponibles.</p>
            ) : (
              <div className="lista-productos">
                {estado.productos.map((producto) => (
                  <article className="producto" key={producto.id}>
                    <div>
                      <span className="tipo">{producto.tipo}</span>
                      <h3>{producto.nombre}</h3>
                    </div>

                    <p className="precio">
                      {producto.precio.toLocaleString('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default App

