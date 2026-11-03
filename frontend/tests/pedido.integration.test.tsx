import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import { CarritoProvider, useCarrito } from '../src/context/CarritoContext'
import { ConfirmarPedido } from '../src/components/ConfirmarPedido'

// MSW en Node no resuelve URLs relativas; se convierten a absolutas para el fetch real.
beforeEach(() => {
  const fetchConMsw = globalThis.fetch
  vi.stubGlobal('fetch', (entrada: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof entrada === 'string' && entrada.startsWith('/')
        ? new URL(entrada, 'http://localhost:3000')
        : entrada
    return fetchConMsw(url, init)
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function CarritoDePrueba() {
  const { items, agregarProducto } = useCarrito()
  return (
    <>
      <p>Items en carrito: {items.length}</p>
      <button
        type="button"
        onClick={() =>
          agregarProducto({
            id: 'pas-muffin',
            nombre: 'Muffin de chocolate',
            precio: 2500,
            tipo: 'pasteleria',
          })
        }
      >
        Agregar muffin
      </button>
    </>
  )
}

function renderizar(mesa: number | null = 4) {
  return render(
    <CarritoProvider>
      <ConfirmarPedido mesa={mesa} />
      <CarritoDePrueba />
    </CarritoProvider>,
  )
}

describe('Integración del pedido', () => {
  it('envía mesa e ítems y muestra número, estado y total', async () => {
    const usuario = userEvent.setup()
    let cuerpo: unknown
    server.use(
      http.post('*/pedidos', async ({ request }) => {
        cuerpo = await request.json()
        return HttpResponse.json(
          {
            id: 'pedido-1',
            mesaId: 4,
            items: [{ productoId: 'pas-muffin', cantidad: 1 }],
            estado: 'pendiente',
            total: 2500,
          },
          { status: 201 },
        )
      }),
    )

    renderizar(4)
    await usuario.click(screen.getByRole('button', { name: /agregar muffin/i }))
    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByText(/pedido #pedido-1/i)).toBeInTheDocument()
    expect(screen.getByText(/estado:\s*pendiente/i)).toBeInTheDocument()
    expect(screen.getByText(/2\.500/)).toBeInTheDocument()
    expect(cuerpo).toEqual({
      mesaId: 4,
      items: [{ productoId: 'pas-muffin', cantidad: 1 }],
    })
  })

  it('muestra el mensaje de la API y conserva el carrito ante un 4xx', async () => {
    const usuario = userEvent.setup()
    server.use(
      http.post('*/pedidos', () =>
        HttpResponse.json({ error: 'La mesa no está habilitada' }, { status: 400 }),
      ),
    )

    renderizar(4)
    await usuario.click(screen.getByRole('button', { name: /agregar muffin/i }))
    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('La mesa no está habilitada')
    expect(screen.getByText(/items en carrito: 1/i)).toBeInTheDocument()
  })

  it('muestra un error de conexión y conserva el carrito', async () => {
    const usuario = userEvent.setup()
    server.use(http.post('*/pedidos', () => HttpResponse.error()))

    renderizar(4)
    await usuario.click(screen.getByRole('button', { name: /agregar muffin/i }))
    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se pudo conectar con la api/i)
    expect(screen.getByText(/items en carrito: 1/i)).toBeInTheDocument()
  })

  it('muestra el error 500 y permite reintentar sin perder el carrito', async () => {
    const usuario = userEvent.setup()
    let intentos = 0
    server.use(
      http.post('*/pedidos', () => {
        intentos += 1
        if (intentos === 1) {
          return HttpResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
        }
        return HttpResponse.json(
          { id: 'pedido-1', mesaId: 4, estado: 'pendiente', total: 2500, items: [] },
          { status: 201 },
        )
      }),
    )

    renderizar(4)
    await usuario.click(screen.getByRole('button', { name: /agregar muffin/i }))
    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Error interno del servidor')
    expect(screen.getByText(/items en carrito: 1/i)).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: /confirmar pedido/i }))
    expect(await screen.findByText(/pedido #pedido-1/i)).toBeInTheDocument()
  })
})
