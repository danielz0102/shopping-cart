import styles from './Shop.module.css'
import spinner from '@/assets/loader.svg'
import { useProducts } from '@/hooks/useProducts'
import Product from '../Product'

export default function Shop() {
  const { products, loading, error } = useProducts()

  if (error) {
    return <h1>Oops... something went wrong</h1>
  }

  if (products.length === 0 && !loading) {
    return <h1>No products found</h1>
  }

  return (
    <main className={styles.shop}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <img src={spinner} alt="Loading..." />
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
