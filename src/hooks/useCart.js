import { useState } from 'react'
import { validateProduct } from '@/schemas/product'
import { validateCart } from '@/schemas/cart'
import { validatePositiveInteger } from '@/schemas/positiveInteger'

export function useCart(initialCart = []) {
  const [cart, setCart] = useState(initialCart)

  validateCart(initialCart)

  function add(newProduct, quantity = 1) {
    validateProduct(newProduct)

    const currentItem = cart.find((item) => item.product.id === newProduct.id)
    const isTheSame =
      JSON.stringify(currentItem?.product) === JSON.stringify(newProduct)

    if (currentItem && isTheSame) {
      increase(newProduct.id, quantity)
      return
    } else if (currentItem) {
      throw new Error(
        'The product is already in the cart but has different properties',
      )
    }

    setCart((prevCart) => [...prevCart, { product: newProduct, quantity }])
  }

  function remove(id) {
    validatePositiveInteger(id)

    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id))
  }

  function increase(id, quantity = 1) {
    validatePositiveInteger(quantity)
    validatePositiveInteger(id)

    setCart((prevCart) =>
      prevCart.map((item) => {
        return item.product.id === id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      }),
    )
  }

  function decrease(id, quantity = 1) {
    validatePositiveInteger(quantity)
    validatePositiveInteger(id)

    setCart((prevCart) => {
      const item = prevCart.find((item) => item.product.id === id)

      if (!item) return prevCart

      if (quantity >= item.quantity) {
        return prevCart.filter((item) => item.product.id !== id)
      }

      return prevCart.map((item) => {
        return item.product.id === id
          ? { ...item, quantity: item.quantity - quantity }
          : item
      })
    })
  }

  function clear() {
    setCart([])
  }

  return { cart, setCart, utils: { add, remove, increase, decrease, clear } }
}
