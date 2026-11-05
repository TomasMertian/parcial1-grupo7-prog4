import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { crearPedido } from '../services/pedidos'
import {
  crearCuerpoPedido,
  mensajeDeError,
  type PedidoConfirmado,
} from '../utils/pedido'
import { SeguimientoPedido } from './SeguimientoPedido'

interface ConfirmarPedidoProps {
  mesa: number | null
}

export function ConfirmarPedido({ mesa }: ConfirmarPedidoProps) {
  const { items, subtotal, vaciarCarrito } = useCarrito()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pedido, setPedido] = useState<PedidoConfirmado | null>(null)

  const confirmar = async () => {
    setEnviando(true)
    setError(null)

    try {
      const respuesta = await crearPedido(crearCuerpoPedido(items, mesa))

      if (
        respuesta.id === undefined ||
        respuesta.estado === undefined ||
        respuesta.total === undefined
      ) {
        throw new Error('La API devolvió una respuesta incompleta')
      }

      const mesaId = respuesta.mesaId ?? mesa
      const pedidoConfirmado: PedidoConfirmado = {
        id: respuesta.id,
        estado: respuesta.estado,
        total: respuesta.total,
        ...(mesaId !== null ? { mesaId } : {}),
      }

      setPedido(pedidoConfirmado)
      vaciarCarrito()
    } catch (causa) {
      setError(mensajeDeError(causa, 'No se pudo confirmar el pedido'))
    } finally {
      setEnviando(false)
    }
  }

  if (pedido !== null) {
    return <SeguimientoPedido pedido={pedido} />
  }

  return (
    <section
      aria-labelledby="confirmar-pedido"
      className="confirmar-pedido barra-confirmar"
      aria-busy={enviando}
    >
      <div>
        <h2 id="confirmar-pedido" className="h6 mb-1">Confirmar pedido</h2>
        <p className="mb-0 small text-muted">
          {mesa !== null ? `Mesa ${mesa}` : 'Retiro en barra'}
        </p>
        <p className="mb-0 fw-bold">
          Subtotal: {subtotal.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0,
          })}
        </p>
      </div>

      <div className="d-flex flex-column align-items-end gap-1">
        {error !== null && (
          <p className="mensaje-error alert alert-danger mb-0" role="alert">
            {error}
          </p>
        )}
        {items.length === 0 && (
          <p className="mb-0 small text-muted">Agregá productos para confirmar</p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={confirmar}
          disabled={items.length === 0 || enviando}
        >
          {enviando ? 'Enviando...' : 'Confirmar pedido'}
        </button>
      </div>
    </section>
  )
}
