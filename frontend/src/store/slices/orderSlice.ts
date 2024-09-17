import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, updateOrder } from 'frontend/src/services/orders';
import { Order } from 'frontend/src/schema/order';

// HUMAN ASSISTANCE NEEDED
// The fetchOrdersAsync and updateOrderAsync functions have a confidence level below 0.8.
// Please review and adjust as necessary for production readiness.

export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { dispatch }) => {
    try {
      const orders = await fetchOrders();
      dispatch(setOrders(orders));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
  async (orderData: Partial<Order>, { dispatch }) => {
    try {
      const updatedOrder = await updateOrder(orderData);
      dispatch(updateOrder(updatedOrder));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [] as Order[],
    error: '',
    loading: false,
  },
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
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

export const { setOrders, updateOrder, setError, setLoading } = orderSlice.actions;
export default orderSlice.reducer;