import { test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import CartSidebar from '.'
import CartProvider from '@/providers/CartProvider'
import mockCart from '/tests/mocks/cart'
import { vi } from 'vitest'

vi.mock('../CartItem', () => ({
  default: ({ id }) => <div data-testid="cart-item">Item {id}</div>,
}))

test('throws an error if open prop is not a boolean', () => {
  expect(() => renderSidebar({ open: 'not a boolean' })).toThrow()
  expect(() => renderSidebar({ open: {} })).toThrow()
  expect(() => renderSidebar({ open: 123 })).toThrow()
})

test('throws an error if onClose prop is not a function', () => {
  expect(() => renderSidebar({ onClose: 'not a function' })).toThrow()
  expect(() => renderSidebar({ onClose: {} })).toThrow()
  expect(() => renderSidebar({ onClose: 123 })).toThrow()
})

test('opens by default', async () => {
  renderSidebar()
  await waitFor(() => expect(screen.getByRole('complementary')).toBeVisible())
})

test('executes onClose when close button is clicked', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  renderSidebar({ onClose })

  await user.click(screen.getByRole('button', { name: /close/i }))

  expect(onClose).toHaveBeenCalled()
})

test('shows a message when the cart is empty', () => {
  renderSidebar()
  screen.getByRole('heading', { name: /the cart is empty/i })
})

test('shows a message when the cart has items', () => {
  renderSidebar({ cart: mockCart })
  screen.getByRole('heading', { name: /your products/i })
})

test('renders a CartItem for each item in the cart', () => {
  renderSidebar({ cart: mockCart })
  const items = screen.getAllByTestId('cart-item')
  expect(items).toHaveLength(mockCart.length)
})

test('shows the total price', () => {
  renderSidebar({ cart: mockCart })
  const total = mockCart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  )
  screen.getByText(new RegExp(total.toFixed(2), 'i'))
})

test('does not show the total price when the cart is empty', () => {
  renderSidebar()
  expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
})

test('has a link to checkout', async () => {
  renderSidebar({ cart: mockCart })

  screen.getByRole('link', { name: /checkout/i })
})

test('executes onClose when checkout link is clicked', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  renderSidebar({ cart: mockCart, onClose })

  await user.click(screen.getByRole('link', { name: /checkout/i }))

  expect(onClose).toHaveBeenCalled()
})

test('does not have a link to checkout if the cart is empty', () => {
  renderSidebar()
  expect(
    screen.queryByRole('link', { name: /checkout/i }),
  ).not.toBeInTheDocument()
})

test('has a button to clear the cart', async () => {
  const user = userEvent.setup()
  renderSidebar({ cart: mockCart })

  await user.click(screen.getByRole('button', { name: /clear/i }))

  screen.getByRole('heading', { name: /the cart is empty/i })
})

function renderSidebar(
  { open = true, onClose = () => {}, cart = [] } = {
    open: true,
    onClose: () => {},
    cart: [],
  },
) {
  return render(
    <MemoryRouter>
      <CartProvider initialCart={cart}>
        <CartSidebar open={open} onClose={onClose} />
      </CartProvider>
    </MemoryRouter>,
  )
}
