import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

  screen.getByText(mockItem.product.title)
  screen.getByRole('img', { name: mockItem.product.title })
  screen.getByText(`$${mockItem.product.price}`)
  screen.getByText(new RegExp(`quantity.*${mockItem.quantity}`, 'i'))
})

test('has a button to increase quantity', async () => {
  const user = userEvent.setup()
  renderItem(mockItem.product.id)

  await user.click(screen.getByRole('button', { name: /increase/i }))

  screen.getByText(new RegExp(`quantity.*${mockItem.quantity + 1}`, 'i'))
})

test('has a button to decrease quantity', async () => {
  const user = userEvent.setup()
  renderItem(mockItem.product.id)

  await user.click(screen.getByRole('button', { name: /decrease/i }))

  screen.getByText(new RegExp(`quantity.*${mockItem.quantity - 1}`, 'i'))
})

test('has a button to remove the product', async () => {
  const user = userEvent.setup()
  renderItem(mockItem.product.id)

  await user.click(screen.getByRole('button', { name: /remove/i }))

  expect(screen.queryByText(mockItem.product.title)).not.toBeInTheDocument()
})

function renderItem(id, cart = [mockItem]) {
  return render(
    <CartProvider initialCart={cart}>
      <CartItem id={id} />
    </CartProvider>,
  )
}
