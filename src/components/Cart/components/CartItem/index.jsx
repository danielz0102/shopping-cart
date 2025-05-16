import styles from './CartItem.module.css'
import { validatePositiveInteger } from '@/schemas/positiveInteger'

import { useContext } from 'react'

import { CartContext } from '@/providers/contexts'

import Counter from '@/components/Counter'
import Button from '@/components/UI/Button'
import { Trash2 } from 'lucide-react'

export default function CartItem({ id }) {
  const { cart, utils } = useContext(CartContext)

  validatePositiveInteger(id)
  const item = cart.find((item) => item.product.id === id)

  if (!item) return null

  const { product, quantity } = item
  const finalPrice = product.price * quantity

  function handleChange(newQuantity) {
    utils.update(product.id, newQuantity)
  }

  return (
    <li className={styles.cartItem}>
      <header>
        <h3>{product.title}</h3>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.title} />
        </div>
      </header>
      <main>
        <p className="money">${finalPrice.toFixed(2)}</p>
        <div className={styles.actions}>
          <Counter
            label={'Item quantity'}
            initialCount={quantity}
            min={0}
            onChange={handleChange}
          />
          <Button type="danger" onClick={() => utils.remove(product.id)}>
            <Trash2 className={styles.trashIcon} strokeWidth={1.5} />
          </Button>
        </div>
      </main>
    </li>
  )
}
