import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllWareHousesType } from "../../types/apiTypes";
export const wareHouse = createApi({
  reducerPath: "wareHouse",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/wareHouse/`,
  }),
  tagTypes: ["wareHouse"],
  endpoints: (builder) => ({
    getAllWareHouses: builder.query<GetAllWareHousesType, void>({
      query: () => `getAll`,
      providesTags: ["wareHouse"],
    }),
  }),
});

export const { useGetAllWareHousesQuery } = wareHouse;
