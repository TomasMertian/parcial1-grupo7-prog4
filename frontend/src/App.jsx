import { useEffect, useState } from 'react'
import { obtenerProductos } from './services/productos'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerProductos()
      .then((datos) => setProductos(datos))
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setCargando(false))
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

        {cargando && <p>Cargando productos...</p>}

        {error && <p className="mensaje-error">{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}

        <div className="lista-productos">
          {productos.map((producto) => (
            <article className="producto" key={producto.id}>
              <div>
                <span className="tipo">{producto.tipo}</span>
                <h3>{producto.nombre}</h3>
              </div>

              <p className="precio">
                {Number(producto.precio).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  maximumFractionDigits: 0,
                })}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App

