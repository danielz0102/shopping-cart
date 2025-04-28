import './App.css'
import { Outlet } from 'react-router-dom'
import { CartContext } from '@/contexts'

import Navbar from '../Navbar'
import { useCart } from '@/hooks/cart'

function App() {
  const { cart, setCart, utils } = useCart()

  return (
    <CartContext.Provider value={{ cart, setCart, utils }}>
      <Navbar />
      <Outlet />
    </CartContext.Provider>
  )
}

export default App
