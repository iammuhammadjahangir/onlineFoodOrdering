import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllBranchesType, updateStatusType } from "../../types/apiTypes";
import { BranchFormValues, UpdateBranchFormValues } from "../../types/types";
export const branch = createApi({
  reducerPath: "shops",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/branch/`,
  }),
  tagTypes: ["Branch"],
  endpoints: (builder) => ({
    getAllBranches: builder.query<GetAllBranchesType, void>({
      query: () => `getAll`,
      providesTags: ["Branch"],
    }),
    createNewBranch: builder.mutation<GetAllBranchesType, BranchFormValues>({
      query: (values) => {
        return {
          url: `new`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Branch"],
    }),
    updateBranch: builder.mutation<GetAllBranchesType, UpdateBranchFormValues>({
      query: ({ id, ...values }) => {
        return {
          url: `update/${id}`, // Assuming you want to include the `id` in the URL
          method: "PUT",
          body: values, // Spreading `values` directly into the body
        };
      },
      invalidatesTags: ["Branch"],
    }),

    updateBranchStatus: builder.mutation<GetAllBranchesType, updateStatusType>({
      query: ({ id, status }) => ({
        url: `updateStatus/${id}`,
        method: "PUT",
        body: {
          activityStatus: status,
        },
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetAllBranchesQuery,
  useUpdateBranchStatusMutation,
  useCreateNewBranchMutation,
  useUpdateBranchMutation,
} = branch;
