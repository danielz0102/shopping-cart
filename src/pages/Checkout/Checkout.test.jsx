import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Checkout from '.'
import CartProvider from '@/providers/CartProvider'
import mockCart from '/tests/mocks/cart'

vi.mock('@/components/CartItem', () => ({
  default: ({ id }) => <div data-testid={id}>Item {id}</div>,
}))

test('renders all items in the cart', () => {
  renderCheckout()

  mockCart.forEach(({ product }) => screen.getByTestId(product.id))
})

test('shows the total price', () => {
  renderCheckout()

  const totalPrice = mockCart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  )

  screen.getByText(`$${totalPrice.toFixed(2)}`)
})

test('has a button to realize the payment', () => {
  renderCheckout()

  screen.getByRole('button', { name: /pay/i })
})

test('does not show the payment button if the cart is empty', () => {
  renderCheckout([])

  expect(screen.queryByRole('button', { name: /pay/i })).not.toBeInTheDocument()
})

function renderCheckout(cart = mockCart) {
  return render(
    <MemoryRouter>
      <CartProvider initialCart={cart}>
        <Checkout />
      </CartProvider>
    </MemoryRouter>,
  )
}
