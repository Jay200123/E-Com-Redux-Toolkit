import { TAGS } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: "/products",
        method: "GET",
        providesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => {
      return {
        url: `/products/${id}`,
        method: "GET",
        providesTags: [TAGS.PRODUCTS],
      };
    },
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => {
      return {
        url: "/products",
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
        url: `/product/edit/${id}`,
        method: "PATCH",
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
        url: `/product/delete/${id}`,
        method: "DELETE",
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
