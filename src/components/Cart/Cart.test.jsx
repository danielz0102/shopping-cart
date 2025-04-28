import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cart from '.'

const mockProducts = [
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

test('throws an error if initialProducts is not an array', () => {
  expect(() =>
    render(<Cart initialProducts={{}} onCheckout={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<Cart initialProducts={'{}'} onCheckout={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<Cart initialProducts={''} onCheckout={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<Cart initialProducts={123} onCheckout={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<Cart initialProducts={0} onCheckout={() => {}} />),
  ).toThrow()
})

test('throws an error if initialProducts is not an array of products', () => {
  expect(() =>
    render(<Cart initialProducts={[1, 2, 3]} onCheckout={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<Cart initialProducts={[{}]} onCheckout={() => {}} />),
  ).toThrow()
  expect(() =>
    render(
      <Cart initialProducts={[{ title: 'title' }]} onCheckout={() => {}} />,
    ),
  ).toThrow()
})

test('throws an error if onCheckout function is not passed', () => {
  expect(() => render(<Cart initialProducts={mockProducts} />)).toThrow()
})

test('displays 0 when no products are passed', () => {
  const badCarts = [
    <Cart onCheckout={() => {}} />,
    <Cart initialProducts={[]} onCheckout={() => {}} />,
  ]
  render(badCarts)

  const buttons = screen.getAllByText(0)

  expect(buttons).toHaveLength(badCarts.length)
})

test('still displays the cart when no products are passed', () => {
  render(<Cart onCheckout={() => {}} />)
  screen.getByRole('button')
})

test('must be a button', () => {
  render(<Cart initialProducts={[]} onCheckout={() => {}} />)
  screen.getByRole('button', { name: /cart/i })
})

test('displays the quantity of items passed', () => {
  render(<Cart initialProducts={mockProducts} onCheckout={() => {}} />)
  screen.getByRole('button', {
    name: new RegExp(`cart.*${mockProducts.length}`, 'i'),
  })
})

test('displays items within sidebar when is clicked', async () => {
  const user = userEvent.setup()
  render(<Cart initialProducts={mockProducts} onCheckout={() => {}} />)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByRole('dialog')
  getProductsElements()
})

test('does not display any items if no products are passed', async () => {
  const user = userEvent.setup()
  render(<Cart onCheckout={() => {}} />)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  screen.getByText(/car.*empty/i)
  expect(screen.queryByText(/product/i)).not.toBeInTheDocument()
})

test('hides items and sidebar when is clicked again', async () => {
  const user = userEvent.setup()
  render(<Cart initialProducts={mockProducts} onCheckout={() => {}} />)
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
  const mockProduct = {
    id: 1,
    title: 'Product 1',
    image: 'https://example.com/image1.jpg',
    price: 10,
    quantity: 3,
  }
  const user = userEvent.setup()
  render(<Cart initialProducts={[mockProduct]} onCheckout={() => {}} />)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)
  const increaseBtn = screen.getByRole('button', { name: /increase/i })
  const decreaseBtn = screen.getByRole('button', { name: /decrease/i })
  const quantity = screen.getByText(/quantity/i)

  await user.click(increaseBtn)
  expect(quantity).toHaveTextContent(`${mockProduct.quantity + 1}`, {
    exact: false,
  })

  await user.click(decreaseBtn)
  await user.click(decreaseBtn)
  expect(quantity).toHaveTextContent(`${mockProduct.quantity - 1}`, {
    exact: false,
  })
})

test('removes product if quantity drops below 1', async () => {
  const mockProduct = {
    id: 1,
    title: 'Product 1',
    image: 'https://example.com/image1.jpg',
    price: 10,
    quantity: 1,
  }
  const user = userEvent.setup()
  render(<Cart initialProducts={[mockProduct]} onCheckout={() => {}} />)
  const button = screen.getByRole('button', { name: /cart/i })
  await user.click(button)
  const decreaseBtn = screen.getByRole('button', { name: /decrease/i })

  await user.click(decreaseBtn)

  expect(screen.queryByText(mockProduct.title)).not.toBeInTheDocument()
})

test('must have a checkout button', async () => {
  const user = userEvent.setup()
  const handleCheckout = vi.fn()
  render(<Cart initialProducts={mockProducts} onCheckout={handleCheckout} />)
  const button = screen.getByRole('button', { name: /cart/i })

  await user.click(button)

  const checkoutBtn = screen.getByRole('button', { name: /checkout/i })

  await user.click(checkoutBtn)

  expect(handleCheckout).toHaveBeenCalled()
})

function getProductsElements() {
  return mockProducts.map((product) => ({
    title: screen.getByText(product.title),
    price: screen.getByText(`$${product.price}`),
    image: screen.getByRole('img', { name: product.title }),
    quantity: screen.getByText(`Quantity: ${product.quantity}`),
  }))
}
