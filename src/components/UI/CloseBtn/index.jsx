import styles from './CloseBtn.module.css'
import { X } from 'lucide-react'

export default function CloseBtn({ onClick, className = '' }) {
  if (typeof onClick !== 'function') {
    throw new TypeError('onClick must be a function')
  }

  if (typeof className !== 'string') {
    throw new TypeError('className must be a string')
  }

  return (
    <button
      className={`${styles.closeBtn} ${className}`}
      aria-label="Close"
      onClick={onClick}
    >
      <X strokeWidth={1} />
    </button>
  )
}
