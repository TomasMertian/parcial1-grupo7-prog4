import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { crearPedido } from '../services/pedidos'
import {
  crearCuerpoPedido,
  type EstadoPedido,
  type PedidoConfirmado,
} from '../utils/pedido'
import { SeguimientoPedido } from './SeguimientoPedido'

interface ConfirmarPedidoProps {
  mesa: number | null
}

export function ConfirmarPedido({ mesa }: ConfirmarPedidoProps) {
  const { items, vaciarCarrito } = useCarrito()
  const [enviando, setEnviando] = useState(false)
  const [pedido, setPedido] = useState<PedidoConfirmado | null>(null)

  const confirmar = async () => {
    setEnviando(true)
    const respuesta = await crearPedido(crearCuerpoPedido(items, mesa))
    const mesaId = respuesta.mesaId ?? mesa

    const pedidoConfirmado: PedidoConfirmado = {
      id: respuesta.id as string,
      estado: respuesta.estado as EstadoPedido,
      total: respuesta.total as number,
      ...(mesaId !== null ? { mesaId } : {}),
    }

    setPedido(pedidoConfirmado)
    vaciarCarrito()
    setEnviando(false)
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
