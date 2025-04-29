import z from 'zod'
import { quantitySchema } from './quantity.js'

export const productSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().optional(),
  image: z.string().url(),
  price: z.number(),
  quantity: quantitySchema.optional(),
})

export function validateProduct(product) {
  return productSchema.safeParse(product)
}
