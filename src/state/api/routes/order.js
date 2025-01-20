import { TAGS, API } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: "/orders",
        method: API.GET,
        providesTags: TAGS.ORDERS,
      };
    },
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => {
      return {
        url: `/order/${id}`,
        method: API.GET,
        providesTags: TAGS.ORDERS,
      };
    },
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => {
      return {
        url: "/orders",
        method: API.POST,
        body: payload,
        invalidatesTags: [TAGS.ORDERS],
      };
    },
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `/order/edit/${id}`,
        method: API.PATCH,
        body: payload,
        invalidatesTags: [TAGS.ORDERS],
      };
    },
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `/order/${id}`,
        method: API.DELETE,
        invalidatesTags: [TAGS.ORDERS],
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
