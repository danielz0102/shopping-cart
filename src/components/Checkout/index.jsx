import styles from './Checkout.module.css'

import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '@/providers/contexts'

import CartItem from '../Cart/components/CartItem'
import PaymentAlert from './components/PaymentAlert'
import Toast from '../UI/Toast'
import Button from '../UI/Button'
import { CreditCard } from 'lucide-react'

export default function Checkout() {
  const [showAlert, setShowAlert] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const { cart, utils } = useContext(CartContext)
  const isEmpty = cart.length === 0
  const totalPrice = utils.getTotal()
  let title = isEmpty ? 'The cart is empty' : 'Checkout'

  if (isPaid) {
    title = 'Payment successful'
  }

  function handleConfirm() {
    setIsPaid(true)
    utils.clear()
  }

  return (
    <main className={styles.checkout}>
      <h1>{title}</h1>
      {isPaid && (
        <>
          <p>Thanks for your purchase</p>
          <Link to="/shop">Back to Shop</Link>
        </>
      )}
      <ul className={styles.itemsList}>
        {cart.map(({ product }) => (
          <CartItem key={product.id} id={product.id} />
        ))}
      </ul>
      {!isEmpty && (
        <>
          <p>
            Total: <span className="money">${totalPrice.toFixed(2)}</span>
          </p>
          <Button
            className={styles.button}
            onClick={() => setShowAlert((prev) => !prev)}
            type="primary"
          >
            Pay
            <CreditCard strokeWidth={1.5} />
          </Button>
        </>
      )}
      {showAlert && <PaymentAlert onConfirm={handleConfirm} />}
      {isPaid && <Toast message="Payment confirmed" />}
    </main>
  )
}
