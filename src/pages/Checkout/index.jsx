import styles from './Checkout.module.css'
import successImg from '@/assets/payment-successful.jpg'
import successImgDark from '@/assets/payment-successful-dark.svg'

import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext, ThemeContext } from '@/providers/contexts'

import CartItem from '@/components/CartItem'
import PaymentAlert from './components/PaymentAlert'
import Button from '@/components/UI/Button'
import { Receipt, CheckCheck, ChevronLeft } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const notify = () =>
  toast('Payment confirmed!', {
    icon: <CheckCheck color="var(--money)" />,
    duration: 3000,
    position: 'bottom-right',
    style: {
      boxShadow: 'none',
      backgroundColor: 'var(--primary-lighter)',
    },
  })

export default function Checkout() {
  const [showAlert, setShowAlert] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const { cart, utils } = useContext(CartContext)
  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()
  const successImgSrc = isDark ? successImgDark : successImg
  const isEmpty = cart.length === 0
  const totalPrice = utils.getTotal()

  useEffect(() => {
    if (isEmpty && !isPaid) {
      navigate('/shop')
    }
  }, [isEmpty, isPaid, navigate])

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
          <div
            className={`${styles.imgContainer} ${isDark ? styles.dark : ''}`}
          >
            <img src={successImgSrc} alt="" />
          </div>
          <p className="subtitle">Thanks for your purchase</p>
          <Link className="link" to="/shop">
            <ChevronLeft /> Back to Shop
          </Link>
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
