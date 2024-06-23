import { createSlice } from "@reduxjs/toolkit";

// Create cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
    address: null,
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
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    removeAddress: (state) => {
      state.address = null;
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
  setAddress,
  removeAddress,
  clearCartItemCount,
} = cartSlice.actions;
