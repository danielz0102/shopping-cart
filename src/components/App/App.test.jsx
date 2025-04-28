import { test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from '.'
vi.mock('@/components/Navbar', () => ({
  default: () => {
    return <div data-testid="navbar-mock">Navbar</div>
  },
}))

vi.mock('react-router-dom', () => ({
  Outlet: () => {
    return <div data-testid="outlet-mock">Outlet</div>
  },
}))

test('renders Navbar', () => {
  render(<App />)
  screen.getByTestId('navbar-mock')
})

test('renders Outlet', () => {
  render(<App />)
  screen.getByTestId('outlet-mock')
})
