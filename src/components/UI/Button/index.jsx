import styles from './Button.module.css'

import { useContext } from 'react'
import { ThemeContext } from '@/providers/contexts'

const BUTTON_TYPES = {
  PRIMARY: 'primary',
  TERTIARY: 'danger',
  SECONDARY: 'secondary',
}

export default function Button({
  children,
  onClick = () => {},
  type = BUTTON_TYPES.PRIMARY,
  className = '',
}) {
  if (typeof onClick !== 'function') {
    throw new TypeError('onClick prop must be a function')
  }

  if (typeof type !== 'string') {
    throw new TypeError('type prop must be a string')
  }

  if (typeof className !== 'string') {
    throw new TypeError('className prop must be a string')
  }

  const { isDark } = useContext(ThemeContext) || { isDark: false }

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[type]} ${className} ${isDark ? styles.dark : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
