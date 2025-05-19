import styles from './Spinner.module.css'
import spinner from '@/assets/loader.svg'

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <img src={spinner} alt="Loading..." />
    </div>
  )
}
