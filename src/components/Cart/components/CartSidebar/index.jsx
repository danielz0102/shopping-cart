import styles from './CartSidebar.module.css'
import emtpyCart from '@/assets/empty-cart.svg'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '@/providers/contexts'

import { Receipt, Trash2 } from 'lucide-react'
import CartItem from '../CartItem'
import Button from '@/components/UI/Button'
import CloseBtn from '@/components/UI/CloseBtn'

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
      className={`${styles.sidebar} ${!open ? styles.hidden : ''} ${isEmpty ? styles.empty : ''}`}
      hidden={!open}
    >
      <CloseBtn className={styles.closeBtn} onClick={onClose} />
      {isEmpty ? (
        <>
          <h2 className="title">The car is empty</h2>
          <img src={emtpyCart} alt="" />
          <p className="subtitle">Add products in the shop</p>
        </>
      ) : (
        <>
          <h2 className="title">Your products</h2>
          <ul>
            {cart?.map(({ product }) => (
              <CartItem key={product.id} id={product.id} />
            ))}
          </ul>
          <div className={styles.info}>
            <p>
              Total: <span className="money">${total.toFixed(2)}</span>
            </p>
            <div className={styles.actions}>
              <Button onClick={utils.clear} type="secondary">
                Clear
                <Trash2 strokeWidth={1.5} />
              </Button>
              <Link to="/checkout" onClick={onClose} className="link">
                <Receipt strokeWidth={1} />
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
