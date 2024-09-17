import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInventory, updateInventoryItem } from 'frontend/src/services/inventory';
import { InventoryItem } from 'frontend/src/schema/inventory';

// HUMAN ASSISTANCE NEEDED
// The fetchInventoryAsync and updateInventoryItemAsync functions have a confidence level below 0.8.
// Please review and adjust as necessary.

export const fetchInventoryAsync = createAsyncThunk(
  'inventory/fetchInventory',
  async (_, { dispatch }) => {
    try {
      const inventory = await fetchInventory();
      dispatch(setInventoryItems(inventory));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const updateInventoryItemAsync = createAsyncThunk(
  'inventory/updateInventoryItem',
  async (itemData: InventoryItem, { dispatch }) => {
    try {
      const updatedItem = await updateInventoryItem(itemData);
      dispatch(updateInventoryItem(updatedItem));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [] as InventoryItem[],
    error: '',
    loading: false,
  },
  reducers: {
    setInventoryItems: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
    },
    updateInventoryItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setInventoryItems, updateInventoryItem, setError, setLoading } = inventorySlice.actions;

export default inventorySlice.reducer;