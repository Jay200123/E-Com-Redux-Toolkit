import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAGS, API, RESOURCE } from "../../constants";
import AuthApi from "./routes/auth";
import ProductApi from "./routes/products";
import UserApi from "./routes/user";

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
    getProducts: ProductApi.getAll(builder),
    getProductById: ProductApi.getById(builder),
    addProduct: ProductApi.Add(builder),
    updateProduct: ProductApi.updateById(builder),
    deleteProduct: ProductApi.deleteById(builder),
    getUsers: UserApi.getAll(builder),
    getUserById: UserApi.getById(builder),
    addUser: UserApi.Add(builder),
    updateUser: UserApi.updateById(builder),
    deleteUser: UserApi.deleteById(builder),
  }),
});         

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
