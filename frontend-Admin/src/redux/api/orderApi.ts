import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  OrderResponse,
  SearchItemsRequest,
  SearchOrderResponse,
  SummaryOrderResponse,
} from "../../types/apiTypes";
import { processOrder, processPayment } from "../../types/types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    processOrder: builder.mutation<OrderResponse, processOrder>({
      query: ({
        id,
        statusComment,
        statusName,
        ownerShippingFee,
        ShippedCompany,
        TrackingNumber,
      }) => {
        // Initialize the body object with mandatory fields
        let body: any = {
          statusName,
          statusComment,
        };

        // Add ownerShippingFee if it exists
        if (ownerShippingFee !== undefined || ownerShippingFee !== "") {
          body = {
            ...body,
            ownerShippingFee,
          };
        }
        if (ShippedCompany !== undefined || ShippedCompany !== "") {
          body = {
            ...body,
            ShippedCompany,
          };
        }
        if (TrackingNumber !== undefined || TrackingNumber !== "") {
          body = {
            ...body,
            TrackingNumber,
          };
        }

        return {
          url: `updateStatus/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["order"],
    }),
    processPayment: builder.mutation<OrderResponse, processPayment>({
      query: ({ id, paymentStatus }) => {
        return {
          url: `processPayment/${id}`,
          method: "POST",
          body: { paymentStatus },
        };
      },
      invalidatesTags: ["order"],
    }),
    searchOrder: builder.query<SearchOrderResponse, SearchItemsRequest>({
      query: ({ search, page, price, category, sort }) => {
        console.log(search, page, price, category, sort);
        let base = `allOrders?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        console.log(base);

        return { url: base }; // Return the URL as an object with the 'url' property
      },
      providesTags: ["order"],
    }),
    orderSummary: builder.query<SummaryOrderResponse, void>({
      query: () => `summary`,
      providesTags: ["order"],
    }),
  }),
});

export const {
  useSearchOrderQuery,
  useProcessOrderMutation,
  useProcessPaymentMutation,
  useOrderSummaryQuery,
} = orderApi;
