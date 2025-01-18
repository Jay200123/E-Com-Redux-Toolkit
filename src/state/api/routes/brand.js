import { TAGS } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => ({
      url: "/brands",
      method: "GET",
      providesTags: [TAGS.BRANDS],
    }),
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => ({
      url: `/brand/${id}`,
      method: "GET",
      providesTags: [TAGS.BRANDS],
    }),
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: "/brands",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => ({
      url: `/brand/edit/${id}`,
      method: "PATCH",
      body: payload,
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `/brand/${id}`,
      method: "DELETE",
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
