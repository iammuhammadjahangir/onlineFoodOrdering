import { ReactNode, lazy } from "react";

// Importing Routes
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"));

// Users
const ViewUsers = lazy(() => import("../pages/user/viewUsers"));
const Profile = lazy(() => import("../pages/user/profile"));
const UpdatePassword = lazy(() => import("../features/auth/updatePassword"));
const RegisterUser = lazy(() => import("../pages/user/registerUser"));

// Products
const ProductRecords = lazy(() => import("../pages/products/productsRecord"));
const CreateProduct = lazy(() => import("../pages/products/createProduct"));
const UpdateProduct = lazy(() => import("../pages/products/updateProduct"));

// Variations
const VariationRecords = lazy(
  () => import("../pages/variations/variationRecord")
);
const CreateVariation = lazy(
  () => import("../pages/variations/createVariation")
);
const UpdateVariation = lazy(
  () => import("../pages/variations/updateVariation")
);

// VariationOptions
const VariationOptionRecords = lazy(
  () => import("../pages/variationOptions/variationOptionsRecord")
);
const CreateVariationOptions = lazy(
  () => import("../pages/variationOptions/createVariationOption")
);

const UpdateVariationOptions = lazy(
  () => import("../pages/variationOptions/updateVariationOption")
);

// Categories
const CategoryRecords = lazy(() => import("../pages/category/categoryRecord"));
// const CreateCategory = lazy(() => import("../pages/category/createCategory"));
// const UpdateCategory = lazy(() => import("../pages/category/updateCategory"));

const ViewOrders = lazy(() => import("../pages/order/viewOrders"));
const ProcessOrder = lazy(() => import("../pages/order/processOrder"));

// Slider Image Gallery
const SliderImage = lazy(
  () => import("../pages/imageGallery/sliderImage/sliderImage")
);
const UploadSliderImages = lazy(
  () => import("../pages/imageGallery/sliderImage/uploadSliderImages")
);

// Customer
const Customer = lazy(() => import("../pages/customer/customerRecord"));

// Banner
const Banner = lazy(() => import("../pages/banner/bannerRecord"));

// Discounts
const BulkSectionDiscount = lazy(
  () => import("../pages/discounts/bulkCategoryDiscount/bulkSectionRecord")
);
const PromoCodes = lazy(
  () => import("../pages/discounts/promoCodes/promoCodesRecord")
);

// Branches
const Branches = lazy(() => import("../pages/branches/branchesRecord"));

// defining the type
export type routesConfigrationType = {
  path: string;
  component: ReactNode;
};

export const routesConfigration: routesConfigrationType[] = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },

  // User
  {
    path: "/me",
    component: <Profile />,
  },
  {
    path: "/update",
    component: <UpdatePassword />,
  },
  {
    path: "/manageUserProfile",
    component: <RegisterUser />,
  },
  {
    path: "/users",
    component: <ViewUsers />,
  },

  // Products
  {
    path: "/products",
    component: <ProductRecords />,
  },
  {
    path: "/createProduct",
    component: <CreateProduct />,
  },
  {
    path: "/updateProduct",
    component: <UpdateProduct />,
  },

  // Variations
  {
    path: "/variation",
    component: <VariationRecords />,
  },
  {
    path: "/createVariation",
    component: <CreateVariation />,
  },
  {
    path: "/updateVariation",
    component: <UpdateVariation />,
  },

  // Variation Options
  {
    path: "/variationOption",
    component: <VariationOptionRecords />,
  },
  {
    path: "/createVariationOptions",
    component: <CreateVariationOptions />,
  },
  {
    path: "/updateVariationOptions",
    component: <UpdateVariationOptions />,
  },

  // Category
  {
    path: "/category",
    component: <CategoryRecords />,
  },
  // {
  //   path: "/createCategory",
  //   component: <CreateCategory />,
  // },
  // {
  //   path: "/updateCategory",
  //   component: <UpdateCategory />,
  // },

  // Slider Image Gallery
  {
    path: "/sliderGallery",
    component: <SliderImage />,
  },
  {
    path: "/uploadSlider",
    component: <UploadSliderImages />,
  },

  // Orders
  {
    path: "/orders",
    component: <ViewOrders />,
  },
  {
    path: "/processOrder",
    component: <ProcessOrder />,
  },

  // Customer
  {
    path: "/customers",
    component: <Customer />,
  },

  // Banner
  {
    path: "/promotionBanner",
    component: <Banner />,
  },

  // Discounts
  {
    path: "/bulkDiscount",
    component: <BulkSectionDiscount />,
  },
  {
    path: "/promoCodes",
    component: <PromoCodes />,
  },

  // Branches
  {
    path: "/branches",
    component: <Branches />,
  },
];
