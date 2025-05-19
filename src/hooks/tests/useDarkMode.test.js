import { test, expect, expectTypeOf, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useDarkMode } from '../useDarkMode'

vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(),
}))

import { useMediaQuery } from 'react-responsive'

test('returns an object with a state', () => {
  const { result } = renderHook(() => useDarkMode())

  expectTypeOf(result.current).toBeBoolean()
  expectTypeOf(result.current.isDark).toBeBoolean()
  expectTypeOf(result.current.setIsDark).toBeFunction()
})

test('returns true if user prefers dark mode', () => {
  useMediaQuery.mockReturnValue(true)

  const { result } = renderHook(() => useDarkMode())

  expect(result.current.isDark).toBe(true)
})

test('returns false if user prefers dark mode', () => {
  useMediaQuery.mockReturnValue(false)

  const { result } = renderHook(() => useDarkMode())

  expect(result.current.isDark).toBe(false)
})

test('toggles "dark" class on #root element when isDark changes', () => {
  const rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)

  useMediaQuery.mockReturnValue(false)
  const { result } = renderHook(() => useDarkMode())

  expect(rootElement.classList.contains('dark')).toBe(false)

  act(() => {
    result.current.setIsDark(true)
  })

  expect(rootElement.classList.contains('dark')).toBe(true)

  act(() => {
    result.current.setIsDark(false)
  })

  expect(rootElement.classList.contains('dark')).toBe(false)

  document.body.removeChild(rootElement)
})
