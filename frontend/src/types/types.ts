import { DataType } from "./apiTypes";

export interface ItemsType {
  _id: string;
  productImage: string;
  name: string;
  description: string;
  actualPrice: number;
  offerPrice: number;
  category: string;
}
// export interface DataType {
//   category: string;
//   items: ItemsType[];
// }
// export interface itemTypes {
//   data: DataType[];
//   index: number;
//   key: number;
// }
export type itemCardTypes = {
  index: number;
  key: number;
  data: DataType;
};

// export type itemCategoryBarType = Omit<Omit<itemTypes, "index">, "key">;

export interface Address {
  _id?: string;
  addressDetail: string;
  city: string;
  area: string;
}

export interface Customer {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  phoneNo?: string;
  gender?: string;
  password?: string;
  dob?: Date;
  address?: Address[];
  paymentOptions?: string;
  wishList?: string[]; //change later
  age?: number;
}

export interface UpdateCustomer {
  id?: string;
  name?: string;
  avatar?: string;
  gender?: "male" | "female" | "";
  phoneNo?: string;
  dob?: Date;
  address?: Address;
  paymentOptions?: string;
  wishList?: ItemsType[];
}

// dropDown
export interface dropdownType {
  value?: string;
  label?: string;
  color?: string;
}
