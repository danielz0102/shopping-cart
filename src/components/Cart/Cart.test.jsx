import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Cart from '.'
import mockCart from '/tests/mocks/cart'
import CartProvider from '@/providers/CartProvider'

vi.mock('../CartItem', () => ({
  default: ({ id }) => <div data-testid={id}>Item {id}</div>,
}))

test('displays 0 if there are no products', () => {
  renderCart()
  screen.getByRole('button', { name: /cart.*0/i })
})

test('displays the quantity of items passed', () => {
  renderCart(mockCart)
  screen.getByRole('button', {
    name: new RegExp(`cart.*${mockCart.length}`, 'i'),
  })
})

test('renders CartItem for each product', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)

  await user.click(screen.getByRole('button', { name: /cart/i }))
  mockCart.forEach(({ product }) => screen.getByTestId(product.id))
})

test('does not display any items if no products are passed', async () => {
  const user = userEvent.setup()
  renderCart()
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByText(/car.*empty/i)
  expect(screen.queryByText(/product/i)).not.toBeInTheDocument()
})

test('hides items and sidebar when is clicked again', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })
  await user.click(button)
  const sidebar = screen.getByRole('dialog')
  const items = mockCart.map(({ product }) => screen.getByTestId(product.id))

  await user.click(button)

  expect(sidebar).not.toBeVisible()
  items.forEach((item) => expect(item).not.toBeVisible())
})

test('has a button to remove all products', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  await user.click(screen.getByRole('button', { name: /cart/i }))
  const items = mockCart.map(({ product }) => screen.getByTestId(product.id))

  await user.click(screen.getByRole('button', { name: /clear/i }))

  items.forEach((title) => expect(title).not.toBeVisible())
})

test('has a link to checkout', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByRole('link', { name: /checkout/i })
})

test('does not have a link to checkout if no products are passed', async () => {
  const user = userEvent.setup()
  renderCart()
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  expect(
    screen.queryByRole('link', { name: /checkout/i }),
  ).not.toBeInTheDocument()
})

test('has a button to close the sidebar', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  const closeBtn = screen.getByRole('button', { name: /close/i })
  const sidebar = screen.getByRole('dialog')

  await user.click(closeBtn)

  expect(sidebar).not.toBeVisible()
})

function renderCart(cart = []) {
  render(
    <MemoryRouter>
      <CartProvider initialCart={cart}>
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
}
