import styles from './PaymentAlert.module.css'
import Button from '@/components/UI/Button'
import { Check } from 'lucide-react'

export default function PaymentAlert({ open = true, onConfirm, onClose }) {
  if (typeof onConfirm !== 'function') {
    throw new Error('onConfirm must be a function')
  }

  if (typeof open !== 'boolean') {
    throw new Error('open must be a boolean')
  }

  if (typeof onClose !== 'function') {
    throw new Error('onClose must be a function')
  }

  return (
    <dialog className={styles.alert} open={open}>
      <h1>Confirm payment</h1>
      <button
        className={styles.closeButton}
        aria-label="Close"
        onClick={onClose}
      >
        x
      </button>
      <Button className={styles.confirmButton} onClick={onConfirm}>
        Confirm <Check strokeWidth={1.5} />
      </Button>
    </dialog>
  )
}
