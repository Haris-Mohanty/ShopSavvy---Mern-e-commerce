import { createSlice } from "@reduxjs/toolkit";

// Create spinner slice
export const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = spinnerSlice.actions;
