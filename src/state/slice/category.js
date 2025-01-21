import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: "",
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
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
