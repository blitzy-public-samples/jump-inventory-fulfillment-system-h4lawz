import { z } from 'zod';

export const InventoryItemSchema = z.object({
  product_id: z.number(),
  sku: z.string(),
  name: z.string(),
  quantity: z.number().int().nonnegative(),
  location: z.string().optional(),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;

const InventoryUpdateSchema = z.object({
  items: z.array(InventoryItemSchema),
});

export function validateInventoryUpdate(data: unknown) {
  try {
    return InventoryUpdateSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid inventory update data: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}

// HUMAN ASSISTANCE NEEDED
// The following aspects might need review or additional implementation:
// 1. Error handling: Consider creating custom error types for better error management.
// 2. Logging: Add logging for tracking validation errors in production.
// 3. Performance: For large datasets, consider implementing batch validation or streaming.
// 4. Security: Ensure that the validation process doesn't expose sensitive information in error messages.