import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/Navbar'

test('has links to home and shop page', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
  const homeLink = screen.getByText(/home/i)
  const shopLink = screen.getByText(/shop/i)
  expect(homeLink).toBeInTheDocument()
  expect(shopLink).toBeInTheDocument()
})
