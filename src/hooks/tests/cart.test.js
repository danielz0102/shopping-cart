import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useCart } from '../cart'
import mockCart from '/tests/mocks/cart'

describe('initialProducts prop', () => {
  it('throws an error if is not an array', () => {
    expect(() => renderHook(() => useCart({}))).toThrow()
    expect(() => renderHook(() => useCart(123))).toThrow()
    expect(() => renderHook(() => useCart('123'))).toThrow()
  })

  it('throws an error if is not an array of products', () => {
    expect(() => renderHook(() => useCart([{}]))).toThrow()
    expect(() => renderHook(() => useCart([{ id: 1 }]))).toThrow()
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

  it('adds a product to the cart', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { add } = result.current.utils
    const newProduct = {
      id: 4,
      title: 'Product 4',
      description: 'Description 4',
      image: 'https://example.com/image5.jpg',
      price: 40,
      quantity: 1,
    }

    act(() => add(newProduct))

    expect(result.current.cart).toEqual([...mockCart, newProduct])
  })

  it('throws an error if the product already exists', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { add } = result.current.utils
    const existingProduct = result.current.cart[0]

    expect(() => add(existingProduct)).toThrow()
  })
})

describe('remove', () => {
  it('throws an error if id prop is not a number', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { remove } = result.current.utils

    expect(() => remove()).toThrow()
    expect(() => remove({})).toThrow()
    expect(() => remove('123')).toThrow()
  })

  it('removes a product from the cart', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { remove } = result.current.utils
    const { id } = result.current.cart[0]

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

  it('throw an error if quantity is not a number', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const { id } = result.current.cart[0]

    expect(() => increase(id, '123')).toThrow()
    expect(() => increase(id, {})).toThrow()
  })

  it('increases the quantity of a product by 1 by default', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const { id, quantity: initialQuantity } = result.current.cart[0]

    act(() => {
      increase(id)
    })

    expect(result.current.cart[0].quantity).toBe(initialQuantity + 1)
  })

  it('increases the quantity of a product by the specified amount', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { increase } = result.current.utils
    const { id, quantity: initialQuantity } = result.current.cart[0]

    act(() => {
      increase(id, 3)
    })

    expect(result.current.cart[0].quantity).toBe(initialQuantity + 3)
  })
})

describe('decrease', () => {
  it('throws an error if id prop is not a number', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { decrease } = result.current.utils

    expect(() => decrease()).toThrow()
    expect(() => decrease({})).toThrow()
    expect(() => decrease('123')).toThrow()
  })

  it('throw an error if quantity is not a number', () => {
    const { result } = renderHook(() => useCart(mockCart))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    expect(() => decrease(id, '123')).toThrow()
    expect(() => decrease(id, {})).toThrow()
  })

  it('decreases the quantity of a product', () => {
    const productToDecrease = {
      id: 1,
      title: 'Product 1',
      image: 'https://example.com/image1.jpg',
      price: 10,
      quantity: 5,
    }
    const { result } = renderHook(() => useCart([productToDecrease]))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    act(() => {
      decrease(id)
    })

    expect(result.current.cart[0].quantity).toBe(4)
  })

  it('removes the product if the quantity reaches 0', () => {
    const productToDecrease = {
      id: 1,
      title: 'Product 1',
      image: 'https://example.com/image1.jpg',
      price: 10,
      quantity: 1,
    }
    const { result } = renderHook(() => useCart([productToDecrease]))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    act(() => {
      decrease(id)
    })

    expect(result.current.cart).toEqual([])
  })

  it('decreases the quantity of a product by the specified amount', () => {
    const productToDecrease = {
      id: 1,
      title: 'Product 1',
      image: 'https://example.com/image1.jpg',
      price: 10,
      quantity: 5,
    }
    const { result } = renderHook(() => useCart([productToDecrease]))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    act(() => {
      decrease(id, 3)
    })

    expect(result.current.cart[0].quantity).toBe(2)
  })

  it('removes the product if the quantity prop is greater than the quantity in the cart', () => {
    const productToDecrease = {
      id: 1,
      title: 'Product 1',
      image: 'https://example.com/image1.jpg',
      price: 10,
      quantity: 5,
    }
    const { result } = renderHook(() => useCart([productToDecrease]))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    act(() => {
      decrease(id, 999)
    })

    expect(result.current.cart).toEqual([])
  })

  it('removes the product if the quantity prop is equal than the quantity in the cart', () => {
    const productToDecrease = {
      id: 1,
      title: 'Product 1',
      image: 'https://example.com/image1.jpg',
      price: 10,
      quantity: 5,
    }
    const { result } = renderHook(() => useCart([productToDecrease]))
    const { decrease } = result.current.utils
    const { id } = result.current.cart[0]

    act(() => {
      decrease(id, 5)
    })

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
