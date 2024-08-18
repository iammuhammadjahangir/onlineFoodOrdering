import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string().required("Please provide a name"),
  brandName: Yup.string().required("Please provide a brand name"),
  description: Yup.string().required("Please provide a description"),
  productImage: Yup.mixed()
    .nullable()
    .required("Please provide a product image"),
  additionalImages: Yup.array()
    .of(Yup.mixed().required("Additional image is required"))
    .nullable()
    .max(5, "You can only upload up to 5 additional images"),
  category: Yup.array()
    .of(Yup.string().required("Please provide a category"))
    .min(1, "At least one category is required"),
  deal: Yup.boolean().required(),
  promoCodeOnly: Yup.boolean().required(),
  available: Yup.boolean().required(),
  upsellingItem: Yup.boolean().required(),
  appOnly: Yup.boolean().required(),
  deliveryBy: Yup.mixed()
    .oneOf(["vendor", "customer"])
    .nullable()
    .required("Please select a delivery method"),
  priceType: Yup.mixed()
    .oneOf(["fixed", "starting from"])
    .nullable()
    .required("Please select a price type"),
  price: Yup.number()
    .required("Please provide the price")
    .min(0, "Price must be greater than or equal to 0"),
  discountType: Yup.mixed()
    .oneOf(["percentage", "fixed amount"])
    .nullable()
    .required("Please select a discount type"),
  discountPrice: Yup.number()
    .required("Please provide the discount price")
    .min(0, "Discount price must be greater than or equal to 0"),
  preparationTime: Yup.number()
    .required("Please provide the preparation time")
    .min(0, "Preparation time must be greater than or equal to 0"),
  calories: Yup.number()
    .required("Please provide the number of calories")
    .min(0, "Calories must be greater than or equal to 0"),
  barcode: Yup.string().required("Please provide a barcode"),
  sku: Yup.string().required("Please provide a SKU"),
  uom: Yup.string().required("Please provide a unit of measurement (UOM)"),
  priority: Yup.number()
    .required("Please provide a priority")
    .min(1, "Priority must be greater than or equal to 1"),
  skuPosMappingId: Yup.string().required("Please provide a SKU POS Mapping ID"),
  allergens: Yup.array()
    .of(Yup.string().required("Please provide an allergen"))
    .nullable(),
  tags: Yup.array()
    .of(Yup.string().required("Please provide a tag"))
    .nullable(),
});
