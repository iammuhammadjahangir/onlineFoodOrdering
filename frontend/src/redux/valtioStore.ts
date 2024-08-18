import { proxy } from "valtio";
import { ItemsTypeCart } from "../types/apiTypes";

const valtioStore = proxy({
  user: true,
  cartCount: JSON.parse(localStorage.getItem("cart") || "[]").reduce(
    (acc: number, current: ItemsTypeCart) => {
      return acc + current.quantity;
    },
    0
  ),
});

export default valtioStore;
