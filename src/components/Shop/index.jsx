import styles from './Shop.module.css'

import { useProducts } from '@/hooks/useProducts'

import Product from '../Product'
import Spinner from '../UI/Spinner'

export default function Shop() {
  const { products, loading, error } = useProducts()

  return (
    <main className={styles.shop}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className={styles.error}>
          <h1>Oops... something went wrong 😢</h1>
          <p>Try again later</p>
        </div>
      ) : (
        <div className={styles.itemsGrid}>
          {products.map((product) => (
            <Product key={product.id} product={product} addToCart={() => {}} />
          ))}
        </div>
      )}
    </main>
  )
}
