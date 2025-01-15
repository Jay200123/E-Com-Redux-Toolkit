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

export default {
  login,
};
