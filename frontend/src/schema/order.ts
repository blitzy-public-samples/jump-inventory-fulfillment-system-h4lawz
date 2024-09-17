import { z } from 'zod';

const OrderItemSchema = z.object({
  product_id: z.number(),
  sku: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive()
});

const OrderSchema = z.object({
  shopify_order_id: z.string(),
  status: z.enum(['pending', 'processing', 'fulfilled', 'cancelled']),
  order_date: z.date(),
  items: z.array(OrderItemSchema),
  tracking_number: z.string().optional(),
  fulfilled_at: z.date().optional()
});

type Order = z.infer<typeof OrderSchema>;
type OrderItem = z.infer<typeof OrderItemSchema>;

// HUMAN ASSISTANCE NEEDED
// The following function needs more details about the ShopifyOrder type and structure
// to accurately transform the data. Please review and provide additional information.
function createOrderFromShopify(shopifyOrder: any): Order {
  const transformedOrder = {
    shopify_order_id: shopifyOrder.id,
    status: shopifyOrder.fulfillment_status || 'pending',
    order_date: new Date(shopifyOrder.created_at),
    items: shopifyOrder.line_items.map((item: any) => ({
      product_id: item.product_id,
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    tracking_number: shopifyOrder.tracking_number,
    fulfilled_at: shopifyOrder.fulfilled_at ? new Date(shopifyOrder.fulfilled_at) : undefined
  };

  return OrderSchema.parse(transformedOrder);
}

export { OrderSchema, OrderItemSchema, createOrderFromShopify };
export type { Order, OrderItem };