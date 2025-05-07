import styles from './Product.module.css'
import { productSchema } from '@/schemas/product'

import { useState, useContext } from 'react'
import { CartContext } from '@/providers/contexts'

import { ShoppingBasket } from 'lucide-react'
import { Money } from '../UI/Money'
import { PrimaryBtn } from '../UI/PrimaryButton'

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
    setQuantity(Number(value))
  }

  function validateQuantity(event) {
    const value = event.target.value
    const isValid = value > 0 && !isNaN(value)

    setQuantity(isValid ? Number(value) : 1)
  }

  function addToCart() {
    utils.add({ ...product }, quantity)
  }

  return (
    <article className={styles.product}>
      <div className={styles.imgContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <h2>{product.title}</h2>
      <p className={styles.description}>{product.description}</p>
      <Money amount={product.price} />
      <PrimaryBtn onClick={addToCart}>
        Add to Cart
        <ShoppingBasket strokeWidth={1.5} />
      </PrimaryBtn>
      <div>
        <label htmlFor={`quantity-${product.id}`}>Quantity</label>
        <input
          id={`quantity-${product.id}`}
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
