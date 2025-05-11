import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import Product from '.'
import { CartContext } from '@/providers/contexts'

const mockProduct = {
  id: 1,
  image: 'https://example.com/image.jpg',
  title: 'Test Product',
  description: 'This is a test product.',
  price: 19.99,
}

vi.mock('./components/ProductQuantity', () => ({
  default: (props) => <div data-testid="counter">{JSON.stringify(props)}</div>,
}))

test('throws an error if product is not correct or is not provided', () => {
  expect(() => renderProduct(123)).toThrow()
  expect(() => renderProduct('{}')).toThrow()
  expect(() => renderProduct({})).toThrow()
  expect(() => renderProduct([])).toThrow()
  expect(() => renderProduct(0)).toThrow()
  expect(() => renderProduct()).toThrow()
})

test('renders product info', () => {
  renderProduct(mockProduct)

  expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    mockProduct.title,
  )
  expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument()
})

test('has a button to add product to cart', () => {
  renderProduct(mockProduct)
  screen.getByRole('button', { name: /add to cart/i })
})

test('renders Counter properly', () => {
  renderProduct(mockProduct)

  expect(screen.getByTestId('counter')).toHaveTextContent(
    JSON.stringify({
      label: 'Product quantity',
      initialCount: 1,
      min: 1,
    }),
  )
})

function renderProduct(product) {
  render(
    <CartContext.Provider value={{}}>
      <Product product={product} />
    </CartContext.Provider>,
  )
}
