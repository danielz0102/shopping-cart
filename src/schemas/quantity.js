import z from 'zod'

export const quantitySchema = z.number().int().min(1).default(1)

export function validateQuantity(quantity) {
  return quantitySchema.safeParse(quantity)
}
