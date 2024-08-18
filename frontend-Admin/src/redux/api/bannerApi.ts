import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllBannerResponseType,
  NewBannerType,
  updateStatusType,
} from "../../types/apiTypes";

export const banner = createApi({
  reducerPath: "banner",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/banner/`,
  }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    getAllBanner: builder.query<AllBannerResponseType, void>({
      query: () => "all",
      providesTags: ["Banner"],
    }),
    createNewBanner: builder.mutation<AllBannerResponseType, NewBannerType>({
      query: ({
        title,
        startDate,
        endDate,
        linkedItem,
        branches,
        priority,
        appBannerImage,
        webBannerImage,
      }) => {
        const myForm = new FormData();
        myForm.set("title", title);
        myForm.set("startDate", startDate!.toString());
        myForm.set("endDate", endDate!.toString());
        myForm.set("linkedItem", linkedItem!);
        myForm.set("branches", branches.toString());
        myForm.set("priority", priority.toString());

        if (appBannerImage) {
          const newAppImage: any = appBannerImage;
          myForm.append("appBannerImage", newAppImage!.file);
        }
        if (webBannerImage) {
          const newWebImage: any = webBannerImage;
          myForm.append("webBannerImage", newWebImage!.file);
        }

        return {
          url: `new?imgPath=banner`,
          method: "POST",
          body: myForm,
        };
      },
      invalidatesTags: ["Banner"],
    }),
    updateBanner: builder.mutation<
      AllBannerResponseType,
      NewBannerType & { id: string }
    >({
      query: ({
        id,
        title,
        startDate,
        endDate,
        linkedItem,
        branches,
        priority,
        appBannerImage,
        webBannerImage,
      }) => {
        const myForm = new FormData();
        myForm.set("title", title);
        myForm.set("startDate", startDate!.toString());
        myForm.set("endDate", endDate!.toString());
        myForm.set("linkedItem", linkedItem!);
        myForm.set("branches", branches.toString());
        myForm.set("priority", priority.toString());

        if (appBannerImage) {
          const newAppImage: any = appBannerImage;
          myForm.append("appBannerImage", newAppImage!.file);
        }
        if (webBannerImage) {
          const newWebImage: any = webBannerImage;
          myForm.append("webBannerImage", newWebImage!.file);
        }

        return {
          url: `${id}?imgPath=banner`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["Banner"],
    }),
    updateBannerStatus: builder.mutation<
      AllBannerResponseType,
      updateStatusType
    >({
      query: ({ id, status }) => ({
        url: `status/${id}`,
        method: "PUT",
        body: {
          status,
        },
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useUpdateBannerStatusMutation,
  useCreateNewBannerMutation,
  useUpdateBannerMutation,
} = banner;
