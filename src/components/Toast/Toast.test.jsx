import { test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import Toast from '.'

test('throws an error if message is not a string', () => {
  expect(() => render(<Toast />)).toThrow()
  expect(() => render(<Toast message={123} />)).toThrow()
  expect(() => render(<Toast message={{}} />)).toThrow()
  expect(() => render(<Toast message={[]} />)).toThrow()
  expect(() => render(<Toast message={true} />)).toThrow()
})

test('shows message', () => {
  const message = 'Hello World'

  render(<Toast message={message} />)

  screen.getByText(message)
})

test('appears for a limited time', () => {
  const message = 'Hello World'

  render(<Toast message={message} />)

  const toast = screen.getByRole('dialog')

  waitFor(() => expect(toast).not.toBeInTheDocument())
})
