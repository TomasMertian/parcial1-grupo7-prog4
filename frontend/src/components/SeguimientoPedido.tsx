import {
  etiquetaEstado,
  formatearPrecio,
  type PedidoConfirmado,
} from '../utils/pedido'

interface SeguimientoPedidoProps {
  pedido: PedidoConfirmado
}

export function SeguimientoPedido({ pedido }: SeguimientoPedidoProps) {
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
      <p>Estado: {etiquetaEstado(pedido.estado)}</p>
      <p>
        <strong>Total: {formatearPrecio(pedido.total)}</strong>
      </p>
    </section>
  )
}
