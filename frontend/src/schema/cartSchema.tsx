import * as Yup from "yup";

// const detailsSchema = Yup.object().shape({
//   _id: Yup.string().required("Detail Id is Required"),
//   name: Yup.string().required("Detail name is Required"),
//   hexCode: Yup.string().required("Detail hexCode is Required"),
//   createdAt: Yup.string().required("Detail created At is Required"),
// });

// Define schemas for nested types
// const colorSchema = Yup.object().shape({
//   details: detailsSchema,
//   images: Yup.array().of(
//     Yup.object().shape({
//       url: Yup.string().required("Image URL is required"),
//       blurHash: Yup.string().required("Image blurHash is required"),
//     })
//   ),
//   quantity: Yup.number().required("Color quantity is required"),
//   _id: Yup.string().required("Color ID is required"),
// });

// const variationSchema = Yup.object().shape({
//   _id: Yup.string().required("Variation ID is required"),
//   name: Yup.string().required("Variation name is required"),
//   description: Yup.string().required("Variation description is required"),
//   actualPrice: Yup.number().required("Variation actualPrice is required"),
//   offerPrice: Yup.number().required("Variation offerPrice is required"),
//   colors: colorSchema,
//   createdAt: Yup.string().required("Variation createdAt is required"),
// });

// Define the main schema for cart item
export const cartSchema = Yup.object().shape({
  // customerId: Yup.string().required("Customer ID is required"),
  // deliveryTime: Yup.date().required("Delivery time is required"),
  instruction: Yup.string(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().required("Item ID is required"),
        productID: Yup.string().required("Product ID is required"),
        name: Yup.string().required("Item name is required"),
        description: Yup.string().required("Item description is required"),
        shopID: Yup.string(),
        wareHouseID: Yup.string(),
        sizeID: Yup.string().required("Size ID is required"),
        colorID: Yup.string().required("Color ID is required"),
        materialID: Yup.string().required("Material ID is required"),
        styleID: Yup.string().required("Style ID is required"),
        purchasePrice: Yup.number().required("Purchase price is required"),
        salePrice: Yup.number().required("Sale price is required"),
        weight: Yup.number().required("Weight is required"),
        dimension: Yup.object()
          .shape({
            length: Yup.number().required("Length is required"),
            width: Yup.number().required("Width is required"),
            height: Yup.number().required("Height is required"),
          })
          .required("Dimensions are required"),
        stockQuantity: Yup.number().required("Stock quantity is required"),
        image: Yup.object()
          .shape({
            url: Yup.string().required("Image URL is required"),
            blurHash: Yup.string().required("Image blurHash is required"),
          })
          .required("Image is required"),
        purchaseQuantity: Yup.number().required(
          "Purchase quantity is required"
        ),
        totalPrice: Yup.number().required("Total price is required"),
      })
    )
    .required("Items are required"),
});
