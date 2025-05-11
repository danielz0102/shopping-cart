import styles from './Counter.module.css'

import { useId } from 'react'

import { Minus, Plus } from 'lucide-react'

export default function Counter({
  incrementBtnAttributes = {},
  decrementBtnAttributes = {},
  inputAttributes = {},
}) {
  const id = useId()
  return (
    <div className={styles.counter}>
      <button aria-label="decrement" {...decrementBtnAttributes}>
        <Minus strokeWidth={1.5} />
      </button>
      <input id={id} type="number" aria-label="counter" {...inputAttributes} />
      <button aria-label="increment" {...incrementBtnAttributes}>
        <Plus strokeWidth={1.5} />
      </button>
    </div>
  )
}
