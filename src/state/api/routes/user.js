import { TAGS, API, PATH } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: `${PATH.USERS_ROUTE}`,
        method: API.GET,
        providesTags: [TAGS.USERS],
      };
    },
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => {
      return {
        url: `${PATH.USER_ID_ROUTE.replace(":id", id)}`,
        method: API.GET,
        providesTags: [TAGS.USERS],
      };
    },
  });
};

export const Add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${PATH.USERS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USERS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.EDIT_USER_ID_ROUTE.replace(":id", id)}`,
      method: "PATCH",
      body: payload,
    }),
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${PATH.USER_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.USERS],
  });
};

export const sendOtpByEmail = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${PATH.SEND_OTP_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
  });
};

export default {
  getAll,
  getById,
  Add,
  updateById,
  deleteById,
  sendOtpByEmail,
};
