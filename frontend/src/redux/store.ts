import { configureStore } from "@reduxjs/toolkit";
import { itemsAPI } from "./api/itemsApi";
import { customerApi } from "./api/customerApi";
import { customerReducer } from "./reducers/customerReducer";
import { orderApi } from "./api/orderApi";
import { carousalImageSlider } from "./api/imageSlider";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [itemsAPI.reducerPath]: itemsAPI.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [customerReducer.name]: customerReducer.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [carousalImageSlider.reducerPath]: carousalImageSlider.reducer,

    // [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      itemsAPI.middleware,
      customerApi.middleware,
      orderApi.middleware,
      carousalImageSlider.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
