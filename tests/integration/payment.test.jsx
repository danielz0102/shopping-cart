import { test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Checkout from '@/pages/Checkout'
import Cart from '@/components/Navbar/components/Cart'
import CartProvider from '@/providers/CartProvider'
import mockCart from '/tests/mocks/cart'

test('Empty the cart when PaymentAlert confirms', async () => {
  await pay()

  screen.getByRole('button', { name: /cart.*0/i })
})

test('shows a gratification message and a link to shop when the payment is confirmed', async () => {
  await pay()

  screen.getByText(/thanks/i)
  screen.getByRole('link', { name: /shop/i })
})

function renderCheckout(cart = mockCart) {
  return render(
    <MemoryRouter>
      <CartProvider initialCart={cart}>
        <Checkout />
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
}

async function pay() {
  const user = userEvent.setup()
  renderCheckout()

  await user.click(screen.getByRole('button', { name: /pay/i }))
  await user.click(screen.getByRole('button', { name: /confirm/i }))
}
