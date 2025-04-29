import { useContext, useRef } from 'react'
import { CartContext } from '@/providers/contexts'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, utils } = useContext(CartContext)
  const sidebar = useRef(null)

  const quantity = cart.length

  function handleCartClick() {
    if (sidebar.current.open) {
      sidebar.current.close()
      return
    }

    sidebar.current.show()
  }

  return (
    <>
      <button
        aria-label={`Cart with ${quantity} items`}
        onClick={handleCartClick}
      >
        <span>{quantity}</span>
      </button>
      <dialog ref={sidebar}>
        <h2>{quantity > 0 ? 'Your products' : 'The car is empty'}</h2>
        <ul>
          {cart?.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div>
                <button onClick={() => utils.remove(product.id)}>Remove</button>
                <button
                  aria-label="Increase"
                  onClick={() => utils.increase(product.id)}
                >
                  +
                </button>
                <button
                  aria-label="Decrease"
                  onClick={() => utils.decrease(product.id)}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
        {quantity > 0 && <Link to="/checkout">Checkout</Link>}
        <button onClick={utils.clear}>Clear</button>
      </dialog>
    </>
  )
}
