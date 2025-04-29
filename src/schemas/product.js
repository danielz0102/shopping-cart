import z from 'zod'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  price: z.number(),
  quantity: z.number().default(1),
})
