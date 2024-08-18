import { Address, Customer } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type VariationOptionType = {
  _id: string;
  name: string;
  price: number;
  variationName: string;
};
export type VariationOptionStateType = {
  _id: string;
  name: string;
  price: number;
  variationName: string;
  variationId: string;
};

export type VariationOptionArrayType = {
  index: number;
  variation: VariationOptionStateType[];
  varName: string;
  varId: string;
};

export type VariationType = {
  _id: string;
  name: string;
  description: string;
  isRequired: boolean;
  variationOptions: VariationOptionType[];
};

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
};
export type ItemsType = {
  _id: string;
  name: string;
  description: string;
  productImage: {
    url: string;
    blurHash: string;
  };
  category: CategoryType;
  actualPrice: number;
  offerPrice: number;
  variations: VariationType[];
};
export type ItemsTypeCart = {
  _id: string;
  name: string;
  description: string;
  productImage: {
    url: string;
    blurHash: string;
  };
  category: CategoryType;
  actualPrice: number;
  offerPrice: number;
  quantity: number;
  finalPrice: number;
  variations: VariationType[];
  variationRequired: VariationOptionType[];
  variationOptions: VariationOptionArrayType[];
};
export type DataType = {
  category: string;
  items: ItemsType[];
};
export type itemCategoryBarType = {
  data: DataType[];
  activeCategory: string | null;
};

export type AllProductResponse = {
  success: boolean;
  CategoryCount: number;
  ItemsCount: number;
  newArray: DataType[];
};

export type SearchItemsRequest = {
  price?: number;
  page: number;
  category: string;
  sort: string;
  search: string;
};

export type SearchItemsResponse = {
  success: boolean;
  Items: ItemsType[];
  totalProducts: number;
  totalPage: number;
};

export type CartItemType = {
  customerId: string;
  deliveryTime: Date;
  instruction?: string;
  items: ItemsType[];
};

export type ItemsTypeCombined = {
  _id: string;
  // dimension: DimensionType[];
  // image: ImageType[];
  // productID: ProductIDType;
  // shopID: ShopIDType;
  // wareShouseID: WareHouseIDType;
  // sizeID: SizeType[];
  // colorID: ColorType[];
  // materialID: MaterialType[];
  // styleID: StyleType[];
  SKU: (string | number)[];
  BARCODE: (string | number)[];
  purchasePrice: number[];
  comparePrice: number[];
  salePrice: number[];
  weight: number[];
  stockQuantity: number[];
  alertQuantity: number[];
  isFeatured: boolean[];
  isPromotion: boolean[];
  promotionPrice: (number | null)[];
  promotionStartDate: (string | null)[];
  promotionEndDate: (string | null)[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  video: object[];
};
// customer

// Customer
export type AllUSersResponse = {
  success: boolean;
  users: Customer[];
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  customer: Customer;
};

export type OrderType = {
  customerId: string;
  phoneNo: string;
  instruction: string;
  name: string;
  email: string;
  deviceType: string;
  deliveryAddress: Address | null;
  // billingAddress: Address | null;
  shippingFee: number;
  couponDiscountCode: string;
  paymentMethod: string;
  subTotal: number;
  discountPrice: number;
  grandTotalPrice: number;
  items: ItemsTypeCart[];
};

// Image Slider
// Slider Image

export interface SliderImageType {
  _id: string;
  filename: string;
  originalname: string;
  path: string;
  blurHash: string;
  size: number;
}
export type GetAllSliderImageType = {
  success: boolean;
  images: SliderImageType[];
};

export type ImageSliderResponse = {
  success: boolean;
  message: string;
  data: SliderImageType[];
};
