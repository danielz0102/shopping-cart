import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Product from '.'
import { CartContext } from '@/providers/contexts'

const mockProduct = {
  id: 1,
  image: 'https://example.com/image.jpg',
  title: 'Test Product',
  description: 'This is a test product.',
  price: 19.99,
}

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

test('handles the quantity of the item', async () => {
  const user = userEvent.setup()
  renderProduct(mockProduct)

  const quantity = screen.getByRole('spinbutton')
  expect(quantity).toHaveValue(1)

  const incrementBtn = screen.getByRole('button', { name: /increment/i })
  await user.click(incrementBtn)
  await user.click(incrementBtn)

  expect(quantity).toHaveValue(3)

  const decrementBtn = screen.getByRole('button', { name: /decrement/i })
  await user.click(decrementBtn)

  expect(quantity).toHaveValue(2)
})

test('does not decrement quantity below 1', async () => {
  const user = userEvent.setup()
  renderProduct(mockProduct)

  const quantity = screen.getByRole('spinbutton')
  expect(quantity).toHaveValue(1)

  const decrementBtn = screen.getByRole('button', { name: /decrement/i })
  await user.click(decrementBtn)
  await user.click(decrementBtn)

  expect(quantity).toHaveValue(1)
})

test('changes the quantity by user input', async () => {
  const user = userEvent.setup()
  renderProduct(mockProduct)

  const quantity = screen.getByRole('spinbutton')

  expect(quantity).toHaveValue(1)

  await user.type(quantity, '5')

  expect(quantity).toHaveValue(15)
})

test('does not allow negative quantity input', async () => {
  const user = userEvent.setup()
  renderProduct(mockProduct)

  const quantity = screen.getByRole('spinbutton')

  expect(quantity).toHaveValue(1)

  //Select the input and moves to the beginning
  await user.click(quantity)
  await user.keyboard('{Home}')

  await user.type(quantity, '-')

  //The input should be validated on blur
  await user.click(document.body)

  expect(quantity).toHaveValue(1)
})

test('ignores non-numeric quantity inputs', async () => {
  const user = userEvent.setup()
  renderProduct(mockProduct)

  const quantity = screen.getByRole('spinbutton')

  expect(quantity).toHaveValue(1)

  await user.type(quantity, '500')

  expect(quantity).toHaveValue(1500)

  await user.type(quantity, 'abc')

  expect(quantity).toHaveValue(1500)
})

test('resets quantity to 1 on invalid input characters', async () => {
  const user = userEvent.setup()
  renderProduct(mockProduct)

  const quantity = screen.getByRole('spinbutton')
  await user.type(quantity, '5')

  expect(quantity).toHaveValue(15)

  await user.type(quantity, 'e+-')
  await user.click(document.body)

  expect(quantity).toHaveValue(1)
})

function renderProduct(product) {
  render(
    <CartContext.Provider value={{}}>
      <Product product={product} />
    </CartContext.Provider>,
  )
}
