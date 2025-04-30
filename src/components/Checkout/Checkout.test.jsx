import { test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Checkout from '.'
import CartProvider from '@/providers/CartProvider'
import mockCart from '/tests/mocks/cart'

vi.mock('../CartItem', () => ({
  default: ({ id }) => <div data-testid={id}>Item {id}</div>,
}))

vi.mock('../PaymentAlert', () => ({
  default: () => <div data-testid="alert">Payment Alert</div>,
}))

test('renders all items in the cart', () => {
  renderCheckout()

  mockCart.forEach(({ product }) => screen.getByTestId(product.id))
})

test('shows a message if the cart is empty', () => {
  renderCheckout([])

  screen.getByText(/cart.*empty/i)
})

test('has a button to realize the payment', () => {
  renderCheckout()

  screen.getByRole('button', { name: /pay/i })
})

test('shows the payment alert when the button is clicked', async () => {
  const user = userEvent.setup()
  renderCheckout()

  await user.click(screen.getByRole('button', { name: /pay/i }))

  screen.getByTestId('alert')
})

function renderCheckout(cart = mockCart) {
  return render(
    <CartProvider initialCart={cart}>
      <Checkout />
    </CartProvider>,
  )
}
