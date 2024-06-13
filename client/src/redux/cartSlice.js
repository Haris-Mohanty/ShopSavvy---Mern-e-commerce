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
    deleteCartItemCount: (state, action) => {
      state.count = action.payload;
    },
    clearCartItemCount: (state) => {
      state.count = 0;
    },
  },
});

export const { setCartItemCount, deleteCartItemCount, clearCartItemCount } =
  cartSlice.actions;
