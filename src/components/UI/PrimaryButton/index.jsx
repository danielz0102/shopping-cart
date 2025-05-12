import styles from './PrimaryButton.module.css'

export default function PrimaryBtn({ children, onClick = () => {} }) {
  if (typeof onClick !== 'function') {
    throw new TypeError('onClick prop must be a function')
  }

  return (
    <button type="button" className={styles.primaryBtn} onClick={onClick}>
      {children}
    </button>
  )
}
