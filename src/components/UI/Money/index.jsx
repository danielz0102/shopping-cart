import styles from './Money.module.css'

export function Money({ amount }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return <p className={styles.money}>{formatter.format(amount)}</p>
}
