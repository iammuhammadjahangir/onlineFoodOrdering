import * as Yup from "yup";

// Define the Yup schema for validation
export const bulkCategoryDiscountSchema = Yup.object().shape({
  startDate: Yup.date().nullable().required("Date is required"),
  endDate: Yup.date()
    .nullable()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  discountPercentage: Yup.number()
    .required("Discount Percentage is required")
    .min(1, "Discount Percentage must be at least 1")
    .max(100, "Discount Percentage cannot exceed 100"),
  categories: Yup.array()
    .of(Yup.string())
    .required("At least one category is required")
    .min(1, "At least one category must be selected"),
});

export const promoCodeSchema = Yup.object().shape({
  promoCode: Yup.string().required("Promo code is required"),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date()
    .nullable()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  forFirstTimeOnly: Yup.boolean().required("This field is required"),
  maxCount: Yup.number()
    .integer()
    .min(1, "Must be 1 or greater")
    .required("Max count is required"),
  maxCountPerUser: Yup.number()
    .integer()
    .min(1, "Must be 1 or greater")
    .required("Max count per user is required"),
  discountType: Yup.string()
    .oneOf(["Flat", "Percentage"])
    .required("Discount type is required"),
  discountAmount: Yup.number()
    .min(1, "Must be 1 or greater")
    .required("Discount amount is required"),
  minimumOrderAmount: Yup.number()
    .min(1, "Must be 1 or greater")
    .required("Minimum order amount is required"),
  orderType: Yup.string()
    .oneOf(["Delivery", "Pickup"])
    .required("Order type is required"),
  branches: Yup.array().of(Yup.string()).required("Branches are required"),
  applicableOnSections: Yup.array()
    .of(Yup.string())
    .required("Applicable sections are required"),
  freeProduct: Yup.string().nullable(),
  specificCustomer: Yup.string().nullable(),
  applicableOn: Yup.string().nullable(),
  usedCount: Yup.number()
    .integer()
    .min(0, "Must be 0 or greater")
    .required("Used count is required"),
});
