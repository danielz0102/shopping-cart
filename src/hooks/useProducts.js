import { useState } from 'react'
import { useEffect } from 'react'
import { getProducts } from '@/services/fakeStore'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}
