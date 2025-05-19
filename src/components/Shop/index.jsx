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
        <h1>Oops... something went wrong</h1>
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
