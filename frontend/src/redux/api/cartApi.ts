import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const initialState: CartItemType = {
//   customerId: "",
//   deliveryTime: new Date(),
//   instruction: "",
//   items: [],
// };

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/cart`,
  }),
  //   tagTypes: [],
  endpoints: () => ({}),
});
