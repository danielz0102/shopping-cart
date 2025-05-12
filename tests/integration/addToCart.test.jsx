import { test } from 'vitest'
import { render, screen, getByRole, getAllByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Product from '@/components/Product'
import Cart from '@/components/Cart'
import CartProvider from '@/providers/CartProvider'
import { expect } from 'vitest'

const mockProduct = {
  id: 99,
  title: 'Test Product',
  description: 'This is a test product',
  image: 'https://example.com/test-image.jpg',
  price: 99.99,
}

test('adds product to cart when Add to Cart button is clicked', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <CartProvider>
        <Product product={mockProduct} />
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
  screen.getByRole('button', { name: /cart.*0/i })

  await user.click(screen.getByRole('button', { name: /add to cart/i }))
  await user.click(screen.getByRole('button', { name: /cart.*1/i }))
  const sidebar = screen.getByRole('complementary')

  getByRole(sidebar, 'heading', { name: mockProduct.title })
  getAllByText(sidebar, new RegExp(`${mockProduct.price}`, 'i'))
  getByRole(sidebar, 'img', { name: mockProduct.title })
  expect(
    screen.getByRole('spinbutton', { name: /item quantity/i }),
  ).toHaveValue(1)
})

test('increases the quantity of a item if it is already in the cart', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <CartProvider>
        <Product product={mockProduct} />
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
  const addToCartBtn = screen.getByRole('button', { name: /add to cart/i })
  await user.click(addToCartBtn)
  await user.click(screen.getByRole('button', { name: /cart.*1/i }))
  const quantityInput = screen.getByRole('spinbutton', {
    name: /item quantity/i,
  })

  expect(quantityInput).toHaveValue(1)
  await user.click(addToCartBtn)
  expect(quantityInput).toHaveValue(2)
})

test('can increase the quantity of a item by the increment button', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <CartProvider>
        <Product product={mockProduct} />
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
  const addToCartBtn = screen.getByRole('button', { name: /add to cart/i })
  const incrementBtn = screen.getByRole('button', { name: /increment/i })
  await user.click(addToCartBtn)
  await user.click(screen.getByRole('button', { name: /cart.*1/i }))

  await user.click(incrementBtn)
  await user.click(incrementBtn)
  await user.click(incrementBtn)
  await user.click(addToCartBtn)

  expect(
    screen.getByRole('spinbutton', { name: /item quantity/i }),
  ).toHaveValue(5)
})

test('adds an item with a initial quantity that can be greater than 1', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <CartProvider>
        <Product product={mockProduct} />
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
  const addToCartBtn = screen.getByRole('button', { name: /add to cart/i })
  const incrementBtn = screen.getByRole('button', { name: /increment/i })

  await user.click(incrementBtn)
  await user.click(incrementBtn)
  await user.click(incrementBtn)
  await user.click(addToCartBtn)
  await user.click(screen.getByRole('button', { name: /cart.*4/i }))

  expect(
    screen.getByRole('spinbutton', { name: /item quantity/i }),
  ).toHaveValue(4)
})
