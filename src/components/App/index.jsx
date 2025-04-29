import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import CartProvider from '@/providers/CartProvider'

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
  )
}

export default App
