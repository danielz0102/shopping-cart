import z from 'zod'
import { useState, useRef } from 'react'

const cartProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().url(),
  price: z.number(),
  quantity: z.number(),
})
const cartSchema = z.array(cartProductSchema).optional()
const checkoutSchema = z.function()

export default function Cart({ initialProducts, onCheckout }) {
  const [cart, setCart] = useState(initialProducts)
  const sidebar = useRef(null)

  const productsAreValid = cartSchema.safeParse(initialProducts)
  const checkoutIsValid = checkoutSchema.safeParse(onCheckout)
  const quantity = cart ? cart.length : 0

  if (!productsAreValid.success) {
    throw new Error('products must be an array of products')
  }

  if (!checkoutIsValid.success) {
    throw new Error('onCheckout must be a function')
  }

  function handleCartClick() {
    if (sidebar.current.open) {
      sidebar.current.close()
      return
    }

    sidebar.current.show()
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

  return (
    <>
      <button
        aria-label={`Cart with ${quantity} items`}
        onClick={handleCartClick}
      >
        <span>{quantity}</span>
      </button>
      <dialog ref={sidebar}>
        <h2>{quantity > 0 ? 'Your products' : 'The car is empty'}</h2>
        <ul>
          {cart?.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div>
                <button
                  aria-label="Increase"
                  onClick={() => increase(product.id)}
                >
                  +
                </button>
                <button
                  aria-label="Decrease"
                  onClick={() => decrease(product.id)}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onCheckout}>Checkout</button>
      </dialog>
    </>
  )
}
