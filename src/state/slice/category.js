import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: "",
  brand: "",
  isShop: false,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    clearCategory: (state) => {
      state.categories = "";
    },

    setBrand: (state, action) => {
      state.brand = action.payload;
    },

    clearBrand: (state) => {
      state.brand = "";
    },

    setShop: (state) => {
      state.isShop = true;
    },

    clearShop: (state) => {
      state.isShop = false;
    },
  },
});

export const { 
  setCategory,
  clearCategory,
  setBrand,
  clearBrand,
  setShop,
  clearShop,
} =
  categorySlice.actions;
export default categorySlice.reducer;
