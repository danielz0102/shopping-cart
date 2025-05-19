import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import CartItem from '.'
import CartProvider from '@/providers/CartProvider'

const mockItem = {
  product: {
    id: 1,
    title: 'Product Title',
    description: 'Product Description',
    price: 100,
    image: 'https://example.com/image.jpg',
  },
  quantity: 2,
}

vi.mock('@/components/UI/Counter', () => ({
  default: (props) => <div data-testid="counter">{JSON.stringify(props)}</div>,
}))

test('throws an error if id prop is not an integer greater than 0', () => {
  expect(() => renderItem({})).toThrow()
  expect(() => renderItem(-123)).toThrow()
  expect(() => renderItem('lorem ipsum')).toThrow()
  expect(() => renderItem()).toThrow()
})

test('returns null if item is not found', () => {
  const { container } = renderItem(999)
  expect(container).toBeEmptyDOMElement()
})

test('renders all item info', () => {
  renderItem(mockItem.product.id)
  const finalPrice = mockItem.product.price * mockItem.quantity

  screen.getByText(mockItem.product.title)
  screen.getByRole('img', { name: mockItem.product.title })
  screen.getByText(`$${finalPrice.toFixed(2)}`)
  screen.getByText(new RegExp(`quantity.*${mockItem.quantity}`, 'i'))
})

test('renders Counter properly', () => {
  renderItem(mockItem.product.id)

  expect(screen.getByTestId('counter')).toHaveTextContent(
    JSON.stringify({
      label: 'Item quantity',
      initialCount: mockItem.quantity,
      min: 0,
    }),
  )
})

function renderItem(id, cart = [mockItem]) {
  return render(
    <CartProvider initialCart={cart}>
      <CartItem id={id} />
    </CartProvider>,
  )
}
