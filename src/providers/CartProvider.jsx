import { useCart } from '@/hooks/useCart'
import { CartContext } from './contexts'

export default function CartProvider({ children, initialCart = [] }) {
  const { cart, setCart, utils } = useCart(initialCart)

  return (
    <CartContext.Provider value={{ cart, setCart, utils }}>
      {children}
    </CartContext.Provider>
  )
}
