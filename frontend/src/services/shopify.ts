import { createApiInstance } from 'frontend/src/services/api';

// HUMAN ASSISTANCE NEEDED
// The following functions have a confidence level below 0.8 and may need review for production readiness.
// Please verify the error handling, response processing, and any additional requirements.

export async function syncOrders(): Promise<void> {
  try {
    const api = createApiInstance();
    await api.post('/shopify/sync/orders');
    // TODO: Consider adding more detailed response handling
  } catch (error) {
    console.error('Error syncing orders:', error);
    // TODO: Implement proper error handling and potentially retry logic
    throw error;
  }
}

export async function syncProducts(): Promise<void> {
  try {
    const api = createApiInstance();
    await api.post('/shopify/sync/products');
    // TODO: Consider adding more detailed response handling
  } catch (error) {
    console.error('Error syncing products:', error);
    // TODO: Implement proper error handling and potentially retry logic
    throw error;
  }
}