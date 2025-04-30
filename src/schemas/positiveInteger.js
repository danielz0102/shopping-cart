import z from 'zod'

export const positiveIntegerSchema = z.number().int().positive()

export function validatePositiveInteger(value) {
  positiveIntegerSchema.parse(value)
}
