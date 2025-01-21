import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    name: "",
    brands: [],
    minPrice: 0,
    maxPrice: 0,
    ratings: [],
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.info.name = action.payload.search;
      state.info.minPrice = action.payload.minPrice;
      state.info.maxPrice = action.payload.maxPrice;
      state.info.brands.push(action.payload.findBrand);
      state.info.ratings.push(action.payload.selectedRatings);
    },
    clearFilter: (state) => {
      state.info.name = "";
      state.info.minPrice = 0;
      state.info.maxPrice = 0;
      state.info.brands = [];
      state.info.ratings = [];
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
