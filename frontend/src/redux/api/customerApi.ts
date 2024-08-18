import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  AllUSersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "../../types/apiTypes";
import { Customer, UpdateCustomer } from "../../types/types";
import { stringToFileConverter } from "../../features/images/stringToFile";
import axiosInstance from "../axiosInstance";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/customer/`,
  }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, Customer>({
      query: (customer) => ({
        url: "new",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),

    checkOutCustomer: builder.mutation<MessageResponse, Customer>({
      query: (customer) => ({
        url: "checkout",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<MessageResponse, UpdateCustomer>({
      query: ({
        id,
        name,
        dob,
        phoneNo,
        address,
        avatar,
        gender,
        paymentOptions,
        wishList,
      }) => {
        console.log(wishList);
        const myForm = new FormData();
        if (name) myForm.set("name", name);
        if (dob) myForm.set("dob", JSON.stringify(dob));
        if (address) myForm.set("address", JSON.stringify(address));
        if (phoneNo) myForm.set("phoneNo", phoneNo);
        if (gender) myForm.set("gender", gender);
        if (paymentOptions) myForm.set("paymentOptions", paymentOptions);
        if (wishList) {
          const filteredData = wishList.map((wishListItem) => wishListItem);
          console.log(filteredData);
          myForm.set("wishList", JSON.stringify(filteredData));
        }

        console.log("avatar");
        console.log(avatar);
        if (avatar) {
          const file = stringToFileConverter(avatar);
          console.log(file);
          myForm.append("photo", file);
        }

        console.log(id);

        return {
          url: `${id}?path=customer`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["Customer"],
    }),

    deleteCustomer: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ adminUserId, userId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Customer"],
    }),

    allCustomer: builder.query<AllUSersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Customer"],
    }),
  }),
});

export const getCustomer = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/customer/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const {
  useLoginMutation,
  useAllCustomerQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
  useCheckOutCustomerMutation,
} = customerApi;

export const getProductForWishList = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/items/${id}`);

    console.log(data.item);
    // console.log(data.status);

    return data.item;
  } catch (error) {
    console.log(error);
    return false;
  }
};
