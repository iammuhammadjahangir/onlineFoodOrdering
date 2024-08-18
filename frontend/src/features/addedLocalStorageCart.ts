import toast from "react-hot-toast";
import { ItemsTypeCart } from "../types/apiTypes";
import valtioStore from "../redux/valtioStore";
import { updateCartQuantity } from "../pages/cart/updateCartQuantity";

export const addedToLocalStorageCart = ({
  _id,
  actualPrice,
  category,
  description,
  name,
  offerPrice,
  productImage,
  variations,
  finalPrice,
  quantity,
  variationOptions,
  variationRequired,
}: ItemsTypeCart) => {
  const item = {
    _id,
    actualPrice,
    category,
    description,
    name,
    offerPrice,
    productImage,
    variations,
    finalPrice,
    quantity,
    variationOptions,
    variationRequired,
  };
  const tempItem = JSON.parse(localStorage.getItem("cart") || "[]");
  // Check if the item is already in the cart
  // Check if the item is already in the cart based on all properties except quantity

  console.log(tempItem);
  console.log(item);
  const existingItemIndex = tempItem.findIndex((cartItem: ItemsTypeCart) => {
    return (
      cartItem._id === item._id &&
      cartItem.finalPrice === item.finalPrice &&
      cartItem.actualPrice === item.actualPrice &&
      cartItem.category._id === item.category._id &&
      cartItem.category.name === item.category.name &&
      cartItem.description === item.description &&
      cartItem.name === item.name &&
      cartItem.offerPrice === item.offerPrice &&
      cartItem.productImage.url === item.productImage.url &&
      cartItem.productImage.blurHash === item.productImage.blurHash &&
      cartItem.variationOptions.every((option, optionIndex) => {
        const itemOption = item.variationOptions[optionIndex];
        return (
          option?.index === itemOption?.index &&
          option?.varId === itemOption?.varId &&
          option?.varName === itemOption?.varName &&
          option?.variation.every((varoption, varOptionIndex) => {
            const itemVarOption = itemOption?.variation[varOptionIndex];
            return (
              varoption._id === itemVarOption._id &&
              varoption.name === itemVarOption.name &&
              varoption.price === itemVarOption.price &&
              varoption.variationName === itemVarOption.variationName
            );
          })
        );
      }) &&
      cartItem.variationRequired.every((variationRequired, variationIndex) => {
        const itemVariationRequired = item.variationRequired[variationIndex];
        return (
          variationRequired._id === itemVariationRequired._id &&
          variationRequired.name === itemVariationRequired.name &&
          variationRequired.price === itemVariationRequired.price &&
          variationRequired.variationName ===
            itemVariationRequired.variationName
        );
      })
    );
  });

  console.log(existingItemIndex);

  if (existingItemIndex !== -1) {
    if (
      tempItem[existingItemIndex].quantity ===
      Number(import.meta.env.VITE_MAX_QUANTITY_CART)
    ) {
      toast.error("Maximum quantity reached");
      return;
    }

    tempItem[existingItemIndex].quantity += quantity;
    localStorage.setItem("cart", JSON.stringify(tempItem));
  } else {
    // If item does not exist, add a new product
    const updatedCart = [...tempItem, { ...item, quantity: quantity }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  valtioStore.cartCount = updateCartQuantity();

  if (existingItemIndex !== -1) {
    toast.success("Quantity incremented in Cart");
  } else {
    toast.success("Added To Cart");
  }
};
