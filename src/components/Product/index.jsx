import styles from './Product.module.css'
import { useState, useContext } from 'react'
import { productSchema } from '@/schemas/product'
import { CartContext } from '@/contexts'

export default function Product({ product }) {
  const { utils } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)

  const productIsValid = productSchema.safeParse(product)

  if (!productIsValid.success) {
    throw new Error('product is not valid')
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
      <button onClick={() => utils.add({ id: product.id, quantity })}>
        Add to Cart
      </button>
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
