import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Cart from '.'
import mockCart from '/tests/mocks/cart'
import CartProvider from '@/providers/CartProvider'

test('displays 0 if there are no products', () => {
  renderCart()
  screen.getByText(0)
})

test('must be a button', () => {
  renderCart()
  screen.getByRole('button', { name: /cart/i })
})

test('displays the quantity of items passed', () => {
  renderCart(mockCart)
  screen.getByRole('button', {
    name: new RegExp(`cart.*${mockCart.length}`, 'i'),
  })
})

test('displays items within sidebar when is clicked', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByRole('dialog')
  getProductsElements()
})

test('does not display any items if no products are passed', async () => {
  const user = userEvent.setup()
  renderCart()
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByText(/car.*empty/i)
  expect(screen.queryByText(/product/i)).not.toBeInTheDocument()
})

test('hides items and sidebar when is clicked again', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)
  const sidebar = screen.getByRole('dialog')
  const elements = getProductsElements()
  await user.click(button)

  expect(sidebar).not.toBeVisible()
  elements.forEach((product) => {
    Object.values(product).forEach((element) => {
      expect(element).not.toBeVisible()
    })
  })
})

test('must have buttons to increase and decrease quantity', async () => {
  const user = userEvent.setup()
  renderCart([mockCart[0]])
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)
  const increaseBtn = screen.getByRole('button', { name: /increase/i })
  const decreaseBtn = screen.getByRole('button', { name: /decrease/i })
  const quantity = screen.getByText(/quantity/i)

  await user.click(increaseBtn)
  expect(quantity).toHaveTextContent(/quantity.*2/i)

  await user.click(decreaseBtn)
  expect(quantity).toHaveTextContent(/quantity.*1/i)
})

test('has a button to remove the product', async () => {
  const user = userEvent.setup()
  renderCart([mockCart[0]])
  const button = screen.getByRole('button', { name: /cart/i })
  await user.click(button)
  const removeBtn = screen.getByRole('button', { name: /remove/i })
  const title = screen.getByRole('heading', { name: mockCart[0].title })

  await user.click(removeBtn)

  expect(title).not.toBeVisible()
})

test('has a button to remove all products', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })
  await user.click(button)
  const titles = mockCart.map((product) =>
    screen.getByRole('heading', { name: product.title }),
  )
  const clearBtn = screen.getByRole('button', { name: /clear/i })

  await user.click(clearBtn)

  titles.forEach((title) => {
    expect(title).not.toBeVisible()
  })
})

test('must show a link to checkout', async () => {
  const user = userEvent.setup()
  renderCart(mockCart)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByRole('link', { name: /checkout/i })
})

test('must not show a link to checkout if no products are passed', async () => {
  const user = userEvent.setup()
  renderCart()
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  expect(
    screen.queryByRole('link', { name: /checkout/i }),
  ).not.toBeInTheDocument()
})

function getProductsElements() {
  return mockCart.map((product) => ({
    title: screen.getByText(product.title),
    price: screen.getByText(`$${product.price}`),
    image: screen.getByRole('img', { name: product.title }),
    quantity: screen.getByText(`Quantity: ${product.quantity}`),
  }))
}

function renderCart(products = []) {
  render(
    <MemoryRouter>
      <CartProvider initialProducts={products}>
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  )
}
