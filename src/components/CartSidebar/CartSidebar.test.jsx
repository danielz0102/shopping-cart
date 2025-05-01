import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import CartSidebar from '.'
import CartProvider from '@/providers/CartProvider'
import mockCart from '/tests/mocks/cart'
import { vi } from 'vitest'

vi.mock('../CartItem', () => ({
  default: ({ id }) => <div data-testid="cart-item">Item {id}</div>,
}))

test('has a button to close', async () => {
  const user = userEvent.setup()
  renderSidebar()

  const closeButton = screen.getByRole('button', { name: /close/i })
  await user.click(closeButton)

  expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
})

test('shows a message when the cart is empty', () => {
  renderSidebar()
  screen.getByRole('heading', { name: /the cart is empty/i })
})

test('shows a message when the cart has items', () => {
  renderSidebar(mockCart)
  screen.getByRole('heading', { name: /your products/i })
})

test('renders a CartItem for each item in the cart', () => {
  renderSidebar(mockCart)
  const items = screen.getAllByTestId('cart-item')
  expect(items).toHaveLength(mockCart.length)
})

test('shows the total price', () => {
  renderSidebar(mockCart)
  const total = mockCart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  )
  screen.getByText((content) =>
    content.toLowerCase().includes(`total: $${total.toFixed(2)}`.toLowerCase()),
  )
})

test('does not show the total price when the cart is empty', () => {
  renderSidebar()
  expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
})

test('has a link to checkout', async () => {
  renderSidebar(mockCart)

  screen.getByRole('link', { name: /checkout/i })
})

test('closes the sidebar when clicking on checkout', async () => {
  const user = userEvent.setup()
  renderSidebar(mockCart)

  await user.click(screen.getByRole('link', { name: /checkout/i }))

  expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
})

test('does not have a link to checkout if the cart is empty', () => {
  renderSidebar()
  expect(
    screen.queryByRole('link', { name: /checkout/i }),
  ).not.toBeInTheDocument()
})

test('has a button to clear the cart', async () => {
  const user = userEvent.setup()
  renderSidebar(mockCart)

  await user.click(screen.getByRole('button', { name: /clear/i }))

  screen.getByRole('heading', { name: /the cart is empty/i })
})

function renderSidebar(cart = []) {
  return render(
    <MemoryRouter>
      <CartProvider initialCart={cart}>
        <CartSidebar />
      </CartProvider>
    </MemoryRouter>,
  )
}
