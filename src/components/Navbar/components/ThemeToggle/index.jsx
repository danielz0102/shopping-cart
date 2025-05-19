import styles from './ThemeToggle.module.css'

import { useContext } from 'react'
import { ThemeContext } from '@/providers/contexts'

import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { isDark, setIsDark } = useContext(ThemeContext)
  const Icon = isDark ? Moon : Sun

  function toggle() {
    setIsDark((prev) => !prev)
  }

  return (
    <button
      className={styles.themeToggle}
      onClick={toggle}
      aria-label={`${isDark ? 'Dark mode' : 'Light mode'}`}
    >
      <Icon strokeWidth={1} color="var(--link)" />
    </button>
  )
}
