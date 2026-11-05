import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../src/mocks/server'
import { productosMock } from '../src/mocks/handlers'
import { CarritoProvider } from '../src/context/CarritoContext'
import App from '../src/App'

beforeEach(() => {
  window.history.pushState({}, '', '/?mesa=4')

  const fetchConMsw = globalThis.fetch
  vi.stubGlobal('fetch', (entrada: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof entrada === 'string' && entrada.startsWith('/')
        ? new URL(entrada, 'http://localhost:3000')
        : entrada
    return fetchConMsw(url, init)
  })

  server.use(
    http.get('*/productos', () => HttpResponse.json(productosMock)),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  window.history.pushState({}, '', '/')
})

function renderizarApp() {
  return render(
    <CarritoProvider>
      <App />
    </CarritoProvider>,
  )
}

describe('Integracion: selector de cafe', () => {
  it('arma un café en tres pasos, muestra el precio y envía el pedido correcto', async () => {
    const usuario = userEvent.setup()
    let cuerpo: unknown

    server.use(
      http.post('*/pedidos', async ({ request }) => {
        cuerpo = await request.json()
        return HttpResponse.json(
          {
            id: 'pedido-cafe',
            mesaId: 4,
            items: [{ productoId: 'exp-med-col', cantidad: 1 }],
            estado: 'pendiente',
            total: 7360,
          },
          { status: 201 },
        )
      }),
    )

    renderizarApp()

    expect(
      await screen.findByRole('heading', { name: /café en tres pasos/i }),
    ).toBeInTheDocument()

    await usuario.click(screen.getByRole('radio', { name: 'Expreso' }))
    await usuario.click(screen.getByRole('radio', { name: 'Mediano' }))

    expect(
      screen.getByText(/acidez media, cuerpo equilibrado/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/\$\s*7\.360/)).toBeInTheDocument()

    await usuario.click(screen.getByRole('radio', { name: /colombia/i }))
    await usuario.click(
      screen.getByRole('button', { name: /agregar al pedido/i }),
    )

    expect(
      screen.getByText(/café expreso mediano colombia/i),
    ).toBeInTheDocument()

    await usuario.click(
      screen.getByRole('button', { name: /confirmar pedido/i }),
    )

    expect(await screen.findByText(/pedido #pedido-cafe/i)).toBeInTheDocument()
    expect(screen.getByText(/estado:\s*pendiente/i)).toBeInTheDocument()
    expect(screen.getAllByText(/7\.360/).length).toBeGreaterThan(0)
    expect(cuerpo).toEqual({
      mesaId: 4,
      items: [{ productoId: 'exp-med-col', cantidad: 1 }],
    })
  })

  it('muestra el mensaje de error del menu y permite reintentar', async () => {
    const usuario = userEvent.setup()
    let intentos = 0

    server.use(
      http.get('*/productos', () => {
        intentos += 1
        if (intentos === 1) {
          return HttpResponse.json(
            { error: 'No se pudo cargar el menú' },
            { status: 500 },
          )
        }
        return HttpResponse.json(productosMock)
      }),
    )

    renderizarApp()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudo cargar el menu',
    )

    await usuario.click(
      screen.getByRole('button', { name: /reintentar/i }),
    )

    expect(
      await screen.findByRole('heading', { name: /café en tres pasos/i }),
    ).toBeInTheDocument()
  })
})