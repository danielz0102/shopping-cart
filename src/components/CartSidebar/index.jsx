import styles from './CartSidebar.module.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { X, Receipt } from 'lucide-react'

import { CartContext } from '@/providers/contexts'
import CartItem from '../CartItem'

export default function CartSidebar({ open = true, onClose }) {
  const { cart, utils } = useContext(CartContext)

  if (typeof open !== 'boolean') {
    throw new TypeError(`Prop 'open' must be a boolean`)
  }

  if (typeof onClose !== 'function') {
    throw new TypeError(`Prop 'onClose' must be a function`)
  }

  const isEmpty = cart.length === 0
  const total = utils.getTotal()

  return (
    <aside
      className={`${styles.sidebar} ${!open ? styles.hidden : ''}`}
      hidden={!open}
    >
      <button className={styles.closeBtn} aria-label="Close" onClick={onClose}>
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
          <Link to="/checkout" onClick={onClose} className="link">
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
