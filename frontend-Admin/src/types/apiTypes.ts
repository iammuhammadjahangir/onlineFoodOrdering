import React, { ReactElement } from "react";
import { DataTypeNewUser } from "../pages/user/viewUsers";
import {
  Item,
  Role,
  Shop,
  SliderImageType,
  category,
  subOptionOptions,
  subOptions,
} from "./types";

export type assignTasksArrayType = {
  status: boolean;
  taskNamesArray: string[];
};

export type AllShopsArray = {
  success: boolean;
  shops: Shop[];
};
export type AllRolesArray = {
  success: boolean;
  data: Role[];
};

export type NewUserData = {
  id: string;
  name: string;
  email: string;
  photo: {
    url: string;
    blurHash: string;
  };
  password?: string;
  gender: string;
  role:
    | string
    | {
        _id: string;
        name: string;
      };
  active: boolean;
  shopNo:
    | string
    | {
        _id: string;
        shopCode: string;
      };
  printer: string;
  tableRows: string;
  posId?: string | null;
  phoneNo: string;
  whatsappNo: string;
  dob: string;
  pageAddress: string;
};

export type UpdateUserType = {
  id: string;
  user: NewUserData;
};
export type UpdateStatusType = {
  id: string;
  active: boolean;
};

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type AllUsersMessageResponse = {
  success: boolean;
  users: DataTypeNewUser[];
};

// Sub Option Options
export type SubOptionResponse = {
  success: boolean;
  allCategories: subOptionOptions[];
};

export type CreateSubOptionOptionType = {
  success: boolean;
  message: string;
};

export type UpdateSubOptionOptionType = {
  id: string;
  name: string;
  price: string;
};

// subOptions
export type subOptionsResponse = {
  success: boolean;
  allCategories: subOptions[];
};

export type CreateSubOptionType = {
  success: boolean;
  message: string;
};

export type DeletSubOptionType = {
  success: boolean;
  message: string;
};

export type UpdateSubOptionType = {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  items: string[];
};

// Category
export type CategoryResponse = {
  success: boolean;
  allCategories: category[];
};
export type CreateCategoryType = {
  success: boolean;
  message: string;
};

export type DeletCategoryType = {
  success: boolean;
  message: string;
};

// Products
export type ProductResponse = {
  success: boolean;
  allItems: Item[];
};

export type ProductResponseMessage = {
  success: boolean;
  message: string;
};

export type ProductResponseMessageType = {
  success: boolean;
  message: string;
};

// Slider Image
export type GetAllSliderImageType = {
  success: boolean;
  images: SliderImageType[];
};

export type ImageSliderResponse = {
  success: boolean;
  message: string;
  data: SliderImageType[];
};

export interface Address {
  _id?: string;
  addressDetail: string;
  city: string;
  area: string;
}
export interface Customer {
  _id: string;
  name: string;
  avatar: any;
  email: string;
  phoneNo?: string;
  gender?: string;
  password?: string;
  dob?: string;
  address?: Address[];
  paymentOptions?: string;
  wishList?: any[]; //change later
  age?: number;
  createdAt: string;
}

export interface statusProps {
  statusName: string;
  statusDate: Date;
  statusComment: string;
}
export type OrderResponse = {
  _id: string;
  orderId: string;
  placedOn: Date;
  paymentStatus: string;
  paymentDate: Date;
  TrackingNumber: string;
  ShippedCompany: string;
  customerId: Customer;
  deliveryAddress: Address;
  shippingFee: number;
  couponDiscountCode: string;
  customerShippingFee: number;
  ownerShippingFee: number;
  paymentMethod: string;
  subTotal: number;
  discountPrice: number;
  grandTotalPrice: number;
  items: Item[];
  status: statusProps[];
  createdAt: string;
};

export type SearchItemsRequest = {
  price?: number;
  page: number;
  category: any;
  sort: string;
  search: string;
};

export type SearchOrderResponse = {
  success: boolean;
  Items: OrderResponse[];
  totalProducts: number;
  totalPage: number;
};

// Dashboard Summary Types
type OrderSummary = {
  totalOrders: number;
  totalSales: number;
};

type ProductImage = {
  url: string;
  blurHash: string;
};

