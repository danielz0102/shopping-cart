import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Quantity from '.'

vi.mock('@/components/UI/Counter', () => ({
  default: () => <div data-testid="Counter"></div>,
}))

it('throw error if label is not a string, is not provided or is an empty string', () => {
  expect(() => render(<Quantity />)).toThrowError()
  expect(() => render(<Quantity label={1} />)).toThrowError()
  expect(() => render(<Quantity label="" />)).toThrowError()
})

it('throw error if min is not a number', () => {
  expect(() => render(<Quantity label="counter" min="1" />)).toThrowError()
  expect(() => render(<Quantity label="counter" min={true} />)).toThrowError()
  expect(() => render(<Quantity label="counter" min={{}} />)).toThrowError()
})

it('throw error if initialCount is not a number', () => {
  expect(() =>
    render(<Quantity label="counter" initialCount="1" />),
  ).toThrowError()
  expect(() =>
    render(<Quantity label="counter" initialCount={true} />),
  ).toThrowError()
  expect(() =>
    render(<Quantity label="counter" initialCount={{}} />),
  ).toThrowError()
})

it('throw error if onChange is not a function', () => {
  expect(() => render(<Quantity label="counter" onChange={1} />)).toThrowError()
  expect(() =>
    render(<Quantity label="counter" onChange={true} />),
  ).toThrowError()
  expect(() =>
    render(<Quantity label="counter" onChange={{}} />),
  ).toThrowError()
})

it('renders Counter', () => {
  render(<Quantity label="counter" />)
  screen.getByTestId('Counter')
})
