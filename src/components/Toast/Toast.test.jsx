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

test('throws an error if delay is not a number greater than 0', () => {
  expect(() => render(<Toast message="Hello" delay={-1} />)).toThrow()
  expect(() => render(<Toast message="Hello" delay={0} />)).toThrow()
  expect(() => render(<Toast message="Hello" delay="1" />)).toThrow()
  expect(() => render(<Toast message="Hello" delay={{}} />)).toThrow()
  expect(() => render(<Toast message="Hello" delay={[]} />)).toThrow()
})

test('shows message', () => {
  const message = 'Hello World'

  render(<Toast message={message} />)

  screen.getByText(message)
})

test('appears for 3 seconds by default', async () => {
  const message = 'Hello World'

  render(<Toast message={message} />)

  const toast = screen.getByRole('dialog')

  expect(toast).toBeVisible()
  await waitFor(() => expect(toast).not.toBeVisible(), { timeout: 3000 })
})

test('appears for delay provided', async () => {
  const message = 'Hello World'

  render(<Toast message={message} delay={1000} />)

  const toast = screen.getByRole('dialog')

  expect(toast).toBeVisible()
  await waitFor(() => expect(toast).not.toBeVisible(), { timeout: 1100 })
})
