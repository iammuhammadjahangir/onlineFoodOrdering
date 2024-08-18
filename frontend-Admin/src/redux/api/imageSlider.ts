import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllSliderImageType,
  ImageSliderResponse,
} from "../../types/apiTypes";
export const carousalImageSlider = createApi({
  reducerPath: "carousalImageSlider",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/slider/`,
  }),
  tagTypes: ["ImageCarousal"],
  endpoints: (builder) => ({
    UploadSliderImages: builder.mutation<ImageSliderResponse, any>({
      query: (photos) => {
        const formData = new FormData();

        // const file = blobToFileConverter(photo?.url);
        console.log(photos);
        if (photos && photos.length > 0) {
          for (let i = 0; i < photos.length; i++) {
            formData.append("photos", photos[i]);
          }
        }

        return { url: `post?path=slider`, method: "POST", body: formData };
      },
      invalidatesTags: ["ImageCarousal"],
    }),
    GetAllSliderImages: builder.query<GetAllSliderImageType, void>({
      query: () => `get`,
      providesTags: ["ImageCarousal"],
    }),
    deleteSliderImage: builder.mutation<ImageSliderResponse, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ImageCarousal"],
    }),
  }),
});
export const {
  useGetAllSliderImagesQuery,
  useDeleteSliderImageMutation,
  useUploadSliderImagesMutation,
} = carousalImageSlider;
