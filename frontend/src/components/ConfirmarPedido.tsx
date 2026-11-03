import { useCarrito } from '../context/CarritoContext'

interface ConfirmarPedidoProps {
  mesa: number | null
}

export function ConfirmarPedido({ mesa }: ConfirmarPedidoProps) {
  const { items } = useCarrito()

  return (
    <section aria-labelledby="confirmar-pedido" className="confirmar-pedido">
      <h2 id="confirmar-pedido">Confirmar pedido</h2>
      <p>
        {mesa !== null
          ? `Pedido para la Mesa ${mesa}`
          : 'Pedido para retirar en barra'}
      </p>
      <button
        type="button"
        className="btn btn-primary"
        disabled={items.length === 0}
      >
        Confirmar pedido
      </button>
    </section>
  )
}
