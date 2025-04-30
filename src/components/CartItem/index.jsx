import { useContext } from 'react'

import { CartContext } from '@/providers/contexts'
import { validatePositiveInteger } from '@/schemas/positiveInteger'

export default function CartItem({ id }) {
  const { cart, utils } = useContext(CartContext)

  validatePositiveInteger(id)
  const item = cart.find((item) => item.product.id === id)

  if (!item) return null

  const { product, quantity } = item

  return (
    <li>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p aria-live="polite">Quantity: {quantity}</p>
      <div>
        <button onClick={() => utils.remove(product.id)}>Remove</button>
        <button
          aria-label="Increase"
          onClick={() => utils.increase(product.id)}
        >
          +
        </button>
        <button
          aria-label="Decrease"
          onClick={() => utils.decrease(product.id)}
        >
          -
        </button>
      </div>
    </li>
  )
}
