import { TAGS, API, PATH } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: `${PATH.PRODUCTS_ROUTE}`,
        method: API.GET,
        providesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => {
      return {
        url: `${PATH.PRODUCT_ID_ROUTE.replace(":id", id)}`,
        method: API.GET,
        providesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => {
      return {
        url: `${PATH.PRODUCTS_ROUTE}`,
        method: "POST",
        body: payload,
        invalidatesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${PATH.EDIT_PRODUCT_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
        invalidatesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `${PATH.PRODUCT_ID_ROUTE.replace(":id", id)}`,
        method: API.DELETE,
        invalidatesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export default {
  getAll,
  getById,
  Add,
  updateById,
  deleteById,
};