type ProductDetails = {
  _id: string;
  name: string;
  description: string;
  actualPrice: number;
  offerPrice: number;
  finalPrice: number;
  productImage: ProductImage;
  variations: any[];
  quantity: number;
  variationOptions: any[];
  variationRequired: any[];
};

type TopSaleItem = {
  totalOrders: number;
  totalRevenue: number;
  productDetails: ProductDetails;
  productName: string;
};

type TopItem = {
  name: string;
  totalQuantity: number;
};

type DailySalesAndOrders = {
  date: string;
  totalSales: number;
  totalOrders: number;
};

type PaymentTypeSummary = {
  paymentType: string;
  totalOrders: OrderSummary;
  totalSales: OrderSummary;
};

type DeliveryTypeSummary = {
  deliveryType: string;
  totalOrders: OrderSummary;
  totalSales: OrderSummary;
};

type LiveOrderSummary = {
  totalOrders: number;
  productImage: string;
  description: string;
  price: number;
  name: string;
  statuses: {
    Recieved: number;
    "On-Delivery": number;
    Delivered: number;
    Cancelled: number;
    Process: number;
  };
};

type TopBarSummary = {
  totalOrdersToday: number;
  totalSaleToday: number;
  totalOrderLast30Days: number;
  totalSaleLast30Days: number;
  totalOrderOverall: number;
  totalSaleOverall: number;
  averageOrderValueOverall: number;
  highestOrderValueOverall: number;
  totalCustomers: number;
  totalMenus: number;
};

type DeviceType = {
  deviceType: string;
  totalOrders: {
    deviceType: string;
    totalOrders: number;
  };
};

type NewCustomersThisYear = {
  year: number;
  month: number;
  totalNewCustomers: {
    year: number;
    month: number;
    totalNewCustomers: number;
  };
};

type OrderStatusSummary = {
  status: string;
  totalOrders: OrderSummary;
  totalValue: OrderSummary;
};

type Data = {
  topBarSummary: TopBarSummary;
  deviceType: DeviceType[];
  newCustomersThisYear: NewCustomersThisYear[];
  orderStatusSummary: OrderStatusSummary[];
  todayTopSaleItems: TopSaleItem[];
  topItems: TopItem[];
  dailySalesAndOrders: DailySalesAndOrders[];
  paymentTypeSummary: PaymentTypeSummary[];
  deliveryTypeSummary: DeliveryTypeSummary[];
  liveOrderSummary: LiveOrderSummary[];
};

export type SummaryOrderResponse = {
  success: boolean;
  data: Data;
};

// export type SummaryOrderResponse = {
//   success: boolean;
//   data: {
//     totalOrdersToday: number;
//     totalSaleToday: number;
//     totalOrderLast30Days: number;
//     totalSaleLast30Days: number;
//     totalOrderOverall: number;
//     hightestOrderValueOverall: number;
//     averageOrderValueOverall: number;
//     topItems: {
//       name: string;
//       totalQuantity: number;
//     }[];
//     dailySalesAndOrders: {
//       _id: string;
//       totalSales: number;
//       totalOrders: number;
//     }[];
//   };
// };

// Customer
export type AllUSersResponse = {
  success: boolean;
  users: Customer[];
};

