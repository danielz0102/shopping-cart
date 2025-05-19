import { Link, useLocation } from 'react-router-dom'
import { House, Store } from 'lucide-react'

import { useContext } from 'react'
import { ThemeContext } from '@/providers/contexts'

import styles from './Navbar.module.css'
import Cart from './components/Cart'
import ThemeToggle from './components/ThemeToggle'

export default function Navbar() {
  const { isDark } = useContext(ThemeContext)
  const location = useLocation()
  const isInShop = location.pathname === '/shop'

  return (
    <nav
      className={`${styles.navbar} ${isInShop ? styles.animated : ''} ${isDark ? styles.dark : ''}`}
    >
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
      <ThemeToggle />
      <Cart />
    </nav>
  )
}
