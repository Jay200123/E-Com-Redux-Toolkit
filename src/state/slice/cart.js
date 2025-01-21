import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/reducer";

const initialState = {
  item: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (existingItem) {
        existingItem.orderQty += 1;
      } else {
        state.item.push({
          ...action.payload,
          product: action.payload.product,
          orderQty: action.payload.orderQty,
        });
      }
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.product._id === action.payload
      );

      if (existingItem) {
        existingItem.orderQty += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.product._id === action.payload
      );

      if (existingItem) {
        existingItem.orderQty -= 1;
      }
    },
    removeCart: (state, action) => {
      state.item = state.item.filter(
        (item) => item.product._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.item = [];
    },
    setState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.addOrder.matchFulfilled, (state) => {
      state.item = [];
    });
  },
});

export const {
  addCart,
  increaseQuantity,
  decreaseQuantity,
  removeCart,
  clearState,
  setState,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
