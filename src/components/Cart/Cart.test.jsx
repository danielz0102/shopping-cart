import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Cart from '.'
import mockCart from '/tests/mocks/cart'
import CartProvider from '@/providers/CartProvider'

vi.mock('../CartItem', () => ({
  default: ({ id }) => <div data-testid={id}>Item {id}</div>,
}))

vi.mock('../CartSidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
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

test('opens the sidebar when is clicked', async () => {
  const user = userEvent.setup()
  renderCart()

  await user.click(screen.getByRole('button', { name: /cart/i }))

  screen.getByTestId('sidebar')
})

test('closes the sidebar when is clicked again', async () => {
  const user = userEvent.setup()
  renderCart()
  await user.click(screen.getByRole('button', { name: /cart/i }))

  await user.click(screen.getByRole('button', { name: /cart/i }))

  expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
})

function renderCart(cart = []) {
  render(
    <CartProvider initialCart={cart}>
      <Cart />
    </CartProvider>,
  )
}
