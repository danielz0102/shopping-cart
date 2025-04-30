import { cartItemSchema } from './cartItem'
import z from 'zod'

export const cartSchema = z.array(cartItemSchema).optional()

export function validateCart(cart) {
  cartSchema.parse(cart)
}
