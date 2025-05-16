import styles from './Product.module.css'
import { productSchema } from '@/schemas/product'

import { useRef, useContext } from 'react'
import { CartContext } from '@/providers/contexts'

import Counter from '../Counter'
import { ShoppingBasket } from 'lucide-react'
import Button from '../UI/Button'

export default function Product({ product }) {
  const { utils } = useContext(CartContext)
  const quantity = useRef(1)

  const productIsValid = productSchema.safeParse(product)

  if (!productIsValid.success) {
    throw new Error('product is not valid')
  }

  function addToCart() {
    utils.add({ ...product }, quantity.current)
  }

  function handleCounterChange(count) {
    quantity.current = count
  }

  return (
    <article className={styles.product}>
      <div className={styles.imgContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <h2>{product.title}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className="money">${product.price.toFixed(2)}</p>
      <Button onClick={addToCart}>
        Add to Cart
        <ShoppingBasket strokeWidth={1.5} />
      </Button>
      <Counter
        label="Product quantity"
        initialCount={1}
        min={1}
        onChange={handleCounterChange}
      />
    </article>
  )
}
