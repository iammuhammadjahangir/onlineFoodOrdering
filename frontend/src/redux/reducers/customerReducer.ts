import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerReducerInitialState } from "../../types/reducerType";
import { Customer } from "../../types/types";

const initialState: CustomerReducerInitialState = {
  customer: null,
  loading: true,
};

export const customerReducer = createSlice({
  name: "customerReducer",
  initialState,
  reducers: {
    customerExist: (state, action: PayloadAction<Customer>) => {
      state.loading = false;
      state.customer = action.payload;
    },
    customerNotExist: (state) => {
      state.loading = false;
      state.customer = null;
    },
  },
});

export const { customerExist, customerNotExist } = customerReducer.actions;
