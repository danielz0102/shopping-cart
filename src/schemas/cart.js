import { productSchema } from './product'
import z from 'zod'

export const cartSchema = z.array(productSchema).optional()

export function validateCart(cart) {
  return cartSchema.safeParse(cart)
}
