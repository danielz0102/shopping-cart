import { test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/Navbar'

vi.mock('../Cart', () => ({
  default: () => <div data-testid="1">Cart</div>,
}))

test('has links to home and shop page', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
  screen.getByRole('link', { name: /home/i })
  screen.getByRole('link', { name: /shop/i })
})

test('displays the cart', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
  screen.getByTestId(1, { name: /cart/i })
})
