import { configureStore } from "@reduxjs/toolkit";
import {
  UserDetailReducer,
  forgetPasswordReducer,
  userReducer,
} from "./reducers/userReducer";
import { assignedTasks } from "./api/assignTasks";
import { userAPI } from "./api/userApi";
import { roles } from "./api/roleApi";
import { variationOptions } from "./api/variationOptions";
import { subOption } from "./api/subOptionAPI";
import { category } from "./api/category";
import { product } from "./api/product";
import { carousalImageSlider } from "./api/imageSlider";
import { orderApi } from "./api/orderApi";
import { customerApi } from "./api/customerApi";
import { banner } from "./api/bannerApi";
import { bulkCategory } from "./api/bulkCategoryDiscountApi";
import { promoCode } from "./api/promoCodeApi";
import { branch } from "./api/branch";
import { wareHouse } from "./api/wareHouseApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [UserDetailReducer.name]: UserDetailReducer.reducer,
    [forgetPasswordReducer.name]: forgetPasswordReducer.reducer,
    [assignedTasks.reducerPath]: assignedTasks.reducer,
    [branch.reducerPath]: branch.reducer,
    [wareHouse.reducerPath]: wareHouse.reducer,
    [roles.reducerPath]: roles.reducer,
    [variationOptions.reducerPath]: variationOptions.reducer,
    [subOption.reducerPath]: subOption.reducer,
    [category.reducerPath]: category.reducer,
    [product.reducerPath]: product.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [carousalImageSlider.reducerPath]: carousalImageSlider.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [banner.reducerPath]: banner.reducer,
    [bulkCategory.reducerPath]: bulkCategory.reducer,
    [promoCode.reducerPath]: promoCode.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      assignedTasks.middleware,
      branch.middleware,
      wareHouse.middleware,
      roles.middleware,
      variationOptions.middleware,
      subOption.middleware,
      category.middleware,
      product.middleware,
      carousalImageSlider.middleware,
      orderApi.middleware,
      customerApi.middleware,
      banner.middleware,
      bulkCategory.middleware,
      promoCode.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
