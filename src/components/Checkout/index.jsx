import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '@/providers/contexts'
import CartItem from '../Cart/components/CartItem'
import PaymentAlert from '../PaymentAlert'
import Toast from '../Toast'

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
    <main>
      <h2>{title}</h2>
      {isPaid && (
        <>
          <p>Thanks for your purchase</p>
          <Link to="/shop">Back to Shop</Link>
        </>
      )}
      <ul>
        {cart.map(({ product }) => (
          <CartItem key={product.id} id={product.id} />
        ))}
      </ul>
      {!isEmpty && (
        <>
          <p>{`Total: $${totalPrice.toFixed(2)}`}</p>
          <button onClick={() => setShowAlert((prev) => !prev)}>Pay</button>
        </>
      )}
      {showAlert && <PaymentAlert onConfirm={handleConfirm} />}
      {isPaid && <Toast message="Payment confirmed" />}
    </main>
  )
}
