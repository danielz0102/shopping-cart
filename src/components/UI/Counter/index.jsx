import styles from './Counter.module.css'
import z from 'zod'

import { useId } from 'react'

import { Minus, Plus } from 'lucide-react'

const propsSchema = z.object({
  onClickDecrement: z.function(),
  onClickIncrement: z.function(),
  inputAttributes: z.record(z.any()).default(() => ({})),
})

export default function Counter(props) {
  const { onClickDecrement, onClickIncrement, inputAttributes } =
    propsSchema.parse(props)

  const id = useId()
  return (
    <div className={styles.counter}>
      <button aria-label="decrement" onClick={onClickDecrement}>
        <Minus strokeWidth={1.5} />
      </button>
      <input id={id} type="number" aria-label="counter" {...inputAttributes} />
      <button aria-label="increment" onClick={onClickIncrement}>
        <Plus strokeWidth={1.5} />
      </button>
    </div>
  )
}
