import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Counter from '.'

describe('Props', () => {
  it('throws error if label is not a string, is not provided or is an empty string', () => {
    expect(() => render(<Counter />)).toThrowError()
    expect(() => render(<Counter label={1} />)).toThrowError()
    expect(() => render(<Counter label="" />)).toThrowError()
  })

  it('throws error if min is not a number', () => {
    expect(() => render(<Counter label="counter" min="1" />)).toThrowError()
    expect(() => render(<Counter label="counter" min={true} />)).toThrowError()
    expect(() => render(<Counter label="counter" min={{}} />)).toThrowError()
  })

  it('throws error if initialCount is not a number', () => {
    expect(() =>
      render(<Counter label="counter" initialCount="1" />),
    ).toThrowError()
    expect(() =>
      render(<Counter label="counter" initialCount={true} />),
    ).toThrowError()
    expect(() =>
      render(<Counter label="counter" initialCount={{}} />),
    ).toThrowError()
  })

  it('throws error if onChange is not a function', () => {
    expect(() =>
      render(<Counter label="counter" onChange={1} />),
    ).toThrowError()
    expect(() =>
      render(<Counter label="counter" onChange={true} />),
    ).toThrowError()
    expect(() =>
      render(<Counter label="counter" onChange={{}} />),
    ).toThrowError()
  })

  it('calls onChange with current count when the value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Counter label="counter" initialCount={1} onChange={onChange} />)
    const input = screen.getByRole('spinbutton')

    await user.clear(input)
    await user.type(input, '25')
    await user.click(screen.getByRole('button', { name: 'decrement' }))
    await user.click(screen.getByRole('button', { name: 'increment' }))
    await user.click(screen.getByRole('button', { name: 'increment' }))

    expect(onChange).toHaveBeenCalledWith(24)
    expect(onChange).toHaveBeenCalledWith(25)
    expect(onChange).toHaveBeenCalledWith(26)
  })

  it('updates the count when initialCount changes', () => {
    const { rerender } = render(<Counter label="counter" initialCount={1} />)
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveValue(1)

    rerender(<Counter label="counter" initialCount={2} />)

    expect(input).toHaveValue(2)
  })
})

describe('Number input', () => {
  it('renders the label provided', () => {
    render(<Counter label="counter" />)
    screen.getByRole('spinbutton', { name: 'counter' })
  })

  it('renders the initial count', () => {
    render(<Counter label="counter" initialCount={1} />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue(1)
  })

  it('renders 0 as initial count if is not provided', () => {
    render(<Counter label="counter" />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue(0)
  })

  it('changes the value by user input', async () => {
    const user = userEvent.setup()
    render(<Counter label="counter" initialCount={1} />)
    const input = screen.getByRole('spinbutton')

    await user.clear(input)
    await user.type(input, '25')

    expect(input).toHaveValue(25)

    await user.type(input, '25')

    expect(input).toHaveValue(2525)
  })

  it('resets the value to the initial count if the input is less than min, not a number, or empty', async () => {
    const user = userEvent.setup()
    render(<Counter label="counter" initialCount={1} min={0} />)
    const input = screen.getByRole('spinbutton')

    await user.clear(input)
    await user.type(input, '-1')
    await user.tab()

    expect(input).toHaveValue(0)

    await user.clear(input)
    await user.type(input, 'aaa')
    await user.tab()

    expect(input).toHaveValue(0)

    await user.clear(input)
    await user.tab()

    expect(input).toHaveValue(0)
  })

  it('calls onChange with the current value when the input is valid', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Counter label="counter" initialCount={1} onChange={onChange} />)
    const input = screen.getByRole('spinbutton')

    await user.clear(input)
    await user.type(input, '25')
    await user.tab()

    expect(onChange).toHaveBeenCalledWith(25)
  })
})

it('has a button to increment', async () => {
  const user = userEvent.setup()
  render(<Counter label="counter" initialCount={1} />)

  await user.click(screen.getByRole('button', { name: 'increment' }))

  expect(screen.getByRole('spinbutton')).toHaveValue(2)
})

describe('Decrement button', () => {
  it('decrements the count', async () => {
    const user = userEvent.setup()
    render(<Counter label="counter" initialCount={1} min={0} />)

    await user.click(screen.getByRole('button', { name: 'decrement' }))

    expect(screen.getByRole('spinbutton')).toHaveValue(0)
  })

  it('does not decrement below the min value', async () => {
    const user = userEvent.setup()
    render(<Counter label="counter" initialCount={1} min={0} />)

    await user.click(screen.getByRole('button', { name: 'decrement' }))
    await user.click(screen.getByRole('button', { name: 'decrement' }))

    expect(screen.getByRole('spinbutton')).toHaveValue(0)
  })
})
