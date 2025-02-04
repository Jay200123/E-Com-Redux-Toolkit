import { TAGS, API, PATH } from "../../../constants";

export const getAll = (builder) => {
  return builder.query({
    query: () => {
      return {
        url: PATH.ORDERS_ROUTE,
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
        url: `${PATH.ORDER_ID_ROUTE.replace(":id", id)}`,
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
        url: PATH.ORDERS_ROUTE,
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
        url: `${PATH.EDIT_ORDER_ID_ROUTE.replace(":id", id)}`,
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
        url: `${PATH.ORDER_ID_ROUTE.replace(":id", id)}`,
        method: API.DELETE,
        invalidatesTags: [TAGS.ORDERS],
      };
    },
  });
};

export const packedById = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `${PATH.PACKED_ORDER_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        invalidatesTags: [TAGS.ORDERS],
      };
    },
  });
};

export const shippedById = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `${PATH.SHIPPED_ORDER_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        invalidatesTags: [TAGS.ORDERS],
      };
    },
  });
};

export const deliveryById = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `${PATH.DELIVERED_ORDER_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        invalidatesTags: [TAGS.ORDERS],
      };
    },
  });
};

export const cancelById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${PATH.CANCEL_ORDER_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.ORDERS], 
  });
};

const approvedCancelById = (builder)=>{
  return builder.mutation({
    query: (id)=>{
      return {
        url:``,
        method: API.PATCH,
      }
    },
    invalidatesTags: [TAGS.ORDERS], 
  })
}


export default {
  getAll,
  getById,
  Add,
  updateById,
  deleteById,
  packedById,
  shippedById,
  deliveryById,
  cancelById,
  approvedCancelById
};
