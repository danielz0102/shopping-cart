import styles from './CartSidebar.module.css'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { X, Receipt } from 'lucide-react'

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
    <aside className={styles.sidebar}>
      <button className={styles.closeBtn} aria-label="Close" onClick={close}>
        <X strokeWidth={1} />
      </button>
      <h2>{isEmpty ? 'The cart is empty' : 'Your products'}</h2>
      <ul>
        {cart?.map(({ product }) => (
          <CartItem key={product.id} id={product.id} />
        ))}
      </ul>
      {!isEmpty && (
        <div className="container">
          <p>
            Total: <span className="money">${total.toFixed(2)}</span>
          </p>
          <Link to="/checkout" onClick={close} className="link">
            <Receipt strokeWidth={1} />
            Checkout
          </Link>
          <button className="primary-btn" onClick={utils.clear}>
            Clear
          </button>
        </div>
      )}
    </aside>
  )
}
