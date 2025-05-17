import { useState } from 'react'

export default function PaymentAlert({ onConfirm }) {
  const [open, setOpen] = useState(true)

  if (typeof onConfirm !== 'function') {
    throw new Error('onConfirm must be a function')
  }

  function close() {
    setOpen(false)
  }

  function handleConfirm() {
    onConfirm()
    close()
  }

  return (
    <dialog open={open}>
      <h1>Confirm payment</h1>
      <button aria-label="Close" onClick={close}>
        x
      </button>
      <button onClick={handleConfirm}>Confirm</button>
    </dialog>
  )
}
