import styles from './Checkout.module.css'
import successImg from '@/assets/payment-successful.jpg'

import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '@/providers/contexts'

import CartItem from '@/components/CartItem'
import PaymentAlert from './components/PaymentAlert'
import Button from '@/components/UI/Button'
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

  function handleConfirm() {
    setIsPaid(true)
    setShowAlert(false)
    utils.clear()
    notify()
  }

  return (
    <main className={`${styles.checkout} ${isPaid ? styles.paid : ''}`}>
      {isPaid && (
        <>
          <h1 className="title">Payment succesful</h1>
          <div className={styles.imgContainer}>
            <img src={successImg} alt="" />
          </div>
          <p className="subtitle">Thanks for your purchase</p>
          <Link className="link" to="/shop">
            <ChevronLeft /> Back to Shop
          </Link>
        </>
      )}
      {isEmpty && !isPaid && (
        <>
          <h1 className="title">The cart is empty</h1>
        </>
      )}
      {!isEmpty && !isPaid && (
        <>
          <h1 className="title">Checkout</h1>
          <ul className={styles.itemsList}>
            {cart.map(({ product }) => (
              <CartItem key={product.id} id={product.id} />
            ))}
          </ul>
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
