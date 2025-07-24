// services/user/slices/feedSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedsResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchOrders = createAsyncThunk<TFeedsResponse>(
  'feed/fetchOrders',
  async () => {
    const response = await getFeedsApi(); // ← используем публичный эндпоинт
    return response;
  }
);

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle'
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.status = 'succeeded';
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default feedSlice.reducer;
