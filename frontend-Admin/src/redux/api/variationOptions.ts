import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateVariationOptionType,
  UpdateVariationOptionType,
  VariationOptionResponse,
} from "../../types/apiTypes";
import { createVariationOption } from "../../types/types";
export const variationOptions = createApi({
  reducerPath: "variationOptions",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/variationOptions/`,
  }),
  tagTypes: ["VariationOption"],
  endpoints: (builder) => ({
    GetAllVariationOptions: builder.query<VariationOptionResponse, void>({
      query: () => `all`,
      providesTags: ["VariationOption"],
    }),

    CreateVariationOptions: builder.mutation<
      CreateVariationOptionType,
      createVariationOption
    >({
      query: (variationOptions) => ({
        url: `post`,
        method: "POST",
        body: variationOptions,
      }),
      invalidatesTags: ["VariationOption"],
    }),
    DeleteVariationOption: builder.mutation<CreateVariationOptionType, string>({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["VariationOption"],
    }),
    UpdateVariationOptions: builder.mutation<
      CreateVariationOptionType,
      UpdateVariationOptionType
    >({
      query: ({ id, name, price }) => ({
        url: `${id}`,
        method: "PUT",
        body: {
          name,
          price,
        },
      }),
      invalidatesTags: ["VariationOption"],
    }),
  }),
});

export const {
  useGetAllVariationOptionsQuery,
  useCreateVariationOptionsMutation,
  useUpdateVariationOptionsMutation,
  useDeleteVariationOptionMutation,
} = variationOptions;
