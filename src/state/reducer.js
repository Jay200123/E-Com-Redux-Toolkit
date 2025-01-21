import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./slice/auth";
import CartReducer from "./slice/cart";
import CategoryReducer from "./slice/category";
import FilterReducer from "./slice/filter";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
  category: CategoryReducer,  
  filter: FilterReducer,
  [api.reducerPath]: api.reducer,
});
