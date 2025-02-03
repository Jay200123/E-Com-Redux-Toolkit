import { API, PATH } from "../../../constants";

export const login = (builder) => {
  return builder.mutation({
    query: (payload) => {
      return {
        url:  PATH.LOGIN_ROUTE,
        method: API.POST,
        body: payload,
      };
    },
  });
};

export const logout = (builder) => {
  return builder.mutation({
    query: () => {
      return {
        url: PATH.LOGOUT_ROUTE,
        method: API.POST,
      };
    },
  });
};

export default {
  login,
  logout,
};
