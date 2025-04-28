import { useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  function add(product) {
    const productInCart = cart.find((item) => item.id === product.id)

    if (productInCart) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })

      setCart(newCart)
      return
    }

    setCart([...cart, { ...product, quantity: 1 }])
  }

  function remove(id) {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
  }

  function increase(id) {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 }
      }
      return product
    })

    setCart(newCart)
  }

  function decrease(id) {
    const product = cart.find((product) => product.id === id)

    if (product.quantity <= 1) {
      const newCart = cart.filter((product) => product.id !== id)
      setCart(newCart)
      return
    }

    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity - 1 }
      }
      return product
    })

    setCart(newCart)
  }

  return { cart, setCart, utils: { add, remove, increase, decrease } }
}
