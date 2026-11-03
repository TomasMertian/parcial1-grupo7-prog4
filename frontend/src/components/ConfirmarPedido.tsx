import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { crearPedido } from '../services/pedidos'
import { crearCuerpoPedido, type PedidoConfirmado } from '../utils/pedido'
import { SeguimientoPedido } from './SeguimientoPedido'

interface ConfirmarPedidoProps {
  mesa: number | null
}

export function ConfirmarPedido({ mesa }: ConfirmarPedidoProps) {
  const { items, vaciarCarrito } = useCarrito()
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
      setError(
        causa instanceof Error
          ? causa.message
          : 'No se pudo confirmar el pedido',
      )
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
      className="confirmar-pedido"
      aria-busy={enviando}
    >
      <h2 id="confirmar-pedido">Confirmar pedido</h2>
      <p>
        {mesa !== null
          ? `Pedido para la Mesa ${mesa}`
          : 'Pedido para retirar en barra'}
      </p>
      {error !== null && (
        <p className="mensaje-error alert alert-danger" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        className="btn btn-primary"
        onClick={confirmar}
        disabled={items.length === 0 || enviando}
      >
        {enviando ? 'Enviando...' : 'Confirmar pedido'}
      </button>
    </section>
  )
}
