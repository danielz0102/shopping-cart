import { useState, useContext } from 'react'
import { ShoppingCart } from 'lucide-react'

import styles from './Cart.module.css'
import CartSidebar from '../CartSidebar'
import { CartContext } from '@/providers/contexts'

export default function Cart() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { cart } = useContext(CartContext)

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  function handleCartClick() {
    setSidebarOpen((prev) => !prev)
  }

  function handleClose() {
    setSidebarOpen(false)
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
      <CartSidebar open={sidebarOpen} onClose={handleClose} />
    </>
  )
}
