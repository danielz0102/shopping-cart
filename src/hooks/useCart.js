import { useState } from 'react'
import { validateCart } from '@/schemas/cart'
import { validateProduct } from '@/schemas/product'
import { validateQuantity } from '../schemas/quantity'

export function useCart(initialProducts = []) {
  const [cart, setCart] = useState(initialProducts)

  const cartValidation = validateCart(cart)
  if (!cartValidation.success) {
    throw new Error(cartValidation.error)
  }

  function add(newProduct) {
    const productValidation = validateProduct(newProduct)
    if (!productValidation.success) {
      throw new Error(productValidation.error)
    }

    const exists = cart.find((item) => item.id === newProduct.id)

    if (exists) {
      throw new Error('The product already exists in the cart')
    }

    setCart((prevCart) => [...prevCart, newProduct])
  }

  function remove(id) {
    if (typeof id !== 'number') {
      throw new Error('The id must be a number')
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  function increase(id, quantity = 1) {
    const quantityValidation = validateQuantity(quantity)

    if (!quantityValidation.success) {
      throw new Error(quantityValidation.error)
    }

    if (typeof id !== 'number') {
      throw new Error('The id must be a number')
    }

    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + quantity }
          : product,
      ),
    )
  }

  function decrease(id, quantity = 1) {
    const quantityValidation = validateQuantity(quantity)

    if (!quantityValidation.success) {
      throw new Error(quantityValidation.error)
    }

    if (typeof id !== 'number') {
      throw new Error('The id must be a number')
    }

    setCart((prevCart) => {
      const product = prevCart.find((product) => product.id === id)

      if (!product) return prevCart

      if (product.quantity <= 1 || quantity >= product.quantity) {
        return prevCart.filter((product) => product.id !== id)
      }

      return prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - quantity }
          : product,
      )
    })
  }

  function clear() {
    setCart([])
  }

  return { cart, setCart, utils: { add, remove, increase, decrease, clear } }
}
