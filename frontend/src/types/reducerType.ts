import { Customer } from "./types";

export interface CustomerReducerInitialState {
  customer: null | Customer;
  loading: boolean;
}
