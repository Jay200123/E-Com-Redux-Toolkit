import { TAGS } from "../../../constants/index";

export const login = (builder) => {
  return builder.mutation({
    query: (payload) => {
      return {
        url: "/login",
        method: "POST",
        body: payload,
      };
    },
  });
};

export const logout = (builder) => {
  return builder.mutation({
    query: () => {
      return {
        url: "/logout",
        method: "POST",
      };
    },
  });
};

export default {
  login,
  logout,
};
