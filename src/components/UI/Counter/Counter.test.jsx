import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Counter from '.'

test('receives a onClickIncrement function', () => {
  expect(() =>
    render(<Counter onClickIncrement={1} onClickDecrement={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<Counter onClickIncrement={'123'} onClickDecrement={() => {}} />),
  ).toThrow()
})

test('receives a onClickDecrement function', () => {
  expect(() =>
    render(<Counter onClickIncrement={() => {}} onClickDecrement={1} />),
  ).toThrow()
  expect(() =>
    render(<Counter onClickIncrement={() => {}} onClickDecrement={'123'} />),
  ).toThrow()
})

test('receives a inputAttributes object', () => {
  expect(() =>
    render(
      <Counter
        onClickIncrement={() => {}}
        onClickDecrement={() => {}}
        inputAttributes={1}
      />,
    ),
  ).toThrow()
  expect(() =>
    render(
      <Counter
        onClickIncrement={() => {}}
        onClickDecrement={() => {}}
        inputAttributes={'123'}
      />,
    ),
  ).toThrow()
})

test('executes the onClickIncrement function when the increment button is clicked', async () => {
  const user = userEvent.setup()
  const onClickIncrement = vi.fn()

  render(
    <Counter onClickIncrement={onClickIncrement} onClickDecrement={() => {}} />,
  )

  await user.click(screen.getByLabelText('increment'))

  expect(onClickIncrement).toHaveBeenCalled()
})

test('executes the onClickDecrement function when the decrement button is clicked', async () => {
  const user = userEvent.setup()
  const onClickDecrement = vi.fn()

  render(
    <Counter onClickIncrement={() => {}} onClickDecrement={onClickDecrement} />,
  )

  await user.click(screen.getByLabelText('decrement'))

  expect(onClickDecrement).toHaveBeenCalled()
})

test('passes the inputAttributes to the input element', () => {
  const inputAttributes = {
    'data-testid': 'input',
    value: 5,
  }

  render(
    <Counter
      onClickIncrement={() => {}}
      onClickDecrement={() => {}}
      inputAttributes={inputAttributes}
    />,
  )

  expect(screen.getByTestId('input')).toHaveValue(5)
})
