import * as yup from "yup";

const addressSchema = yup.object().shape({
  // reciverName: yup.string().required("Please provide receiver name"),
  addressDetail: yup.string().required("Please provide address"),
  // phoneNo: yup.string().required("Please provide phone number"),
  // landMark: yup.string(),
  // addressType: yup.string().oneOf(["Home", "Office", "Other"]).default("Home"),
  // province: yup.string().required("Please provide province"),
  city: yup.string().required("Please provide city"),
  area: yup.string().required("Please provide state"),
  // homeDefault: yup.boolean().default(false),
  // billingDefault: yup.boolean().default(false),
});

const itemSchema = yup.object().shape({
  _id: yup.string().required("Item ID is required"),
  name: yup.string().required("Item name is required"),
  description: yup.string().required("Item description is required"),
  category: yup
    .object()
    .shape({
      _id: yup.string().required("Category ID is required"),
      name: yup.string().required("Category name is required"),
      description: yup.string().required("Category description is required"),
      createdAt: yup.date().required("Category creation date is required"),
      updatedAt: yup.date().required("Category update date is required"),
      __v: yup.number().required("Category version is required"),
    })
    .required("Category is required"),
  actualPrice: yup.number().required("Actual price is required"),
  offerPrice: yup.number().required("Offer price is required"),
  finalPrice: yup.number().required("Final price is required"),
  productImage: yup
    .object()
    .shape({
      url: yup.string().required("Image URL is required"),
      blurHash: yup.string().required("Image blurHash is required"),
    })
    .required("Image is required"),
  variations: yup.array().of(yup.object()),
  quantity: yup.number().required("Quantity is required"),
  variationOptions: yup.array().of(yup.object()),
  variationRequired: yup.array().of(yup.object()),
});

const orderSchema = yup.object().shape({
  customerId: yup.string().required("Please provide customer ID"),
  phoneNo: yup.string().required("Please provide phone number"),
  items: yup.array().of(itemSchema).required("Please provide items"),
  deliveryAddress: addressSchema.required("Please provide delivery address"),
  // billingAddress: addressSchema.required("Please provide billing address"),
  shippingFee: yup.number().required("Please provide shipping fee"),
  couponDiscountCode: yup.string(),
  paymentMethod: yup.string().required("Please provide payment method"),
  subTotal: yup.number().required("Please provide sub total"),
  discountPrice: yup.number().required("Please provide discount price"),
  grandTotalPrice: yup.number().required("Please provide grand total price"),
});
export const nonExistingCustomerOrderSchema = yup.object().shape({
  // customerId: yup.string().required("Please provide customer ID"),
  name: yup.string().required("Customer Name is Required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNo: yup.string().required("Please provide phone number"),
  items: yup.array().of(itemSchema).required("Please provide items"),
  deliveryAddress: addressSchema.required("Please provide delivery address"),
  // billingAddress: addressSchema.required("Please provide billing address"),
  shippingFee: yup.number().required("Please provide shipping fee"),
  couponDiscountCode: yup.string(),
  paymentMethod: yup.string().required("Please provide payment method"),
  subTotal: yup.number().required("Please provide sub total"),
  discountPrice: yup.number().required("Please provide discount price"),
  grandTotalPrice: yup.number().required("Please provide grand total price"),
});

export default orderSchema;
