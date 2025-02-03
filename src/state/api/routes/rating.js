import { TAGS, API, PATH } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: `${PATH.RATINGS_ROUTE}`,
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
        url: `${PATH.RATING_ID_ROUTE.replace(":id", id)}`,
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
        url: `${PATH.RATINGS_ROUTE}`,
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
        url: `${PATH.EDIT_RATING_ID_ROUTE.replace(":id", id)}`,
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
        url: `${PATH.RATING_ID_ROUTE.replace(":id", id)}`,
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
