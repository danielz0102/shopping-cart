import styles from './Counter.module.css'

import { Minus, Plus } from 'lucide-react'

export default function Counter({
  incrementBtnAttributes = {},
  decrementBtnAttributes = {},
  inputAttributes = {},
}) {
  return (
    <div className={styles.counter}>
      <button {...decrementBtnAttributes}>
        <Minus strokeWidth={1.5} />
      </button>
      <input {...inputAttributes} />
      <button {...incrementBtnAttributes}>
        <Plus strokeWidth={1.5} />
      </button>
    </div>
  )
}
