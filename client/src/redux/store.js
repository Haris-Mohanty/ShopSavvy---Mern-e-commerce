import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { spinnerSlice } from "./spinnerSlice";
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
