import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUSersResponse } from "../../types/apiTypes";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/customer/`,
  }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    allCustomer: builder.query<AllUSersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Customer"],
    }),
  }),
});

export const { useAllCustomerQuery } = customerApi;
