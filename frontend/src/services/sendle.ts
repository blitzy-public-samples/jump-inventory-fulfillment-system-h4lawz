import { createApiInstance } from 'frontend/src/services/api';

// HUMAN ASSISTANCE NEEDED
// The following code needs review and potential modifications:
// 1. The exact structure of the orderData object is not specified
// 2. The ShippingLabel type is not defined
// 3. The exact endpoint for Sendle API is not provided
// 4. Error handling might need to be improved
// 5. Additional Sendle-specific parameters might be required

export async function generateShippingLabel(orderData: any): Promise<ShippingLabel> {
  const api = createApiInstance();
  
  try {
    const response = await api.post('/shipping/label', orderData);
    return response.data;
  } catch (error) {
    console.error('Error generating shipping label:', error);
    throw error;
  }
}