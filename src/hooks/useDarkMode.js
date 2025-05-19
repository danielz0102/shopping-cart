import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export function useDarkMode() {
  const prefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' })
  const [isDark, setIsDark] = useState(prefersDark)

  useEffect(() => {
    document.querySelector('#root')?.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, setIsDark }
}
