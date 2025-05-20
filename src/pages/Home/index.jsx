import styles from './Home.module.css'
import landingImg from '@/assets/landing.svg'

import { Link } from 'react-router-dom'
import { ShoppingBasket } from 'lucide-react'

export default function Home() {
  return (
    <main className={styles.home}>
      <main className={styles.content}>
        <h1 className={styles.title}>
          Welcome to the Store That <strong>Sells Dreams</strong>{' '}
          <s>(and nothing else 🤣)</s>
        </h1>
        <img className={styles.mobileImg} src={landingImg} alt="" />
        <p className={styles.description}>
          Browse all you want — we guarantee <strong>zero fulfillment</strong>,{' '}
          <strong>instant disappointment</strong>.
        </p>
        <Link className="link" to="/shop">
          <ShoppingBasket strokeWidth={1.5} />
          Go to Shop
        </Link>
      </main>
      <aside>
        <img className={styles.desktopImg} src={landingImg} alt="" />
      </aside>
    </main>
  )
}
