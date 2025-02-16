import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAGS, API, RESOURCE } from "../../constants";
import AuthApi from "./routes/auth";
import ProductApi from "./routes/products";
import UserApi from "./routes/user";
import BrandApi from "./routes/brand";
import OrderApi from "./routes/order";
import RatingApi from "./routes/rating";


const prepareHeaders = (headers, { getState }) => {
  if (getState()?.auth?.isAuthenticated && getState()?.auth?.token) {
    headers.set("authorization", `Bearer ${getState()?.auth?.token}`);
    headers.set("accept", `application/json`);
  }

  return headers;
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
    getBrands: BrandApi.getAll(builder),
    getBrandById: BrandApi.getById(builder),
    addBrand: BrandApi.Add(builder),
    updateBrand: BrandApi.updateById(builder),
    deleteBrand: BrandApi.deleteById(builder),
    getOrders: OrderApi.getAll(builder),
    getOrderById: OrderApi.getById(builder),
    addOrder: OrderApi.Add(builder),
    updateOrder: OrderApi.updateById(builder),
    deleteOrder: OrderApi.deleteById(builder),
    getRatings: RatingApi.getAll(builder),
    getRatingById: RatingApi.getById(builder),
    addRating: RatingApi.Add(builder),
    updateRating: RatingApi.updateById(builder),
    deleteRating: RatingApi.deleteById(builder),
    packedOrder: OrderApi.packedById(builder),
    shippedOrder: OrderApi.shippedById(builder),
    deliverOrder: OrderApi.deliveryById(builder),
    logout: AuthApi.logout(builder),
    cancelOrder: OrderApi.cancelById(builder),
    approvedCancelOrder: OrderApi.approvedCancelById(builder),
    sendOtp: UserApi.sendOtpByEmail(builder),
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
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetRatingsQuery,
  useGetRatingByIdQuery,
  useAddRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  usePackedOrderMutation,
  useShippedOrderMutation,
  useDeliverOrderMutation,
  useLogoutMutation,
  useCancelOrderMutation,
  useApprovedCancelOrderMutation,
  useSendOtpMutation,
} = api;
