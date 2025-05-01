import { Link } from 'react-router-dom'
import { House } from 'lucide-react'
import { Store } from 'lucide-react'

import styles from './Navbar.module.css'
import Cart from '../Cart'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        <li>
          <Link to="/" className="link">
            <House strokeWidth={1} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className="link">
            <Store strokeWidth={1} />
            Shop
          </Link>
        </li>
      </ul>
      <Cart />
    </nav>
  )
}
