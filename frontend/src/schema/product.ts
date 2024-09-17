import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  shopify_product_id: z.string(),
  name: z.string(),
  sku: z.string(),
  barcode: z.string().optional(),
  price: z.number().positive().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// HUMAN ASSISTANCE NEEDED
// The following function needs review and possible modifications for production readiness
export function createProductFromShopify(shopifyProduct: any): Product {
  // Extract relevant data from Shopify product
  const transformedProduct = {
    id: shopifyProduct.id,
    shopify_product_id: shopifyProduct.id.toString(),
    name: shopifyProduct.title,
    sku: shopifyProduct.variants[0]?.sku || '',
    barcode: shopifyProduct.variants[0]?.barcode,
    price: shopifyProduct.variants[0]?.price ? parseFloat(shopifyProduct.variants[0].price) : undefined,
  };

  // Validate transformed data against ProductSchema
  const validatedProduct = ProductSchema.parse(transformedProduct);

  return validatedProduct;
}