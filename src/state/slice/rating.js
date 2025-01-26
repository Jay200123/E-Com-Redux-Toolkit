import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/reducer";

const initialState = {
  product: "",
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRate: (state, action) => {
      state.product = action.payload;
    },
    setState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.addRating.matchFulfilled, (state) => {
      state.product = "";
    });
  },
});

export const { setRate, setState } = ratingSlice.actions;
export default ratingSlice.reducer;
