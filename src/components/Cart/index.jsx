import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import CartItem from '../CartItem'
import { CartContext } from '@/providers/contexts'

export default function Cart() {
  const { cart, utils } = useContext(CartContext)
  const sidebar = useRef(null)

  const quantity = cart.length

  function handleCartClick() {
    if (sidebar.current.open) {
      sidebar.current.close()
      return
    }

    sidebar.current.show()
  }

  function closeSidebar() {
    sidebar.current.close()
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
        <button aria-label="Close" onClick={closeSidebar}>
          x
        </button>
        <h2>{quantity > 0 ? 'Your products' : 'The car is empty'}</h2>
        <ul>
          {cart?.map(({ product }) => (
            <CartItem key={product.id} id={product.id} />
          ))}
        </ul>
        {quantity > 0 && (
          <Link to="/checkout" onClick={closeSidebar}>
            Checkout
          </Link>
        )}
        <button onClick={utils.clear}>Clear</button>
      </dialog>
    </>
  )
}
