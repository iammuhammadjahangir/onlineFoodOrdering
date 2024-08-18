import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllBannerResponseType,
  BulkDiscountInitialType,
  BulkDiscountResponse,
  updateStatusType,
} from "../../types/apiTypes";

export const bulkCategory = createApi({
  reducerPath: "bulkCategory",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/bulkCategoryDiscount/`,
  }),
  tagTypes: ["BulkCategory"],
  endpoints: (builder) => ({
    getAllBulkCategoryDiscount: builder.query<BulkDiscountResponse, void>({
      query: () => "all",
      providesTags: ["BulkCategory"],
    }),
    createNewBulkCategoryDiscount: builder.mutation<
      BulkDiscountResponse,
      BulkDiscountInitialType
    >({
      query: ({
        startDate,
        endDate,
        brandName,
        categories,
        disableCategoryAfterExpiry,
        discountPercentage,
      }) => {
        return {
          url: "admin/new",
          method: "POST",
          body: {
            startDate,
            brandName,
            endDate,
            categories,
            disableCategoryAfterExpiry,
            discountPercentage,
          },
        };
      },
      invalidatesTags: ["BulkCategory"],
    }),
    updateBulkCategoryDiscount: builder.mutation<
      AllBannerResponseType,
      BulkDiscountInitialType & { id: string }
    >({
      query: ({
        id,
        startDate,
        endDate,
        brandName,
        categories,
        disableCategoryAfterExpiry,
        discountPercentage,
      }) => {
        return {
          url: `admin/${id}`,
          method: "PUT",
          body: {
            startDate,
            brandName,
            endDate,
            categories,
            disableCategoryAfterExpiry,
            discountPercentage,
          },
        };
      },
      invalidatesTags: ["BulkCategory"],
    }),
    updateBulkCategoryStatus: builder.mutation<
      BulkDiscountResponse,
      updateStatusType
    >({
      query: ({ id, status }) => ({
        url: `admin/status/${id}`,
        method: "PUT",
        body: {
          status,
        },
      }),
      invalidatesTags: ["BulkCategory"],
    }),
  }),
});

export const {
  useGetAllBulkCategoryDiscountQuery,
  useUpdateBulkCategoryStatusMutation,
  useCreateNewBulkCategoryDiscountMutation,
  useUpdateBulkCategoryDiscountMutation,
} = bulkCategory;
