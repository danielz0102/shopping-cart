import styles from './Product.module.css'

export default function Product({ product }) {
  return (
    <article className={styles.product}>
      <picture>
        <img src={product.image} alt={product.title} />
      </picture>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </article>
  )
}
