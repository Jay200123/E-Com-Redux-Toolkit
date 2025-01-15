import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./slice/auth";
import CartReducer from "./slice/cart";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
  [api.reducerPath]: api.reducer,
});
