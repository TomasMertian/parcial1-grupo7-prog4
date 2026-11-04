import { test, expect } from '@playwright/test'

const API = 'http://localhost:3000'

test.beforeEach(async ({ request }) => {
  await request.post(`${API}/__test__/reset`)
  await request.post(`${API}/__test__/seed`)
})

test('recorrido feliz: mesa, café, pastelería y confirmación', async ({ page }) => {
  await page.goto('/?mesa=4')

  await expect(page.getByText('Pedido para la Mesa 4')).toBeVisible()

  await page
    .getByRole('button', { name: /elegir opciones de café expreso pocillo colombia/i })
    .click()

  const dialogo = page.getByRole('dialog')
  await expect(dialogo).toBeVisible()
  await dialogo.getByRole('button', { name: 'Colombia' }).click()
  await dialogo.getByRole('button', { name: 'Pocillo' }).click()
  await dialogo.getByRole('button', { name: /agregar al pedido/i }).click()
  await expect(dialogo).toBeHidden()

  await page
    .getByRole('button', { name: /agregar al carrito: muffin de chocolate/i })
    .click()

  await page.getByRole('button', { name: /confirmar pedido/i }).click()

  await expect(page.getByText(/pedido #/i)).toBeVisible()
  await expect(page.getByText(/estado:\s*pendiente/i)).toBeVisible()
})

test('a 375 px no hay scroll horizontal', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'solo corre en el proyecto mobile')

  await page.goto('/?mesa=4')
  await expect(page.getByRole('heading', { name: 'Café Origen' })).toBeVisible()

  const ancho = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(ancho).toBeLessThanOrEqual(375)
})