import { createApiInstance } from 'frontend/src/services/api';

interface InventoryItem {
  // Define the structure of an inventory item here
  // This is a placeholder and should be replaced with the actual structure
  id: string;
  name: string;
  quantity: number;
  // Add other properties as needed
}

export async function fetchInventory(params: object): Promise<InventoryItem[]> {
  const api = createApiInstance();
  const response = await api.get('/inventory', { params });
  return response.data;
}

export async function updateInventoryItem(itemId: string, itemData: object): Promise<InventoryItem> {
  const api = createApiInstance();
  const response = await api.put(`/inventory/${itemId}`, itemData);
  return response.data;
}