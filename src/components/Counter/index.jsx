import styles from './Counter.module.css'
import z from 'zod'

import { useState, useEffect, useId } from 'react'
import { Plus } from 'lucide-react'
import { Minus } from 'lucide-react'

const propsSchema = z.object({
  label: z.string().nonempty(),
  initialCount: z.number().default(0),
  min: z.number().default(0),
  onChange: z.function().default(() => () => {}),
})

function inputIsValid(value, min) {
  return z.number().min(min).safeParse(Number(value)).success
}

export default function Counter(props) {
  const { label, initialCount, min, onChange } = propsSchema.parse(props)
  const [count, setCount] = useState(initialCount)
  const id = useId()

  useEffect(() => {
    onChange(Number(count))
  }, [count, onChange])

  function increment() {
    setCount((prev) => prev + 1)
  }

  function decrement() {
    setCount((prev) => Math.max(prev - 1, min))
  }

  function handleChange(event) {
    setCount(event.target.value)
  }

  function validateInput(event) {
    const value = event.target.value
    setCount(inputIsValid(value, min) ? Number(value) : min)
  }

  return (
    <div className={styles.counter}>
      <button aria-label="decrement" onClick={decrement}>
        <Minus strokeWidth={1.5} />
      </button>
      <input
        aria-label={label}
        id={id}
        type="number"
        value={count}
        onChange={handleChange}
        onBlur={validateInput}
      />
      <button aria-label="increment" onClick={increment}>
        <Plus strokeWidth={1.5} />
      </button>
    </div>
  )
}
