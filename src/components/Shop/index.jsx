import styles from './Shop.module.css'
import { useProducts } from '@/hooks/useProducts'
import Product from '../Product'

export default function Shop() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Oops... something went wrong</h1>
  }

  if (products.length === 0) {
    return <h1>No products found</h1>
  }

  return (
    <main className={styles.shop}>
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={() => {}} />
      ))}
    </main>
  )
}
