import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: "",
  brand: "",
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
  },
});

export const { setCategory, clearCategory, setBrand, clearBrand } =
  categorySlice.actions;
export default categorySlice.reducer;
