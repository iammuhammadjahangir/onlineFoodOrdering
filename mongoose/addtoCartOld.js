import toast from "react-hot-toast";
import { ItemsTypeCart } from "../types/apiTypes";
import valtioStore from "../redux/valtioStore";

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
  const hasItem = tempItem.some((cartItem: ItemsTypeCart) => {
    if (
      cartItem._id === item._id &&
      cartItem.quantity === item.quantity &&
      cartItem.finalPrice === item.finalPrice &&
      cartItem.actualPrice === item.actualPrice &&
      cartItem.category._id === item.category._id &&
      cartItem.category.name === item.category.name &&
      cartItem.description === item.description &&
      cartItem.name === item.name &&
      cartItem.offerPrice === item.offerPrice &&
      cartItem.productImage === item.productImage &&
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
    ) {
      return true;
    }
    return false;
  });

  console.log(hasItem);

  if (!hasItem) {
    const updatedCart = [...tempItem, { ...item, quantity: quantity }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const totalItems = JSON.parse(localStorage.getItem("cart") || "[]");
    valtioStore.cartCount = totalItems.reduce(
      (acc: number, current: ItemsTypeCart) => {
        return acc + current.quantity;
      },
      0
    );
    toast.success("Added To Cart");
  } else {
    toast.error("Already added in your cart");
  }
};
