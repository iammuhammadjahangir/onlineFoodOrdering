import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductResponse,
  SearchItemsRequest,
  SearchItemsResponse,
} from "../../types/apiTypes";

export const itemsAPI = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/items/`,
  }),
  //   tagTypes: [],
  endpoints: (builder) => ({
    allItems: builder.query<AllProductResponse, string>({
      query: () => `all`,
    }),
    searchItem: builder.query<SearchItemsResponse, SearchItemsRequest>({
      query: ({ search, page, price, category, sort }) => {
        let base = `search?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
    }),
  }),
});

export const { useAllItemsQuery, useSearchItemQuery } = itemsAPI;
