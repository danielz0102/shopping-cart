import { useState, useEffect } from 'react'
import { validatePositiveInteger } from '@/schemas/positiveInteger'

export default function Toast({ message, delay = 3000 }) {
  const [open, setOpen] = useState(true)

  if (typeof message !== 'string') {
    throw new Error('message must be a string')
  }

  validatePositiveInteger(delay)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <dialog open={open}>
      <p>{message}</p>
    </dialog>
  )
}
