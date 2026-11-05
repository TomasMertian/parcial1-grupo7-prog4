import { useState } from 'react'
import type { Producto } from '../api/contratos'
import { formatearPrecio } from '../utils/pedido'
import {
  BEBIDAS,
  ORIGENES,
  TAMANOS,
  buscarCafe,
  type Bebida,
  type Tamano,
  type Variedad,
} from '../utils/cafe'

interface SelectorCafeProps {
  productos: Producto[]
  onAgregar: (producto: Producto, cantidad: number) => void
}

export function SelectorCafe({ productos, onAgregar }: SelectorCafeProps) {
  const [bebida, setBebida] = useState<Bebida | ''>('')
  const [tamano, setTamano] = useState<Tamano | ''>('')
  const [variedad, setVariedad] = useState<Variedad | ''>('')
  const [cantidad, setCantidad] = useState(1)

  const producto = buscarCafe(productos, bebida, tamano, variedad)

  const manejarAgregar = () => {
    if (producto) onAgregar(producto, cantidad)
  }

  return (
    <div className="selector-cafe">
      <fieldset className="mb-3">
        <legend className="h6">Paso 1: Elegí la bebida</legend>
        <div className="d-flex flex-wrap gap-3">
          {BEBIDAS.map((opcion) => (
            <div className="form-check" key={opcion.valor}>
              <input
                className="form-check-input"
                type="radio"
                id={`bebida-${opcion.valor}`}
                name="bebida"
                value={opcion.valor}
                checked={bebida === opcion.valor}
                onChange={() => setBebida(opcion.valor)}
              />
              <label
                className="form-check-label"
                htmlFor={`bebida-${opcion.valor}`}
              >
                {opcion.nombre}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-3">
        <legend className="h6">Paso 2: Elegí el tamaño</legend>
        <div className="d-flex flex-wrap gap-3">
          {TAMANOS.map((opcion) => {
            const id = `tamano-${opcion.toLowerCase().replace(/\s+/g, '-')}`

            return (
              <div className="form-check" key={opcion}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={id}
                  name="tamano"
                  value={opcion}
                  checked={tamano === opcion}
                  onChange={() => setTamano(opcion)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {opcion}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mb-3">
        <legend className="h6">Paso 3: Elegí el origen</legend>
        <div className="d-flex flex-column gap-2">
          {ORIGENES.map((origen) => {
            const productoDelOrigen = buscarCafe(
              productos,
              bebida,
              tamano,
              origen.variedad,
            )

            return (
              <div className="form-check origen-opcion" key={origen.variedad}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={`origen-${origen.variedad}`}
                  name="origen"
                  value={origen.variedad}
                  checked={variedad === origen.variedad}
                  onChange={() => setVariedad(origen.variedad)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`origen-${origen.variedad}`}
                >
                  <span className="fw-semibold">{origen.nombre}</span>
                  <span className="d-block small text-muted">
                    {origen.descripcion}
                  </span>
                  {bebida !== '' && tamano !== '' && (
                    <span className="d-block small fw-semibold">
                      {productoDelOrigen
                        ? formatearPrecio(productoDelOrigen.precio)
                        : 'Precio no disponible'}
                    </span>
                  )}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <div className="control-cantidad d-flex align-items-center gap-2 mb-3">
        <span className="mb-0">Cantidad:</span>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-label="Restar cantidad"
          onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
          disabled={cantidad <= 1}
        >
          -
        </button>
        <span aria-live="polite">{cantidad}</span>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-label="Sumar cantidad"
          onClick={() => setCantidad((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <p aria-live="polite" className="mb-3">
        {producto
          ? `Total: ${formatearPrecio(producto.precio * cantidad)}`
          : 'Elegí bebida, tamaño y origen para agregar el café.'}
      </p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={manejarAgregar}
        disabled={!producto}
      >
        Agregar al pedido
      </button>
    </div>
  )
}