import { TAGS, PATH, API } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => ({
      url: PATH.BRANDS_ROUTE,
      method: API.GET,
      providesTags: [TAGS.BRANDS],
    }),
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => ({
      url: `${PATH.BRAND_ID_ROUTE.replace(":id", id)}`,
      method: API.GET,
      providesTags: [TAGS.BRANDS],
    }),
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: PATH.BRANDS_ROUTE,
      method: API.POST, 
      body: payload,
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.EDIT_BRAND_ID_ROUTE.replace(":id", id)}`,
      method: API.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${PATH.BRAND_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE, 
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export default {
  getAll,
  getById,
  Add,
  updateById,
  deleteById,
};
