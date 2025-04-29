import { useCart } from '@/hooks/cart'
import { CartContext } from './contexts'

export default function CartProvider({ children, initialProducts = [] }) {
  const { cart, setCart, utils } = useCart(initialProducts)

  return (
    <CartContext.Provider value={{ cart, setCart, utils }}>
      {children}
    </CartContext.Provider>
  )
}
