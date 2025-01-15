import { TAGS } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: "/users",
    method: "GET",
    providesTags: [TAGS.USERS],
  });
};
export const getById = (builder) => {
  return builder.query({
    query: (id) => `/user/${id}`,
    method: "GET",
    providesTags: [TAGS.USERS],
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: "/user",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: [TAGS.USERS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => ({
      url: `/user/edit/${id}`,
      method: "PATCH",
      body: payload,
    }),
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `/user/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: [TAGS.USERS],
  });
};

export default {
  getAll,
  getById,
  Add,
  updateById,
  deleteById,
};