// Banner
export interface BannerTableType {
  id: string;
  title: string;
  priority: string;
  linkedItem:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  appBannerImage: JSX.Element;
  webBannerImage: JSX.Element;
  branches: JSX.Element[];
  status: JSX.Element;
  action: JSX.Element;
}
export interface Banner {
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  linkedItem: Item | null;
  appBannerImage: {
    url: string;
    blurHash: string;
  };
  webBannerImage: {
    url: string;
    blurHash: string;
  };
  branches: {
    _id: string;
    shopCode: string;
    shopAddress: string;
    shopDescription: string;
    wareHouseId: string;
    shopType: string;
    shopPhoneNo: string;
  }[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface NewBannerType {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  priority: number;
  linkedItem: string | null;
  appBannerImage: File | null;
  webBannerImage: File | null;
  branches: string[];
  // status: string;
}

export interface AllBannerResponseType {
  success: boolean;
  data: Banner[];
}

export interface updateStatusType {
  id: string;
  status: boolean;
}

// Discount
export interface BulkDiscountTableType {
  discountPercentage: string;
  startDate: string;
  endDate: string;
  startTime: any;
  endTime: any;
  status: JSX.Element;
  action: JSX.Element;
}

export interface BulkDiscount {
  _id: string;
  categories: category[];
  discountPercentage: string;
  brandName: string;
  startDate: Date;
  endDate: Date;
  disableCategoryAfterExpiry: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface BulkDiscountInitialType {
  categories: string[];
  brandName: string;
  discountPercentage: number;
  startDate: Date | null;
  endDate: Date | null;
  disableCategoryAfterExpiry: boolean;
}

export interface BulkDiscountResponse {
  success: boolean;
  data: BulkDiscount[];
}

// promo Code
export interface promoCodeTypeTable {
  name: string;
  applicableOn: any;
  usedCount: string;
  maxCount: string;
  startDate: string;
  endDate: string;
  status: any;
  action: any;
}

export interface PromoCode {
  _id: string;
  promoCode: string;
  startDate: Date;
  endDate: Date;
  forFirstTimeOnly: boolean;
  maxCount: number;
  maxCountPerUser: number;
  discountType: "Flat" | "Percentage";
  discountAmount: number;
  minimumOrderAmount: number;
  orderType: "Delivery" | "Pickup";
  branches: Shop[];
  applicableOnSections: category[];
  freeProduct: Item;
  specificCustomer: Customer;
  applicableOn: "App" | "Web" | "Both";
  usedCount: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface PromoCodeInitialType {
  promoCode: string;
  startDate: Date | null;
  endDate: Date | null;
  forFirstTimeOnly: boolean;
  maxCount: number;
  maxCountPerUser: number;
  discountType: "Flat" | "Percentage";
  discountAmount: number;
  minimumOrderAmount: number;
  orderType: "Delivery" | "Pickup";
  branches: string[];
  applicableOnSections: string[];
  freeProduct: string | null;
  specificCustomer: string;
  applicableOn: "App" | "Web" | "Both" | null;
  usedCount: number;
}

export interface AllPromoCodeResponse {
  success: boolean;
  data: PromoCode[];
}

// Branch Table
export interface BranchTableType {
  BranchID: ReactElement;
  branchName: ReactElement;
  warehouseId: ReactElement;
  days: ReactElement;
  status: ReactElement;
  action: ReactElement;
}

export interface BranchAddress {
  latitude?: number;
  longitude?: number;
  houseNo: string;
  street: string;
  area: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
}

export interface BranchTiming {
  days: string[]; // Array of days the branch is open (e.g., ["Monday", "Tuesday"])
  firstHalfOpenTime: string; // Format: HH:mm
  firstHalfCloseTime: string; // Format: HH:mm
  secondHalfOpenTime: string; // Optional if not applicable
  secondHalfCloseTime: string; // Optional if not applicable
}

export interface BranchSettings {
  asapOnly: boolean;
  preOrderOnly: boolean;
  sameDayPreOrder: boolean;
  minPreOrderTime: number; // In hours
  maxPreOrderTime: number; // In hours
  otherSettings: {
    swsDeliveryModule: boolean;
    taxPercentage?: number; // Optional
  };
}

export interface CustomerSupport {
  contactEmail: string;
  contactNumber: string;
}

export interface newBranchType {
  _id: string;
  branchCode: string;
  branchAddress: BranchAddress;
  branchDescription: string;
  branchPhoneNo: string;
  branchType: "branch" | "store";
  warehouseId?: Warehouse; // Optional reference to the warehouse
  branchTiming: BranchTiming;
  branchSettings: BranchSettings;
  customerSupport: CustomerSupport;
  activityStatus: boolean; // Optional, defaults to true
}
export interface GetAllBranchesType {
  success: boolean;
  data: newBranchType[];
}

// Warehouse

export interface Warehouse {
  _id: string;
  wareHouseCode: string;
  wareHouseAddress: BranchAddress;
  wareHousePhoneNo: string;
  wareHouseDescription: string;
  wareHouseType: string;
  activityStatus?: boolean;
}

export interface GetAllWareHousesType {
  success: boolean;
  wareHouses: Warehouse[];
}
