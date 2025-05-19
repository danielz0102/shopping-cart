import { test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/Navbar'

vi.mock('./components/Cart', () => ({
  default: () => <div data-testid="cart">Cart</div>,
}))

vi.mock('./components/ThemeToggle', () => ({
  default: () => <button data-testid="toggle-theme">Toggle Theme</button>,
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

test('has the cart', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
  screen.getByTestId('cart')
})

test('has a button to toggle theme', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
  screen.getByTestId('toggle-theme')
})
