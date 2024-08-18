import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {} from "../../types/apiTypes";
import {
  createSubOption,
  CreateSubOptionResponse,
  GetAllSubOptionResponse,
  GetSearchedSubOptionRequest,
} from "../../types/types";
export const subOption = createApi({
  reducerPath: "subOption",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/subOption/`,
  }),
  tagTypes: ["subOption"],
  endpoints: (builder) => ({
    GetAllSubOptions: builder.query<GetAllSubOptionResponse, void>({
      query: () => `all`,
      providesTags: ["subOption"],
    }),
    CreateSubOption: builder.mutation<CreateSubOptionResponse, createSubOption>(
      {
        query: (subOption) => ({
          url: `post`,
          method: "POST",
          body: subOption,
        }),
        invalidatesTags: ["subOption"],
      }
    ),
    GetSearchedSubOption: builder.query<
      CreateSubOptionResponse,
      GetSearchedSubOptionRequest
    >({
      query: ({ id, branchID, itemID }) => {
        return {
          url: `search`,
          method: "GET",
          params: { id, branchID, itemID },
          // url: `search/${search}`,
          // method: "GET",
        };
      },
      providesTags: ["subOption"],
    }),
    DeleteSubOption: builder.mutation<GetAllSubOptionResponse, string>({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["subOption"],
    }),
    // UpdateVariation: builder.mutation<CreateVariationType, UpdateVariationType>(
    //   {
    //     query: ({ id, name, description, isRequired, variationOptions }) => ({
    //       url: `${id}`,
    //       method: "PUT",
    //       body: {
    //         name,
    //         description,
    //         isRequired,
    //         variationOptions,
    //       },
    //     }),
    //     invalidatesTags: ["Variation"],
    //   }
    // ),
  }),
});

export const {
  useGetAllSubOptionsQuery,
  useGetSearchedSubOptionQuery,
  useDeleteSubOptionMutation,
  useCreateSubOptionMutation,
} = subOption;
