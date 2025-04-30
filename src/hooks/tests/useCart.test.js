import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useCart } from '../useCart'
import mockCart from '/tests/mocks/cart'

const mockProduct = {
  id: 4,
  title: 'Product 4',
  description: 'Description 4',
  image: 'https://example.com/image5.jpg',
  price: 40,
}

describe('initialCart prop', () => {
  it('throws an error if is not an array of items', () => {
    expect(() => renderHook(() => useCart([{}]))).toThrow()
    expect(() => renderHook(() => useCart([1, 2, 3]))).toThrow()
    expect(() => renderHook(() => useCart(mockCart))).not.toThrow()
  })

  it('initializes the cart with the array passed', () => {
    const { result } = renderHook(() => useCart(mockCart))
    expect(result.current.cart).toEqual(mockCart)
  })

  it('initializes the cart with an empty array if is not passed', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.cart).toEqual([])
  })
})

describe('add', () => {
  it('throws an error if product prop is not a product', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { add } = result.current.utils

    expect(() => add()).toThrow()
    expect(() => add({})).toThrow()
    expect(() => add(123)).toThrow()
    expect(() => add('123')).toThrow()
  })

  it('throws an error if quantity is not a number great than 1', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { add } = result.current.utils
    const { id } = result.current.cart[0]

    expect(() => add(id, '123')).toThrow()
    expect(() => add(id, {})).toThrow()
  })

  it('throws an error if the product found does not match', () => {
    const invalidProduct = { ...mockProduct, title: 'Fake Product' }
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 1 }]),
    )
    const { add } = result.current.utils

    expect(() => add(invalidProduct)).toThrow()
  })

  it('adds a product to the cart', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { add } = result.current.utils

    act(() => add(mockProduct))

    expect(result.current.cart).toEqual([
      ...mockCart,
      { product: mockProduct, quantity: 1 },
    ])
  })

  it('adds a product to the cart with a quantity greater than 1', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { add } = result.current.utils

    act(() => add(mockProduct, 5))

    expect(result.current.cart).toEqual([
      ...mockCart,
      { product: mockProduct, quantity: 5 },
    ])
  })

  it('increases the product if it already exists', () => {
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 1 }]),
    )
    const { add } = result.current.utils

    act(() => add(mockProduct))

    const { quantity } = result.current.cart[0]
    expect(quantity).toBe(2)
  })
})

describe('remove', () => {
  it('throws an error if id prop is not a number greater than 0', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { remove } = result.current.utils

    expect(() => remove()).toThrow()
    expect(() => remove(-5)).toThrow()
    expect(() => remove({})).toThrow()
    expect(() => remove('123')).toThrow()
  })

  it('removes a product from the cart', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { remove } = result.current.utils
    const { id } = result.current.cart[0].product

    act(() => remove(id))

    expect(result.current.cart).toEqual(mockCart.slice(1))
  })
})

describe('increase', () => {
  it('throws an error if id prop is not a number', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils

    expect(() => increase()).toThrow()
    expect(() => increase({})).toThrow()
    expect(() => increase('123')).toThrow()
  })

  it('throws an error if quantity is not a number', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const { id } = result.current.cart[0].product

    expect(() => increase(id, '123')).toThrow()
    expect(() => increase(id, {})).toThrow()
  })

  it('increases the quantity of a product by 1 by default', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const { quantity: initialQuantity } = result.current.cart[0]
    const { id } = result.current.cart[0].product

    act(() => increase(id))

    expect(result.current.cart[0].quantity).toBe(initialQuantity + 1)
  })

  it('increases the quantity of a product by the specified amount', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const { quantity: initialQuantity } = result.current.cart[0]
    const { id } = result.current.cart[0].product

    act(() => increase(id, 3))

    expect(result.current.cart[0].quantity).toBe(initialQuantity + 3)
  })

  it('does nothing if the product is not found', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const invalidId = 999

    act(() => increase(invalidId))

    expect(result.current.cart).toEqual(mockCart)
  })
})

describe('decrease', () => {
  it('throws an error if id prop is not a number greater than 0', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { decrease } = result.current.utils

    expect(() => decrease()).toThrow()
    expect(() => decrease({})).toThrow()
    expect(() => decrease('123')).toThrow()
  })

  it('throw an error if quantity is not a number greater than 0', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    expect(() => decrease(id, '123')).toThrow()
    expect(() => decrease(id, {})).toThrow()
  })

  it('decreases the quantity of a product on 1 by default', () => {
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 5 }]),
    )
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0].product

    act(() => decrease(id))

    expect(result.current.cart[0].quantity).toBe(4)
  })

  it('removes the product if the quantity reaches 0', () => {
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 1 }]),
    )
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0].product

    act(() => decrease(id))

    expect(result.current.cart).toEqual([])
  })

  it('decreases the quantity of a product by the specified amount', () => {
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 5 }]),
    )
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0].product

    act(() => decrease(id, 3))

    expect(result.current.cart[0].quantity).toBe(2)
  })

  it('removes the product if quantity prop is greater than quantity in the cart', () => {
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 5 }]),
    )
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0].product

    act(() => decrease(id, 999))

    expect(result.current.cart).toEqual([])
  })

  it('removes the product if quantity prop is equal than quantity in the cart', () => {
    const { result } = renderHook(() =>
      useCart([{ product: mockProduct, quantity: 5 }]),
    )
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0].product

    act(() => decrease(id, 5))

    expect(result.current.cart).toEqual([])
  })
})

describe('clear', () => {
  it('removes all products', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { clear } = result.current.utils

    act(() => clear())

    expect(result.current.cart).toEqual([])
  })
})

describe('getTotal', () => {
  it('returns the total price of the cart', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { getTotal } = result.current.utils

    const expectedTotal = mockCart.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0,
    )

    expect(getTotal()).toBe(expectedTotal)
  })
})
