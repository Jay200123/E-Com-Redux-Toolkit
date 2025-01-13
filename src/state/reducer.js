import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./slice/auth";

export const rootReducer = combineReducers({
  auth: AuthReducer,
});
