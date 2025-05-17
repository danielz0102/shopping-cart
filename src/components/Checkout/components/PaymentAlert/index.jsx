import styles from './PaymentAlert.module.css'

import { useEffect, useRef } from 'react'

import Button from '@/components/UI/Button'
import CloseBtn from '@/components/UI/CloseBtn'
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

  const alert = useRef()

  useEffect(() => {
    alert.current[open ? 'showModal' : 'close']()
  }, [open])

  return (
    <dialog className={styles.alert} ref={alert}>
      <h1>Confirm payment</h1>
      <CloseBtn className={styles.closeButton} onClick={onClose} />
      <Button className={styles.confirmButton} onClick={onConfirm}>
        Confirm <Check strokeWidth={1.5} />
      </Button>
    </dialog>
  )
}
