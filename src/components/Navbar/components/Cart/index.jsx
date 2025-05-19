import styles from './Cart.module.css'

import { useState, useContext } from 'react'
import { CartContext, ThemeContext } from '@/providers/contexts'

import { ShoppingCart } from 'lucide-react'
import Sidebar from '../Sidebar'

export default function Cart() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark } = useContext(ThemeContext)
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
        <span className={`${styles.itemsCounter} ${isDark ? styles.dark : ''}`}>
          {quantity < 100 ? quantity : '+99'}
        </span>
      </button>
      <Sidebar open={sidebarOpen} onClose={handleClose} />
    </>
  )
}
