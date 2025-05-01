import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '@/providers/contexts'
import CartItem from '../CartItem'

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const { cart, utils } = useContext(CartContext)

  if (!isOpen) return null

  const isEmpty = cart.length === 0
  const total = utils.getTotal()

  function close() {
    setIsOpen(false)
  }

  return (
    <aside>
      <h2>{isEmpty ? 'The cart is empty' : 'Your products'}</h2>
      <button aria-label="Close" onClick={close}>
        x
      </button>
      <ul>
        {cart?.map(({ product }) => (
          <CartItem key={product.id} id={product.id} />
        ))}
      </ul>
      {!isEmpty && (
        <>
          <p>Total: ${total.toFixed(2)}</p>
          <Link to="/checkout" onClick={close}>
            Checkout
          </Link>
          <button onClick={utils.clear}>Clear</button>
        </>
      )}
    </aside>
  )
}
