import { TAGS } from "../../../constants";

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

export const logout = () => {
  builder.mutation({
    query: () => {
      return {
        url: "/logout",
        method: "GET",
      };
    },
  });
};

export default {
  login,
  logout,
};
