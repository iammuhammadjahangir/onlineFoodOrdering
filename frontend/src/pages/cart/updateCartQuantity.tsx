import { ItemsTypeCart } from "../../types/apiTypes";

const updateCartQuantity = () => {
  const totalItems = JSON.parse(localStorage.getItem("cart") || "[]");
  return totalItems.reduce((acc: number, current: ItemsTypeCart) => {
    return acc + current.quantity;
  }, 0);
};

export { updateCartQuantity };
