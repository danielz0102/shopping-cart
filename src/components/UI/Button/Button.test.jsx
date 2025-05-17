import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from '.'

test('rendres children properly', () => {
  render(<Button>Test</Button>)
  screen.getByRole('button', { name: /test/i })
})

test('receives an onClick function', () => {
  expect(() => render(<Button onClick={1}>Test</Button>)).toThrow()
  expect(() => {
    render(<Button onClick={'123'}>Test</Button>)
  }).toThrow()
  expect(() => {
    render(<Button onClick={{}}>Test</Button>)
  }).toThrow()
})

test('receives a className prop', () => {
  expect(() => render(<Button className={1}>Test</Button>)).toThrow()
  expect(() => {
    render(<Button className={true}>Test</Button>)
  }).toThrow()
  expect(() => {
    render(<Button className={{}}>Test</Button>)
  }).toThrow()
})

test('throws an error if type is not a string', () => {
  expect(() =>
    render(
      <Button onClick={1} type={1}>
        Test
      </Button>,
    ),
  ).toThrow()
  expect(() =>
    render(
      <Button onClick={1} type={{}}>
        Test
      </Button>,
    ),
  ).toThrow()
})

test('calls onClick function when clicked', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Test</Button>)

  await user.click(screen.getByRole('button', { name: /test/i }))

  expect(onClick).toHaveBeenCalled()
})

test('renders with the classname provided', () => {
  render(<Button className="hola">Test</Button>)
  expect(screen.getByRole('button')).toHaveClass('hola')
})
