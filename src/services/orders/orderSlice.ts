import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TOrderState = {
  orderNumber: number | null;
};

const initialState: TOrderState = {
  orderNumber: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderNumber: (state, action: PayloadAction<number>) => {
      state.orderNumber = action.payload;
    },
    clearOrder: (state) => {
      state.orderNumber = null;
    },
  },
});

export const { setOrderNumber, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
