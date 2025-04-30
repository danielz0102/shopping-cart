import { useState } from 'react'

export default function PaymentAlert({ onConfirm }) {
  const [open, setOpen] = useState(true)

  if (typeof onConfirm !== 'function') {
    throw new Error('onConfirm must be a function')
  }

  return (
    <dialog open={open}>
      <h1>Confirm payment</h1>
      <button aria-label="Close" onClick={() => setOpen((prev) => !prev)}>
        x
      </button>
      <button onClick={onConfirm}>Confirm</button>
    </dialog>
  )
}
