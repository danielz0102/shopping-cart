import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Product from '.'

const mockProduct = {
  image: 'https://example.com/image.jpg',
  title: 'Test Product',
  description: 'This is a test product.',
  price: 19.99,
}

test('returns null if product is empty', () => {
  render(<Product product={{}} />)
  expect(screen.queryByRole('img')).toBeNull()
})

test('renders product info', () => {
  render(<Product product={mockProduct} />)

  expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    mockProduct.title,
  )
  expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument()
})

test('calls addToCart when button is clicked', async () => {
  const user = userEvent.setup()
  const addToCart = vi.fn()

  render(<Product product={mockProduct} addToCart={addToCart} />)

  const button = screen.getByRole('button', { name: /add to cart/i })
  await user.click(button)

  expect(addToCart).toHaveBeenCalled()
})

test('handles the quantity of the item', async () => {
  const user = userEvent.setup()
  render(<Product product={mockProduct} />)

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
  render(<Product product={mockProduct} />)

  const quantity = screen.getByRole('spinbutton')
  expect(quantity).toHaveValue(1)

  const decrementBtn = screen.getByRole('button', { name: /decrement/i })
  await user.click(decrementBtn)
  await user.click(decrementBtn)

  expect(quantity).toHaveValue(1)
})

test('changes the quantity by user input', async () => {
  const user = userEvent.setup()
  render(<Product product={mockProduct} />)

  const quantity = screen.getByRole('spinbutton')

  expect(quantity).toHaveValue(1)

  await user.type(quantity, '5')

  expect(quantity).toHaveValue(15)
})

test('does not allow negative quantity input', async () => {
  const user = userEvent.setup()
  render(<Product product={mockProduct} />)

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
  render(<Product product={mockProduct} />)

  const quantity = screen.getByRole('spinbutton')

  expect(quantity).toHaveValue(1)

  await user.type(quantity, '500')

  expect(quantity).toHaveValue(1500)

  await user.type(quantity, 'abc')

  expect(quantity).toHaveValue(1500)
})

test('resets quantity to 1 on invalid input characters', async () => {
  const user = userEvent.setup()
  render(<Product product={mockProduct} />)

  const quantity = screen.getByRole('spinbutton')
  await user.type(quantity, '5')

  expect(quantity).toHaveValue(15)

  await user.type(quantity, 'e+-')
  // Resets on blur
  await user.click(document.body)

  expect(quantity).toHaveValue(1)
})

test('has aria-live attribute for quantity', () => {
  render(<Product product={mockProduct} />)

  const quantity = screen.getByRole('spinbutton')

  expect(quantity).toHaveAttribute('aria-live', 'polite')
})
