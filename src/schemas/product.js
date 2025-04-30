import z from 'zod'

export const productSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  price: z.number(),
})

export function validateProduct(product) {
  productSchema.parse(product)
}
