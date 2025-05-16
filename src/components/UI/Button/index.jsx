import styles from './Button.module.css'

const BUTTON_TYPES = {
  PRIMARY: 'primary',
  TERTIARY: 'danger',
}

export default function Button({
  children,
  onClick = () => {},
  type = BUTTON_TYPES.PRIMARY,
}) {
  if (typeof onClick !== 'function') {
    throw new TypeError('onClick prop must be a function')
  }

  if (typeof type !== 'string') {
    throw new TypeError('type prop must be a string')
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
