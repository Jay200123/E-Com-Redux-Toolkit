import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAGS, API, RESOURCE } from "../../constants";
import AuthApi  from "./routes/auth";

const prepareHeaders = (headers, { getState }) => {
  if (getState().auth.token && auth.isAuthenticated) {
    headers.set("authorization", `Bearer ${getState().auth.token}`);
    headers.set("accept", `application/json`);
    return headers;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: RESOURCE.API_URL,
  credentials: RESOURCE.INCLUDE,
  prepareHeaders,
});

export const api = createApi({
  reducerPath: TAGS.API,
  baseQuery,
  tagTypes: API.TAGS,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    login: AuthApi.login(builder),
  }),
});

export const { 
  useLoginMutation
} = api;
