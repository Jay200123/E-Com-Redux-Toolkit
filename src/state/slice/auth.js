import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/reducer";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: {
      reducer(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.details;
      state.token = action.payload.access;
      state.isAuthenticated = true;
    });

    builder.addMatcher(api.endpoints.login.matchRejected, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    builder.addMatcher(api.endpoints.updateUser.matchFulfilled, (state, action) => {
      state.user = action.payload.details;
    })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
