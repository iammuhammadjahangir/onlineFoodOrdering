import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponse,
  CreateCategoryType,
  DeletCategoryType,
} from "../../types/apiTypes";
import { createCategory, updateCategory } from "../../types/types";
export const category = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/category/`,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    GetAllCategory: builder.query<CategoryResponse, void>({
      query: () => `all`,
      providesTags: ["Category"],
    }),

    CreateCategory: builder.mutation<CreateCategoryType, createCategory>({
      query: ({
        name,
        description,
        priority,
        availableFrom,
        availableTo,
        image,
        status,
      }) => {
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("description", description);
        myForm.set("priority", priority.toString());
        myForm.set("availableFrom", availableFrom);
        myForm.set("availableTo", availableTo);
        myForm.set("status", JSON.stringify(status));
        const newImage: any = image;
        myForm.append("photo", newImage!.file);
        return {
          url: `post?imgPath=category`,
          method: "POST",
          body: myForm,
        };
      },
      invalidatesTags: ["Category"],
    }),
    DeleteCategory: builder.mutation<DeletCategoryType, string>({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
    UpdateCategory: builder.mutation<CreateCategoryType, updateCategory>({
      query: ({
        id,
        name,
        description,
        availableFrom,
        availableTo,
        image,
        priority,
        status,
      }) => {
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("description", description);
        myForm.set("priority", priority.toString());
        myForm.set("availableFrom", availableFrom);
        myForm.set("availableTo", availableTo);
        myForm.set("status", JSON.stringify(status));
        if (image) {
          const newImage: any = image;
          myForm.append("photo", newImage!.file);
        }
        return {
          url: `${id}?imgPath=category`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = category;
