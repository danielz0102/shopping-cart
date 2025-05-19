import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { useProducts } from '@/hooks/useProducts'
import Shop from '.'

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
  },
  {
    id: 2,
    title: 'Product 2',
  },
  {
    id: 3,
    title: 'Product 3',
  },
]

vi.mock('./components/Product', () => ({
  default: ({ product }) => <div data-testid={product.id}>{product.title}</div>,
}))

vi.mock('@/components/UI/Spinner', () => ({
  default: () => <div>Loading...</div>,
}))

vi.mock('@/hooks/useProducts')

test('renders all products', () => {
  vi.mocked(useProducts).mockReturnValue({
    products: mockProducts,
    loading: false,
    error: false,
  })

  render(<Shop />)
  expect(screen.getByTestId('1')).toBeInTheDocument()
  expect(screen.getByTestId('2')).toBeInTheDocument()
  expect(screen.getByTestId('3')).toBeInTheDocument()
})

test('renders loading state', () => {
  vi.mocked(useProducts).mockReturnValue({
    products: [],
    loading: true,
    error: false,
  })

  render(<Shop />)
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
})

test('renders error state', () => {
  vi.mocked(useProducts).mockReturnValue({
    products: [],
    loading: false,
    error: true,
  })

  render(<Shop />)
  expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
})
