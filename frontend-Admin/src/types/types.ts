import { ReactElement } from "react";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
export interface signInUser {
  username: string;
  password: string;
}
export interface ResetUser {
  token: string;
  password: string;
  confirmPassword: string;
}
export interface updatePasswordData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: {
    url: string;
    blurHash: string;
  };
  password: string;
  gender: string;
  role: {
    _id: string;
    name: string;
    description: string;
    __v: number;
  };
  dob: string;
  active: boolean;
  shopNo: {
    _id: string;
    shopCode: string;
    shopAddress: string;
    shopDescription: string;
    shopType: string;
    shopPhoneNo: string;
    createdAt: string;
    updatedAt: string;
    wareHouseId?: {
      _id: string;
      wareHouseCode: string;
      wareHouseAddress: string;
      wareHouseDescription: string;
      wareHouseType: string;
      wareHousePhoneNo: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  printer: "laser" | "thermal";
  tableRows: number;
  posId?: string;
  phoneNo: string;
  whatsappNo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  resetPasswordExpire: string;
  resetPasswordToken: string;
}

export interface LoginResponse {
  status: boolean;
  user: User | undefined;
  isAuthenticated: boolean;
  token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface LoginInitialStateType {
  status: boolean;
  user: User | undefined;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string;
}

export interface ForgetPasswordInitialState {
  loading: boolean;
  error: string | null;
  message: string;
}

export interface ShopDropDown {
  value?: string | boolean | number;
  label?: string;
  color?: string;
}
export interface RoleDropDown {
  value?: string;
  label?: string;
  color?: string;
}

export interface Shop {
  _id: string;
  shopCode: string;
  shopAddress: string;
  shopDescription: string;
  shopType: string;
  shopPhoneNo: string;
  createdAt: string;
  updatedAt: string;
}
export interface Role {
  _id: string;
  name: string;
  description: string;
}

// Sub Options
export interface subOptionOptions {
  _id: string;
  name: string;
  price: number;
}

export interface createSubOptionItem {
  name: string;
  price: number;
}

// sub Option
export interface subOptionInitalValues {
  itemID: string;
  subOption: {
    name: string;
    isRequired: boolean;
    items: {
      name: string;
      price: number;
    }[];
  }[];
}

export interface subOptions {
  _id: string;
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  itemID?: Item;
  branchID?: string[];
  items: subOptionOptions[];
  createdAt: string;
  updatedAt?: string;
  action?: ReactElement;
}

export interface createSubOption {
  name: string;
  // description: string;
  isRequired: boolean;
  itemID: string;
  items: {
    name: string;
    price: number;
  }[];
}

export interface CreateSubOptionResponse {
  status: boolean;
  message: string;
  subOptions: subOptions[];
}

export interface GetAllSubOptionResponse {
  status: boolean;
  message: string;
  subOptions: subOptions[];
}

export interface GetSearchedSubOptionRequest {
  id?: string;
  branchID?: string;
  itemID?: string;
}

export interface GetSearchedSubOptionResponse {
  status: boolean;
  subOption: subOptions[];
}

// Category
export interface category {
  _id: string;
  name: string;
  description: number;
  image: {
    url: string;
    blurHash: string;
  };
  priority: number;
  availableFrom: string;
  availableTo: string;
  status: string[];
  createdAt: string;
  updatedAt?: string;
  action?: ReactElement;
}

export interface createCategory {
  name: string;
  description: string;
  image: File;
  priority: number;
  availableFrom: string;
  availableTo: string;
  status: string[];
}
export interface updateCategory {
  id: string;
  name: string;
  description: string;
  image: File;
  priority: number;
  availableFrom: string;
  availableTo: string;
  status: string[];
}

// Items
export interface ItemTableType {
  Image: string;
  Details: ReactElement;
  SKUPOS: ReactElement;
  Price: ReactElement;
  Priority: string;
  action?: ReactElement;
}

export interface Item {
  _id: string;
  name: string;
  brandName: string;
  description: string;
  productImage: {
    url: string;
    blurHash: string;
  };
  additionalImages: {
    url: string;
    blurHash: string;
  }[];
  category: any;
  deal: boolean;
  promoCodeOnly: boolean;
  available: boolean;
  upsellingItem: boolean;
  appOnly: boolean;
  deliveryBy: "vendor" | "customer";
  priceType: "fixed" | "starting from";
  price: number;
  discountType: "percentage" | "fixed amount";
  discountPrice: number;
  preparationTime: number;
  calories: number;
  barcode: string;
  sku: string;
  uom: string;
  priority: number;
  skuPosMappingId: string;
  allergens: any;
  tags: any;
  createdAt: string;
  updatedAt?: string;
  action?: ReactElement;
}

export interface CreateItem {
  name: string;
  brandName: string;
  description: string;
  productImage: File | null;
  additionalImages: File[] | null;
  category: string[];
  deal: boolean;
  promoCodeOnly: boolean;
  available: boolean;
  upsellingItem: boolean;
  appOnly: boolean;
  deliveryBy: "vendor" | "customer" | null;
  priceType: "fixed" | "starting from" | null;
  price: number;
  discountType: "percentage" | "fixed amount" | null;
  discountPrice: number;
  preparationTime: number;
  calories: number;
  barcode: string;
  sku: string;
  uom: string;
  priority: number;
  skuPosMappingId: string;
  allergens: any;
  tags: any;
}

export interface UpdateItem extends Omit<CreateItem, "additionalImages"> {
  additionalImages: any | null;
}

// Slider Image
export interface SliderImageType {
  _id: string;
  filename: string;
  originalname: string;
  path: string;
  blurHash: string;
  size: number;
}

//order
export interface processOrder {
  id: string;
  statusName: string;
  statusComment: string;
  ownerShippingFee?: number;
  TrackingNumber?: string;
  ShippedCompany?: string;
}
export interface processPayment {
  id: string;
  paymentStatus: string;
}

// Order
export interface OrderProps {
  _id?: string;
  orderID: ReactElement;
  customer: string;
  deliveryAddress: String;
  // TrackingNumber: string;

  orderStatus: ReactElement;
  paymentStatus: ReactElement;
  orderTotal: number;
  customerShipping: number;
  ownerShipping: number;
  discount: number;
  itemsCount: number;
  createdAt: string;
  updatedAt?: string;
  action?: ReactElement;
}

// Dashboard
export interface liveDataSummaryProps {
  name: ReactElement;
  totalOrders: number;
  Recieved: number;
  OnDelivery: ReactElement;
  Delivered: ReactElement;
  Cancelled: ReactElement;
  Process: number;
}

// Category Table Type
export interface CategoryTableType {
  image: string;
  name: string;
  description: string;
  priority: number;
  availableFrom: string;
  availableTo: string;
  status: ReactElement;
  createdAt: string;
  action: ReactElement;
}

// Branch
export interface BranchFormValues {
  // branchCode: string;
  branchDescription: string;
  branchAddress: {
    latitude: number;
    longitude: number;
    houseNo: string;
    street: string;
    area: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  warehouseId?: string; // Optional since it can be empty
  branchType: "branch" | "store";
  branchTiming: {
    days: string[];
    firstHalfOpenTime: string;
    firstHalfCloseTime: string;
    secondHalfOpenTime?: string;
    secondHalfCloseTime?: string;
  };
  branchSettings: {
    asapOnly: boolean;
    preOrderOnly: boolean;
    sameDayPreOrder: boolean;
    minPreOrderTime?: number;
    maxPreOrderTime?: number;
    otherSettings: {
      swsDeliveryModule: boolean;
      taxPercentage?: number;
    };
  };
  customerSupport: {
    contactEmail?: string;
    contactNumber?: string;
  };
  activityStatus: boolean;
}

export interface UpdateBranchFormValues extends BranchFormValues {
  id: string;
}

export interface MultipleColorsComponentProps {
  errors: Record<string, any>;
  handleBlur: any;
  handleChange: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched: Record<string, any>;
  values: BranchFormValues;
}
