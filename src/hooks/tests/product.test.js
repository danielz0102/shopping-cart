import { expect, test, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

import { useProducts } from '../products'
import { getProducts } from '@/services/fakeStore'

vi.mock('@/services/fakeStore')

test('returns loading true at first, then returns the products when resolved', async () => {
  vi.mocked(getProducts).mockResolvedValue([1, 2, 3])

  const { result } = renderHook(() => useProducts())
  const { products, loading, error } = result.current

  expect(products).toEqual([])
  expect(loading).toBe(true)
  expect(error).toBe(false)

  await waitFor(() => {
    expect(result.current.loading).toBe(false)
  })

  const { products: newProducts, error: newError } = result.current
  expect(newProducts).toEqual([1, 2, 3])
  expect(newError).toBe(false)
})

test('returns an error when is rejected', async () => {
  vi.mocked(getProducts).mockRejectedValue(new Error('Error'))

  const { result } = renderHook(() => useProducts())

  await waitFor(() => {
    expect(result.current.products).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(true)
  })
})
