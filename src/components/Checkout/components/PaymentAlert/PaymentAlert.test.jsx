import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PaymentAlert from '.'

test('throws an error if onConfirm is not a function', () => {
  expect(() => render(<PaymentAlert />)).toThrow()
  expect(() =>
    render(<PaymentAlert onConfirm={123} onClose={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<PaymentAlert onConfirm={'123'} onClose={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<PaymentAlert onConfirm={{}} onClose={() => {}} />),
  ).toThrow()
})

test('throws an error if onClose is not a function', () => {
  expect(() => render(<PaymentAlert onConfirm={() => {}} />)).toThrow()
  expect(() =>
    render(<PaymentAlert onConfirm={() => {}} onClose={123} />),
  ).toThrow()
  expect(() =>
    render(<PaymentAlert onConfirm={() => {}} onClose={'123'} />),
  ).toThrow()
  expect(() =>
    render(<PaymentAlert onConfirm={() => {}} onClose={{}} />),
  ).toThrow()
})

test('throws an error if open is not a boolean', () => {
  expect(() =>
    render(<PaymentAlert open={123} onConfirm={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<PaymentAlert open={'123'} onConfirm={() => {}} />),
  ).toThrow()
  expect(() =>
    render(<PaymentAlert open={{}} onConfirm={() => {}} />),
  ).toThrow()
})

test('renders open by default', () => {
  render(<PaymentAlert onConfirm={() => {}} onClose={() => {}} />)

  screen.getByRole('dialog')
})

test('executes onConfirm when confirm button is clicked', async () => {
  const onConfirm = vi.fn()
  const user = userEvent.setup()
  render(<PaymentAlert onConfirm={onConfirm} onClose={() => {}} />)

  await user.click(screen.getByRole('button', { name: /confirm/i }))

  expect(onConfirm).toHaveBeenCalled()
})

test('executes onClose when close button is clicked', async () => {
  const onClose = vi.fn()
  const user = userEvent.setup()
  render(<PaymentAlert onConfirm={() => {}} onClose={onClose} />)

  await user.click(screen.getByRole('button', { name: /close/i }))

  expect(onClose).toHaveBeenCalled()
})
