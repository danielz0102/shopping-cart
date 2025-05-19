import { test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Cart from '.'
import mockCart from '/tests/mocks/cart'
import CartProvider from '@/providers/CartProvider'

test('displays 0 if there are no products', () => {
  renderCart()
  screen.getByRole('button', { name: /cart.*0/i })
})

test('displays the quantity of items passed', () => {
  renderCart(mockCart)
  const totalItems = mockCart.reduce((acc, item) => acc + item.quantity, 0)

  screen.getByRole('button', {
    name: new RegExp(`cart.*${totalItems}`, 'i'),
  })
})

function renderCart(cart = []) {
  return render(
    <CartProvider initialCart={cart}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartProvider>,
  )
}
