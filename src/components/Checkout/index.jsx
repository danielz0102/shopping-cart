import { useState, useContext } from 'react'

import { CartContext } from '@/providers/contexts'
import CartItem from '../CartItem'
import PaymentAlert from '../PaymentAlert'
import Toast from '../Toast'

export default function Checkout() {
  const [showAlert, setShowAlert] = useState(false)

  const { cart } = useContext(CartContext)
  const isEmpty = cart.length === 0

  return (
    <main>
      <h2>{isEmpty ? 'The cart is empty' : 'Checkout'}</h2>
      <ul>
        {cart.map(({ product }) => (
          <CartItem key={product.id} id={product.id} />
        ))}
      </ul>
      <button onClick={() => setShowAlert((prev) => !prev)}>Pay</button>
      {showAlert && <PaymentAlert onConfirm={() => {}} />}
    </main>
  )
}
