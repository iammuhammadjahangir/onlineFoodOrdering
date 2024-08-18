import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllBannerResponseType,
  AllPromoCodeResponse,
  BulkDiscountResponse,
  PromoCodeInitialType,
  updateStatusType,
} from "../../types/apiTypes";

export const promoCode = createApi({
  reducerPath: "promoCode",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/promoCode/`,
  }),
  tagTypes: ["promoCode"],
  endpoints: (builder) => ({
    getAllPromoCodeDiscount: builder.query<AllPromoCodeResponse, void>({
      query: () => "all",
      providesTags: ["promoCode"],
    }),
    createNewPromoCodeDiscount: builder.mutation<
      BulkDiscountResponse,
      PromoCodeInitialType
    >({
      query: ({
        promoCode,
        startDate,
        endDate,
        forFirstTimeOnly,
        maxCount,
        maxCountPerUser,
        discountType,
        discountAmount,
        minimumOrderAmount,
        orderType,
        branches,
        applicableOnSections,
        freeProduct,
        specificCustomer,
        applicableOn,
        usedCount,
      }) => {
        return {
          url: "admin/new",
          method: "POST",
          body: {
            promoCode,
            startDate,
            endDate,
            forFirstTimeOnly,
            maxCount,
            maxCountPerUser,
            discountType,
            discountAmount,
            minimumOrderAmount,
            orderType,
            branches,
            applicableOnSections,
            freeProduct,
            specificCustomer,
            applicableOn,
            usedCount,
          },
        };
      },
      invalidatesTags: ["promoCode"],
    }),
    updatePromoCodeDiscount: builder.mutation<
      AllBannerResponseType,
      PromoCodeInitialType & { id: string }
    >({
      query: ({
        id,
        promoCode,
        startDate,
        endDate,
        forFirstTimeOnly,
        maxCount,
        maxCountPerUser,
        discountType,
        discountAmount,
        minimumOrderAmount,
        orderType,
        branches,
        applicableOnSections,
        freeProduct,
        specificCustomer,
        applicableOn,
        usedCount,
      }) => {
        return {
          url: `admin/${id}`,
          method: "PUT",
          body: {
            promoCode,
            startDate,
            endDate,
            forFirstTimeOnly,
            maxCount,
            maxCountPerUser,
            discountType,
            discountAmount,
            minimumOrderAmount,
            orderType,
            branches,
            applicableOnSections,
            freeProduct,
            specificCustomer,
            applicableOn,
            usedCount,
          },
        };
      },
      invalidatesTags: ["promoCode"],
    }),
    updatePromoCodeStatus: builder.mutation<
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
      invalidatesTags: ["promoCode"],
    }),
  }),
});

export const {
  useGetAllPromoCodeDiscountQuery,
  useUpdatePromoCodeStatusMutation,
  useCreateNewPromoCodeDiscountMutation,
  useUpdatePromoCodeDiscountMutation,
} = promoCode;
