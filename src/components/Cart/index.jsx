import { useState, useContext } from 'react'
import { ShoppingCart } from 'lucide-react'

import styles from './Cart.module.css'
import CartSidebar from '../CartSidebar'
import { CartContext } from '@/providers/contexts'

export default function Cart() {
  const [showSidebar, setShowSidebar] = useState(false)
  const { cart } = useContext(CartContext)

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  function handleCartClick() {
    setShowSidebar((prev) => !prev)
  }

  return (
    <>
      <button
        className={styles.cart}
        aria-label={`Cart with ${quantity} items`}
        onClick={handleCartClick}
      >
        <ShoppingCart strokeWidth={1} />
        <span className={styles.itemsCounter}>
          {quantity < 100 ? quantity : '+99'}
        </span>
      </button>
      {showSidebar && <CartSidebar />}
    </>
  )
}
