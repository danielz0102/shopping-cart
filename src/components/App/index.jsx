import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import CartProvider from '@/providers/CartProvider'
import ThemeProvider from '@/providers/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Navbar />
        <Outlet />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
