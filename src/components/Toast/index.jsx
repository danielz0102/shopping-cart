import { useState, useEffect } from 'react'

export default function Toast({ message }) {
  const [open, setOpen] = useState(true)

  if (typeof message !== 'string') {
    throw new Error('message must be a string')
  }

  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }, [])

  return (
    <dialog open={open}>
      <p>{message}</p>
    </dialog>
  )
}
