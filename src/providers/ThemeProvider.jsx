import { useDarkMode } from '@/hooks/useDarkMode'
import { ThemeContext } from './contexts'

export default function ThemeProvider({ children }) {
  const { isDark, setIsDark } = useDarkMode()

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
