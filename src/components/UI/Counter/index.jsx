import styles from './Counter.module.css'
import z from 'zod'

import { useState, useId } from 'react'

import { Minus, Plus } from 'lucide-react'
import { useEffect } from 'react'

const propsSchema = z.object({
  label: z.string().nonempty(),
  initialCount: z.number().default(0),
  min: z.number().default(0),
  onChange: z.function().default(() => () => {}),
})

export default function Counter(props) {
  const { label, initialCount, min, onChange } = propsSchema.parse(props)
  const [count, setCount] = useState(initialCount)
  const id = useId()

  useEffect(() => {
    setCount(initialCount)
  }, [initialCount])

  function increment() {
    const newCount = count + 1
    setCount(newCount)
    onChange(newCount)
  }

  function decrement() {
    const newCount = Math.max(count - 1, min)
    setCount(newCount)
    onChange(newCount)
  }

  function handleChange(event) {
    setCount(event.target.value)
  }

  function validateInput(event) {
    const value = event.target.value
    const inputIsValid = z.number().min(min).safeParse(Number(value)).success

    setCount(inputIsValid ? Number(value) : min)
    onChange(Number(value))
  }

  return (
    <div className={styles.counter}>
      <button aria-label="decrement" onClick={decrement}>
        <Minus className={styles.counterIcon} strokeWidth={1.5} />
      </button>
      <input
        id={id}
        type="number"
        value={count}
        onChange={handleChange}
        onBlur={validateInput}
        aria-label={label}
      />
      <button aria-label="increment" onClick={increment}>
        <Plus className={styles.counterIcon} strokeWidth={1.5} />
      </button>
    </div>
  )
}
