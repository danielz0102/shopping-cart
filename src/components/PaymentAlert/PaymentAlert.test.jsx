import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PaymentAlert from '.'

test('throws an error if onConfirm is not a function', () => {
  expect(() => render(<PaymentAlert />)).toThrow()
  expect(() => render(<PaymentAlert onConfirm={123} />)).toThrow()
  expect(() => render(<PaymentAlert onConfirm={'123'} />)).toThrow()
  expect(() => render(<PaymentAlert onConfirm={{}} />)).toThrow()
})

test('renders open', () => {
  render(<PaymentAlert onConfirm={() => {}} />)

  screen.getByRole('heading')
})

test('closes by clicking close button', async () => {
  const user = userEvent.setup()
  render(<PaymentAlert onConfirm={() => {}} />)

  await user.click(screen.getByRole('button', { name: /close/i }))

  expect(screen.queryByRole('heading')).not.toBeInTheDocument()
})

test('closes by clicking confirm button ', async () => {
  const user = userEvent.setup()
  render(<PaymentAlert onConfirm={() => {}} />)

  await user.click(screen.getByRole('button', { name: /confirm/i }))

  expect(screen.queryByRole('heading')).not.toBeInTheDocument()
})

test('executes onConfirm when confirm button is clicked', async () => {
  const onConfirm = vi.fn()
  const user = userEvent.setup()
  render(<PaymentAlert onConfirm={onConfirm} />)

  await user.click(screen.getByRole('button', { name: /confirm/i }))

  expect(onConfirm).toHaveBeenCalled()
})
