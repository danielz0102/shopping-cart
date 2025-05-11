import z from 'zod'

import { useState, useEffect, useId } from 'react'

import Counter from '@/components/UI/Counter'

const propsSchema = z.object({
  label: z.string().nonempty(),
  initialCount: z.number().default(0),
  min: z.number().default(0),
  onChange: z.function().default(() => () => {}),
})

function inputIsValid(value, min) {
  return z.number().min(min).safeParse(Number(value)).success
}

export default function ProductQuantity(props) {
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

  const decrementBtnAttributes = {
    'aria-label': 'decrement',
    onClick: decrement,
  }

  const incrementBtnAttributes = {
    'aria-label': 'increment',
    onClick: increment,
  }
  const inputAttributes = {
    'aria-label': label,
    id,
    type: 'number',
    value: count,
    onChange: handleChange,
    onBlur: validateInput,
  }

  return (
    <Counter
      decrementBtnAttributes={decrementBtnAttributes}
      incrementBtnAttributes={incrementBtnAttributes}
      inputAttributes={inputAttributes}
    />
  )
}
