import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllRolesArray } from "../../types/apiTypes";
export const roles = createApi({
  reducerPath: "roles",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/role/`,
  }),
  endpoints: (builder) => ({
    GetAllRoles: builder.query<AllRolesArray, void>({
      query: () => `get`,
    }),
  }),
});

export const { useGetAllRolesQuery } = roles;
