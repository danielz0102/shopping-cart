import { test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Cart from '@/components/Cart'
import CartProvider from '@/providers/CartProvider'

test('opens the sidebar when is clicked', async () => {
  const user = userEvent.setup()
  render(
    <CartProvider>
      <Cart />
    </CartProvider>,
  )

  await user.click(screen.getByRole('button', { name: /cart/i }))

  expect(screen.getByRole('complementary'))
})

test('closes the sidebar when is clicked again', async () => {
  const user = userEvent.setup()
  render(
    <CartProvider>
      <Cart />
    </CartProvider>,
  )
  await user.click(screen.getByRole('button', { name: /cart/i }))
  await user.click(screen.getByRole('button', { name: /cart/i }))

  await waitFor(() => {
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })
})
