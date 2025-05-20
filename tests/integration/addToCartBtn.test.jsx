import { test } from 'vitest'
import { render, screen, getByRole, getAllByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Product from '@/pages/Shop/components/Product'
import Cart from '@/components/Navbar/components/Cart'
import CartProvider from '@/providers/CartProvider'
import { expect } from 'vitest'

const mockProduct = {
  id: 99,
  title: 'Test Product',
  description: 'This is a test product',
  image: 'https://example.com/test-image.jpg',
  price: 99.99,
}

test('can add a product to the cart', async () => {
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

test('can increase the quantity of an item already included', async () => {
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
  await user.click(incrementBtn)
  await user.click(incrementBtn)
  await user.click(incrementBtn)
  await user.click(addToCartBtn)
  await user.click(screen.getByRole('button', { name: /cart.*5/i }))

  expect(
    screen.getByRole('spinbutton', { name: /item quantity/i }),
  ).toHaveValue(5)
})

test('can add an item with an initial quantity greater than 1', async () => {
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
