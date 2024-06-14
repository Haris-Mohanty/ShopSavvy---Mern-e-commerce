import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { spinnerSlice } from "./spinnerSlice";
import { userSlice } from "./userSlice";
import { cartSlice } from "./cartSlice";

const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  user: userSlice.reducer,
  cart: cartSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
