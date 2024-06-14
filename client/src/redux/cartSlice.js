import { createSlice } from "@reduxjs/toolkit";

// Create cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    setCartItemCount: (state, action) => {
      state.count = action.payload;
    },
    incrementCartItemCount: (state) => {
      state.count += 1;
    },
    decrementCartItemCount: (state) => {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
    clearCartItemCount: (state) => {
      state.count = 0;
    },
  },
});

export const {
  setCartItemCount,
  incrementCartItemCount,
  decrementCartItemCount,
  clearCartItemCount,
} = cartSlice.actions;
