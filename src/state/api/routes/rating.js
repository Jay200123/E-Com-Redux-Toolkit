import { TAGS, API } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: "/ratings",
        method: API.GET,
        providesTags: [TAGS.RATINGS],
      };
    },
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => {
      return {
        url: `/rating/${id}`,
        method: API.GET,
        providesTags: [TAGS.RATINGS],
      };
    },
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `/rate/order/${id}`,
        method: API.POST,
        body: payload,
        invalidatesTags: [TAGS.RATINGS],
      };
    },
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `/rating/edit/${id}`,
        method: API.PATCH,
        body: payload,
        invalidatesTags: [TAGS.RATINGS],
      };
    },
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `/rating/${id}`,
        method: API.DELETE,
        invalidatesTags: [TAGS.RATINGS],
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
