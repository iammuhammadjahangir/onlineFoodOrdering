import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllSliderImageType } from "../../types/apiTypes";
export const carousalImageSlider = createApi({
  reducerPath: "carousalImageSlider",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/slider/`,
  }),
  tagTypes: ["ImageCarousal"],
  endpoints: (builder) => ({
    GetAllSliderImages: builder.query<GetAllSliderImageType, void>({
      query: () => `get`,
      providesTags: ["ImageCarousal"],
    }),
  }),
});
export const { useGetAllSliderImagesQuery } = carousalImageSlider;
