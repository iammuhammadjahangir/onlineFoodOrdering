import { NextFunction, Request, Response } from "express";
import mongoose, { Document, Types } from "mongoose";
import { ObjectId } from "mongoose";
import { IAddress } from "../models/customerModel.js";

export type ControllerType = (
  req: Request<any>,
  // req: Request,
  res: Response<any>,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface NewUserRequestBody {
  id: ObjectId;
  name: string;
  email: string;
  avatar: {
    url: string;
    blurHash: string;
  };
  password: string;
  gender: "male" | "female";
  role: {
    id?: ObjectId;
    name?: string;
    description?: string;
  };
  dob: Date;
  active: boolean;
  shopNo: ObjectId;
  printer: "laser" | "thermal";
  tableRows: number;
  posId?: string;
  phoneNo: string;
  whatsappNo: string;
  createdAt: Date;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;

  //   virtual Attribute
  age: number;

  // Schema methods
  getJWTToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
}

export interface NewUserData {
  id?: ObjectId;
  name?: string;
  email?: string;
  avatar?: {
    url: string;
    blurHash: string;
  };
  gender?: "male" | "female";
  role?: ObjectId;
  dob?: string;
  active?: boolean;
  shopNo?: ObjectId;
  printer?: "laser" | "thermal";
  tableRows?: number;
  posId?: string;
  phoneNo?: string;
  whatsappNo?: string;
}

export interface ProfileRequest extends Request {
  user?: NewUserRequestBody;
}
// Extend the Request type to include the custom 'user' property
export interface ProfiledRequest extends Request<{}, {}, ProfileRequest> {
  user?: NewUserRequestBody;
}
export interface NewRoleType {
  name: string;
  description: string;
}

export interface NewTaskType {
  name: string;
  description: string;
}

export interface NewAssignedTaskType {
  role: ObjectId;
  task: ObjectId;
  status: boolean;
}

// category
export interface CategoryTypes {
  id?: string;
  name: string;
  description: string;
  priority?: number;
  availableFrom: string;
  availableTo: string;
  appOnly: boolean;
  status: any;
  image?: {
    url: string;
    blurHash: string;
  };
}

// Variation Options
export interface VariationOptionsTypes {
  id?: string;
  name: string;
  price?: number;
}

export type VariationOptionsUpdateTypes = Omit<VariationOptionsTypes, "name">;

// variation
export interface NewSubOptionType {
  id?: string;
  name: string;
  // description: string;
  isRequired?: boolean;
  itemID: ObjectId;
  branchID?: ObjectId[];
  items: VariationOptionsTypes[];
}

export interface SubOptionType extends Document {
  id?: string;
  name: string;
  // description: string;
  // branchID: ObjectId[];
  itemID: ObjectId;
  isRequired?: boolean;
  items: VariationOptionsTypes[];
}

export type ItemType = {
  id?: string;
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
};

export type ItemTypeArray = {
  name: string;
  description: string;
  productImage: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
  actualPrice?: number;
  offerPrice?: number;
  variations?: [
    {
      _id: string;
      name: string;
      price: number;
    }
  ];
};

export type ItemTypeArrayNew = {
  category: string;
  items: ItemTypeArray[];
};

// Searched Items
export interface SearchRequestQuery {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
  customerId?: string;
}

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
  customerId?: string;
}

export interface wareHouseType {
  wareHouseCode: string;
  wareHouseAddress: string;
  wareHouseDescription: string;
  wareHouseType: string;
  wareHousePhoneNo: string;
}
export interface shopType {
  shopCode: string;
  shopAddress: string;
  shopDescription: string;
  shopType: string;
  shopPhoneNo: string;
  wareHouseId: string;
}

// dropDown
export interface dropdownType {
  value?: string;
  label?: string;
  color?: string;
}

// Customer
export interface NewCustomerRequestBody {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  avatar: string;
  address: any;
}

export interface UpdateCustomerRequestBody {
  name?: string;
  avatar?: string;
  gender?: "male" | "female" | "";
  dob: Date;
  phoneNo?: string;
  address?: IAddress;
  paymentOptions?: string;
  wishList?: any;
}

// order
export interface PlaceOrderType {
  customerId: any;
  deviceType: string;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  shippingFee: number;
  couponDiscountCode: string;
  paymentMethod: string;
  subTotal: number;
  discountPrice: number;
  grandTotalPrice: number;
  items: ItemType[];
}

// update Order Status
export interface UpdateOrderStatus {
  statusName: string;
  statusDate?: Date;
  statusComment: string;
  ownerShippingFee?: number;
  ShippedCompany?: string;
  TrackingNumber?: string;
}

// Banner
export interface newBannerType {
  title: string;
  startDate: Date;
  endDate: Date;
  // startTime: string;
  // endTime: string;
  priority: string;
  linkedItem: Types.ObjectId;
  branches: any;
  appBannerImage: string;
  webBannerImage: string;
  status: boolean;
}

// Define the custom type for files
export interface Files {
  appBannerImage?: Express.Multer.File[];
  webBannerImage?: Express.Multer.File[];
}
export interface ItemFiles {
  photo?: Express.Multer.File[];
  additionalImages?: Express.Multer.File[];
}

// Bulk Category Discount
export interface newBulkCategoryDiscountType {
  categories: Types.ObjectId[];
  brandName: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  disableCategoryAfterExpiry: boolean;
}

// Promo code
export interface newPromoCodeType {
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
  branches: string[];
  applicableOnSections: string[];
  freeProduct: string;
  specificCustomer: string[];
  applicableOn: "App" | "Web" | "Both";
}

// Branch Type
export interface BranchAddress {
  latitude?: number;
  longitude?: number;
  houseShopNo: string;
  street: string;
  area: string;
  country: string;
  state: string;
  city: string;
  postalZipCode: string;
}

export interface BranchTiming {
  days: string[]; // Array of days the branch is open (e.g., ["Monday", "Tuesday"])
  firstHalfOpenTime: string; // Format: HH:mm
  firstHalfCloseTime: string; // Format: HH:mm
  secondHalfOpenTime?: string; // Optional if not applicable
  secondHalfCloseTime?: string; // Optional if not applicable
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
  // branchCode: string;
  branchAddress: BranchAddress;
  branchDescription: string;
  branchType: "branch" | "store";
  warehouseId?: mongoose.Schema.Types.ObjectId; // Optional reference to the warehouse
  branchTiming: BranchTiming;
  branchSettings: BranchSettings;
  customerSupport: CustomerSupport;
  activityStatus?: boolean; // Optional, defaults to true
}
