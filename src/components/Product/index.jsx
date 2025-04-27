import styles from './Product.module.css'
import { useState } from 'react'

export default function Product({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1)

  if (!product || Object.keys(product).length === 0) {
    return null
  }

  function increment() {
    setQuantity((prev) => prev + 1)
  }

  function decrement() {
    if (quantity <= 1) return
    setQuantity((prev) => prev - 1)
  }

  function handleChange(event) {
    const value = event.target.value
    setQuantity(value)
  }

  function validateQuantity(event) {
    const value = event.target.value
    const isValid = value > 0 && !isNaN(value)

    setQuantity(isValid ? value : 1)
  }

  return (
    <article className={styles.product}>
      <picture>
        <img src={product.image} alt={product.title} />
      </picture>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={handleChange}
          onBlur={validateQuantity}
          aria-live="polite"
        />
      </div>
      <div>
        <button type="button" aria-label="increment" onClick={increment}>
          +
        </button>
        <button type="button" aria-label="decrement" onClick={decrement}>
          -
        </button>
      </div>
    </article>
  )
}
