import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import ThemeToggle from '.'
import { ThemeContext } from '@/providers/contexts'

test('shows "Dark mode" when theme is dark', () => {
  renderThemeToggle(true)

  expect(screen.getByRole('button', { name: 'Dark mode' })).toBeInTheDocument()
})

test('shows "Light mode" when theme is light', () => {
  renderThemeToggle(false)

  expect(screen.getByRole('button', { name: 'Light mode' })).toBeInTheDocument()
})

function renderThemeToggle(isDark) {
  const setIsDark = vi.fn()

  render(
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ThemeToggle />
    </ThemeContext.Provider>,
  )

  return { setIsDark }
}
