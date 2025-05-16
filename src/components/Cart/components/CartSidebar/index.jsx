import styles from './CartSidebar.module.css'
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { CartContext } from '@/providers/contexts'

import { X, Receipt, Trash2 } from 'lucide-react'
import CartItem from '../CartItem'
import Button from '@/components/UI/Button'

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
        <div className={styles.info}>
          <p>
            Total: <span className="money">${total.toFixed(2)}</span>
          </p>
          <div className={styles.actions}>
            <Link to="/checkout" onClick={onClose} className="link">
              <Receipt strokeWidth={1} />
              Checkout
            </Link>
            <Button onClick={utils.clear}>
              Clear
              <Trash2 strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      )}
    </aside>
  )
}
