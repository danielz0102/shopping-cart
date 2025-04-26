import { useProducts } from '@/hooks/products'
import styles from '@/styles/Shop.module.css'
import Product from './Product'

export default function Shop() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error fetching products</h1>
  }

  return (
    <main className={styles.shop}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </main>
  )
}
