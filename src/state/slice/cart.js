import { createSlice } from "@reduxjs/toolkit";

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
          orderQty: action.payload.quantity,
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
        existingItem.orderQty - 1;
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
