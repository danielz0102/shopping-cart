import styles from './Money.module.css'
import { Receipt } from 'lucide-react'

export function Money({ amount }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <p className={styles.money}>
      <Receipt />
      {formatter.format(amount)}
    </p>
  )
}
