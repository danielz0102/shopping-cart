import styles from './Checkout.module.css'

import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '@/providers/contexts'

import CartItem from '../Cart/components/CartItem'
import PaymentAlert from './components/PaymentAlert'
import Button from '../UI/Button'
import { Receipt, CheckCheck, ChevronLeft } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const notify = () =>
  toast('Payment confirmed!', {
    icon: <CheckCheck className={styles.toastIcon} />,
    duration: 3000,
    position: 'bottom-right',
  })

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
    setShowAlert(false)
    utils.clear()
    notify()
  }

  return (
    <main className={styles.checkout}>
      <h1 className="title">{title}</h1>
      {isPaid && (
        <>
          <p className={styles.successMessage}>Thanks for your purchase</p>
          <Link className="link" to="/shop">
            <ChevronLeft /> Back to Shop
          </Link>
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
          >
            Pay
            <Receipt size={28} strokeWidth={1.5} />
          </Button>
        </>
      )}
      {showAlert && (
        <PaymentAlert
          open={showAlert}
          onConfirm={handleConfirm}
          onClose={() => setShowAlert(false)}
        />
      )}
      <Toaster />
    </main>
  )
}
