import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PrimaryButton from '.'

test('rendres children properly', () => {
  render(<PrimaryButton>Test</PrimaryButton>)
  screen.getByRole('button', { name: /test/i })
})

test('receives an onClick function', () => {
  expect(() => {
    render(<PrimaryButton onClick={1}>Test</PrimaryButton>)
  }).toThrow()
  expect(() => {
    render(<PrimaryButton onClick={'123'}>Test</PrimaryButton>)
  }).toThrow()
  expect(() => {
    render(<PrimaryButton onClick={{}}>Test</PrimaryButton>)
  }).toThrow()
})

test('calls onClick function when clicked', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<PrimaryButton onClick={onClick}>Test</PrimaryButton>)

  await user.click(screen.getByRole('button', { name: /test/i }))

  expect(onClick).toHaveBeenCalled()
})
