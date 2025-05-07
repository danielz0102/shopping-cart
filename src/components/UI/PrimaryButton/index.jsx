import styles from './PrimaryButton.module.css'

export function PrimaryBtn({ children, onClick }) {
  return (
    <button type="button" className={styles.primaryBtn} onClick={onClick}>
      {children}
    </button>
  )
}
