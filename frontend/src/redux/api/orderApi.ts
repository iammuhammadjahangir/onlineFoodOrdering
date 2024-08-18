import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MessageResponse,
  OrderType,
  // SearchItemsRequest,
  // SearchOrderResponse,
} from "../../types/apiTypes";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<MessageResponse, OrderType>({
      query: (order) => ({
        url: `placeOrder`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    searchOrder: builder.query<any, any>({
      query: ({ search, page, price, category, sort, customerId }) => {
        console.log(search, page, price, category, sort, customerId);
        let base = `allOrders?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        if (customerId) base += `&customerId=${customerId}`;

        console.log(base);

        return { url: base }; // Return the URL as an object with the 'url' property
      },
    }),
  }),
});

export const { usePlaceOrderMutation, useSearchOrderQuery } = orderApi;
