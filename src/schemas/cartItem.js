import z from 'zod'
import { productSchema } from './product'

export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().int().min(1),
})

export function validateCartItem(cartItem) {
  cartItemSchema.parse(cartItem)
}
