import { useState } from 'react'
import { obtenerPedidoPorId } from '../services/pedidos'
import {
  etiquetaEstado,
  formatearPrecio,
  type EstadoPedido,
  type PedidoConfirmado,
} from '../utils/pedido'

interface SeguimientoPedidoProps {
  pedido: PedidoConfirmado
}

export function SeguimientoPedido({ pedido }: SeguimientoPedidoProps) {
  const [estado, setEstado] = useState<EstadoPedido>(pedido.estado)
  const [actualizando, setActualizando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function actualizar() {
    setActualizando(true)
    setError(null)

    try {
      const respuesta = await obtenerPedidoPorId(pedido.id)

      if (respuesta.estado === undefined) {
        throw new Error('La API devolvió una respuesta incompleta')
      }

      setEstado(respuesta.estado)
    } catch (causa) {
      setError(
        causa instanceof Error
          ? causa.message
          : 'No se pudo actualizar el estado',
      )
    } finally {
      setActualizando(false)
    }
  }

  return (
    <section
      aria-labelledby="seguimiento-pedido"
      className="seguimiento-pedido"
    >
      <h2 id="seguimiento-pedido">Tu pedido</h2>
      <p>Pedido #{pedido.id}</p>
      <p>
        {pedido.mesaId !== undefined
          ? `Mesa ${pedido.mesaId}`
          : 'Retiro en barra'}
      </p>
      <p aria-live="polite">Estado: {etiquetaEstado(estado)}</p>
      <p>
        <strong>Total: {formatearPrecio(pedido.total)}</strong>
      </p>
      {error !== null && (
        <p className="mensaje-error alert alert-danger" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={actualizar}
        disabled={actualizando}
      >
        {actualizando ? 'Actualizando...' : 'Actualizar estado'}
      </button>
    </section>
  )
}
