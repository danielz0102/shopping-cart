import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CloseBtn from '.'

test('throws an error if onClick is not a function', () => {
  expect(() => render(<CloseBtn />)).toThrow()
  expect(() => render(<CloseBtn onClick={1} />)).toThrow()
  expect(() => render(<CloseBtn onClick={'undefined'} />)).toThrow()
})

test('throws an error if className is not a string', () => {
  expect(() => render(<CloseBtn className={1} />)).toThrow()
})

test('executes onClick when clicked', async () => {
  const onClick = vi.fn()
  render(<CloseBtn onClick={onClick} />)

  await userEvent.click(screen.getByRole('button', { name: /close/i }))

  expect(onClick).toHaveBeenCalled()
})

test('renders with the correct className', () => {
  render(<CloseBtn onClick={() => {}} className="custom-class" />)

  expect(screen.getByRole('button')).toHaveClass('custom-class')
})
