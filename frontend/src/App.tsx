
import { useEffect, useState } from 'react'
import { obtenerProductos } from './services/productos'
import type { Menu } from './api/contratos' 
import { obtenerMesaDeUrl } from './utils/mesa'
import { SelectorCafe } from './components/SelectorCafe' 
import { Carrito } from './components/Carrito'
import { ConfirmarPedido } from './components/ConfirmarPedido'
import { Pasteleria } from './components/Pasteleria'
import { useCarrito } from './context/CarritoContext'

import './App.css'

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
    <main className="menu">
      <header className="encabezado">
        <p className="subtitulo">CAFETERÍA DE ESPECIALIDAD</p>
        <h1>Café Origen</h1>
        <p>Un buen café hace la diferencia.</p>

          {mesa ? (
          <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e6ffe6', borderRadius: '4px', color: '#006600', fontWeight: 'bold' }}>
            Pedido para la Mesa {mesa}
          </div>
        ) : (
          <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6', borderRadius: '4px', color: '#cc0000', fontWeight: 'bold' }}>
            Por favor, escaneá el QR de tu mesa para hacer un pedido
          </div>
        )}
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
                {estado.productos
                .filter((producto) => producto.tipo !== 'pasteleria')
                  .map((producto) => (
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
                    {producto.tipo === 'expreso' || producto.tipo === 'filtrado' ? (
                        <button 
                          style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
                          onClick={() => setCafeSeleccionado({ id: String(producto.id), nombre: producto.nombre, precio:  producto.precio, tipo: producto.tipo })}
                        >
                          Elegir opciones
                        </button>
                      ) : (
                        <button style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                          Agregar al pedido
                        </button>
                      )}
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
      {estado.estado === 'exito' && (
        <Pasteleria productos={estado.productos} />)} // Agregamos la sección de pastelería
          <Carrito />
      <ConfirmarPedido mesa={mesa} />
      {cafeSeleccionado && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 100
        }}>
          <h2>Personalizando: {cafeSeleccionado.nombre}</h2>
          <SelectorCafe 
            precioBase={cafeSeleccionado.precio} 
            onAgregar={manejarAgregarAlCarrito} 
          />
          <button 
            style={{ marginTop: '15px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => setCafeSeleccionado(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </main>
  )
}

