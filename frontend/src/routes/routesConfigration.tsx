import { ReactNode, lazy } from "react";

//user Routes
const Profile = lazy(() => import("../pages/user/profile/profile"));
const EditProfile = lazy(() => import("../pages/user/profile/editProfile"));
const AddressBook = lazy(() => import("../pages/user/address/addressbook"));
const EditAddress = lazy(() => import("../pages/user/address/editAddress"));
const PaymentOptions = lazy(() => import("../pages/user/paymentOptions"));
const WishList = lazy(() => import("../pages/user/myWishList"));

//user orders
const Orders = lazy(() => import("../pages/user/order/myOrders"));
const CanceledOrders = lazy(() => import("../pages/user/order/myCancelOrders"));
const ReturnedOrders = lazy(
  () => import("../pages/user/order/myReturnedOrders")
);

// defining the type
export type routesConfigrationType = {
  path: string;
  component: ReactNode;
};

export const routesConfigration: routesConfigrationType[] = [
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/editProfile",
    component: <EditProfile />,
  },
  {
    path: "/addressBook",
    component: <AddressBook />,
  },

  {
    path: "/addressBook/editAddress",
    component: <EditAddress />,
  },
  {
    path: "/paymentOptions",
    component: <PaymentOptions />,
  },
  {
    path: "/orders",
    component: <Orders />,
  },
  {
    path: "/cancelOrders",
    component: <CanceledOrders />,
  },
  {
    path: "/returnedOrder",
    component: <ReturnedOrders />,
  },
  {
    path: "/wishList",
    component: <WishList />,
  },
];
