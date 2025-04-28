import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Cart from '.'
import { CartContext } from '@/contexts'

const mockCart = [
  {
    id: 1,
    title: 'Product 1',
    image: 'https://example.com/image1.jpg',
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    title: 'Product 2',
    image: 'https://example.com/image2.jpg',
    price: 20,
    quantity: 2,
  },
  {
    id: 3,
    title: 'Product 3',
    image: 'https://example.com/image3.jpg',
    price: 30,
    quantity: 3,
  },
]

test('displays 0 if there are no products', () => {
  renderCart({ cart: [], utils: {} })
  screen.getByText(0)
})

test('must be a button', () => {
  renderCart({ cart: [], utils: {} })
  screen.getByRole('button', { name: /cart/i })
})

test('displays the quantity of items passed', () => {
  renderCart({ cart: mockCart, utils: {} })
  screen.getByRole('button', {
    name: new RegExp(`cart.*${mockCart.length}`, 'i'),
  })
})

test('displays items within sidebar when is clicked', async () => {
  const user = userEvent.setup()
  renderCart({ cart: mockCart, utils: {} })
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByRole('dialog')
  getProductsElements()
})

test('does not display any items if no products are passed', async () => {
  const user = userEvent.setup()
  renderCart({ cart: [], utils: {} })
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByText(/car.*empty/i)
  expect(screen.queryByText(/product/i)).not.toBeInTheDocument()
})

test('hides items and sidebar when is clicked again', async () => {
  const user = userEvent.setup()
  renderCart({ cart: mockCart, utils: {} })
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
  const increase = vi.fn()
  const decrease = vi.fn()
  const user = userEvent.setup()
  renderCart({ cart: [mockCart[0]], utils: { increase, decrease } })
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)
  const increaseBtn = screen.getByRole('button', { name: /increase/i })
  const decreaseBtn = screen.getByRole('button', { name: /decrease/i })

  await user.click(increaseBtn)
  expect(increase).toHaveBeenCalledWith(mockCart[0].id)

  await user.click(decreaseBtn)
  expect(decrease).toHaveBeenCalledWith(mockCart[0].id)
})

test('has a button to remove the product', async () => {
  const remove = vi.fn()
  const user = userEvent.setup()
  renderCart({ cart: [mockCart[0]], utils: { remove } })
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)
  const removeBtn = screen.getByRole('button', { name: /remove/i })

  await user.click(removeBtn)
  expect(remove).toHaveBeenCalledWith(mockCart[0].id)
})

test('must show a link to checkout', async () => {
  const user = userEvent.setup()
  renderCart({ cart: mockCart, utils: {} })
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByRole('link', { name: /checkout/i })
})

function getProductsElements() {
  return mockCart.map((product) => ({
    title: screen.getByText(product.title),
    price: screen.getByText(`$${product.price}`),
    image: screen.getByRole('img', { name: product.title }),
    quantity: screen.getByText(`Quantity: ${product.quantity}`),
  }))
}

function renderCart(value) {
  render(
    <MemoryRouter>
      <CartContext.Provider value={value}>
        <Cart />
      </CartContext.Provider>
    </MemoryRouter>,
  )
}
