import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'frontend/src/store/slices/authSlice';
import { orderReducer } from 'frontend/src/store/slices/orderSlice';
import { inventoryReducer } from 'frontend/src/store/slices/inventorySlice';

const configureAppStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      order: orderReducer,
      inventory: inventoryReducer,
    },
  });
};

export const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;