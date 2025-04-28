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
  screen.getByText(/home/i)
  screen.getByText(/shop/i)
})

test('displays the cart', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
  screen.getByTestId(1)
})
