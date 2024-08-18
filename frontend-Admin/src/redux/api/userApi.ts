import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stringToFileConverter } from "../../features/images/stringToFile";
import {
  AllUsersMessageResponse,
  MessageResponse,
  NewUserData,
  UpdateStatusType,
  UpdateUserType,
} from "../../types/apiTypes";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include", // This is needed for Cookie to be included in the request header
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponse, NewUserData>({
      query: (user) => {
        const myForm = new FormData();
        myForm.set("name", user.name!);
        myForm.set("email", user?.email!);
        myForm.set("password", user?.password!);
        myForm.set("dob", user?.dob!);
        myForm.set("printer", user?.printer!);
        myForm.set("role", user?.role!.toString()); // Convert role to string
        myForm.set("gender", user?.gender!);
        myForm.set("phoneNo", user?.phoneNo!);
        myForm.set("whatsappNo", user?.whatsappNo!);
        myForm.set("tableRows", user?.tableRows!);
        myForm.set("shopNo", user?.shopNo!.toString());
        myForm.set("posId", user?.posId!);

        if (user?.photo) {
          const file = stringToFileConverter(user?.photo.url);
          myForm.append("photo", file);
        }
        return { url: `register?path=user`, method: "POST", body: myForm };
      },
      invalidatesTags: ["User"],
    }),
    allUsers: builder.query<AllUsersMessageResponse, void>({
      query: () => `admin/users`,
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateMyProfile: builder.mutation<MessageResponse, NewUserData>({
      query: (user) => {
        const myForm = new FormData();
        myForm.set("name", user.name!);
        myForm.set("email", user?.email!);
        myForm.set("password", user?.password!);
        myForm.set("printer", user?.printer!);
        myForm.set("dob", user?.dob!);
        myForm.set("role", user?.role!.toString()); // Convert role to string
        myForm.set("gender", user?.gender!);
        myForm.set("phoneNo", user?.phoneNo!);
        myForm.set("whatsappNo", user?.whatsappNo!);
        myForm.set("tableRows", user?.tableRows!);
        myForm.set("shopNo", user?.shopNo!.toString());
        myForm.set("posId", user?.posId!);

        if (user?.photo) {
          const file = stringToFileConverter(user?.photo.url);
          myForm.append("photo", file);
        }
        return {
          url: `/me/update?path=user`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUserProfile: builder.mutation<MessageResponse, UpdateUserType>({
      query: ({ id, user }) => {
        const myForm = new FormData();
        myForm.set("name", user.name!);
        myForm.set("email", user?.email!);
        myForm.set("password", user?.password!);
        myForm.set("dob", user?.dob!);
        myForm.set("printer", user?.printer!);

        myForm.set("role", user?.role!.toString()); // Convert role to string
        myForm.set("gender", user?.gender!);
        myForm.set("phoneNo", user?.phoneNo!);
        myForm.set("whatsappNo", user?.whatsappNo!);
        myForm.set("tableRows", user?.tableRows!);
        myForm.set("shopNo", user?.shopNo!.toString());
        myForm.set("posId", user?.posId!);

        if (user?.photo) {
          const file = stringToFileConverter(user?.photo.url);
          console.log(file);
          myForm.append("photo", file);
        }
        return {
          url: `/admin/user/${id}?path=user`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateStatus: builder.mutation<MessageResponse, UpdateStatusType>({
      query: ({ active, id }) => {
        const myForm = new FormData();
        myForm.set("active", active.toString());
        return {
          url: `/admin/user/${id}?path=user`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useUpdateMyProfileMutation,
  useUpdateUserProfileMutation,
  useUpdateStatusMutation,
} = userAPI;
