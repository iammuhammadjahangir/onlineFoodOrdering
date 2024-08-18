import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineNoFood, MdRemoveShoppingCart } from "react-icons/md";
import { useSnapshot } from "valtio";
import { server } from "../../redux/store";
import valtioStore from "../../redux/valtioStore";
import { ItemsTypeCart } from "../../types/apiTypes";
import { updateCartQuantity } from "./updateCartQuantity";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export type CartModelType = {
  isCartOpen: boolean;
  onClose: () => void;
};
const CartModel = ({ isCartOpen, onClose }: CartModelType) => {
  const navigate = useNavigate();
  // const [quantity, setQuantity] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const valtio = useSnapshot(valtioStore);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, onClose]);

  useEffect(() => {
    const data: ItemsTypeCart[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const subTotal = data.reduce((acc, item) => acc + item.finalPrice, 0);
    setSubTotal(subTotal);
  }, [forceUpdate, isCartOpen]);

  const handleClearCart = () => {
    // Handle User clear Cart
    Swal.fire({
      title: "Do u Want to Clear Cart?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Clear",
      // denyButtonText: `Don't save`,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        valtioStore.cartCount = 0;
        Swal.fire("Cart Cleared!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    onClose();
  };

  const handleQuantityUpdate = (
    newqty: number,
    indexToUpdateQuantity: number
  ) => {
    let currentData = JSON.parse(localStorage.getItem("cart") || "[]");
    if (indexToUpdateQuantity > -1 && currentData.length > 0) {
      const singleItemPrice =
        currentData[indexToUpdateQuantity].finalPrice /
        currentData[indexToUpdateQuantity].quantity;
      const UpdatedQuantity = Math.floor(
        currentData[indexToUpdateQuantity].quantity + newqty
      );
      console.log("====================================");
      console.log(singleItemPrice);
      console.log(currentData[indexToUpdateQuantity].quantity + newqty);
      console.log("====================================");
      currentData[indexToUpdateQuantity].quantity = UpdatedQuantity;
      currentData[indexToUpdateQuantity].finalPrice =
        singleItemPrice * UpdatedQuantity;
      console.log("====================================");
      console.log(currentData);
      console.log("====================================");

      // Step 4: Save the updated array back to local storage
      localStorage.setItem("cart", JSON.stringify(currentData));
      valtioStore.cartCount = updateCartQuantity();
      setForceUpdate((prevState) => prevState + 1);
      toast.success("Quantity Updated Successfully");
    } else {
      toast.error("SomeThing Went Wrong");
    }
  };

  const handleDeleteFromCart = (indexToRemove: number) => {
    let currentData = JSON.parse(localStorage.getItem("cart") || "[]");
    if (indexToRemove > -1 && currentData.length > 0) {
      currentData.splice(indexToRemove, 1);
      localStorage.setItem("cart", JSON.stringify(currentData));
      valtioStore.cartCount = updateCartQuantity();
      setForceUpdate((prevState) => prevState + 1);
      toast.success("Item Successfully remove from Cart");
    } else {
      toast.error("SomeThing Went Wrong");
    }
  };

  return (
    <div className={`cartContainer ${isCartOpen ? "open" : ""}`} ref={cartRef}>
      <div className="CartItems">
        <div className="cartHeader">
          <h1>Your Cart</h1>
          <button onClick={handleClearCart}>
            <MdRemoveShoppingCart />
          </button>
        </div>
        {valtio.user === false ? (
          <></>
        ) : localStorage.getItem("cart") &&
          JSON.parse(localStorage.getItem("cart") || "[]").length > 0 ? (
          <>
            <div className="container">
              <div className="mainCartContainer">
                {JSON.parse(localStorage.getItem("cart") || "[]").map(
                  (item: ItemsTypeCart, index: number) => (
                    <div className="itemContainer" key={index}>
                      <div className="imageContainer">
                        <img
                          src={`${server}/${item.productImage.url}`}
                          alt=""
                        />
                      </div>
                      <div className="details">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        {item?.variationRequired?.map((required, index) => (
                          <div key={index}>
                            <h5>{required.variationName}</h5>
                            <p>1 X {required.name}</p>
                          </div>
                        ))}
                        {item?.variationOptions?.map((option, index) => (
                          <div key={index}>
                            <h5>{option.varName}</h5>
                            {option.variation.map((opt) => (
                              <p>1 X {opt.name}</p>
                            ))}
                          </div>
                        ))}
                        {/* <p>{item.variationRequired.name}</p>
                    {item.variationOptions.variationOption.length > 0 && (
                      <>
                        <h5>{item.variationOptions.variationName}</h5>
                        {item.variationOptions.variationOption.map(
                          (varOpt, index) => (
                            <div key={index}>
                              <p>1 x {varOpt.name}</p>
                            </div>
                          )
                        )}
                      </>
                    )} */}
                        <p className="finalPrice">Rs.{item.finalPrice}</p>
                        <div className="cartchange">
                          <div className="quantityChange">
                            <button
                              disabled={item.quantity < 2}
                              onClick={() => {
                                handleQuantityUpdate(-1, index);
                              }}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              disabled={
                                item.quantity >
                                Number(import.meta.env.VITE_MAX_QUANTITY_CART) -
                                  1
                              }
                              onClick={() => {
                                handleQuantityUpdate(1, index);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div
                            className="deleteButton"
                            onClick={() => {
                              handleDeleteFromCart(index);
                            }}
                          >
                            <AiTwotoneDelete />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="checkoutCart">
                <div className="subTotal">
                  <h3>Subtotal</h3>
                  <p>Rs.{subTotal}</p>
                </div>
                <div className="deliveryCharges">
                  <h3>Delivery Charges</h3>
                  <p>Rs.{import.meta.env.VITE_DELIVERY_CHARGES}</p>
                </div>
                <div className="grandTotal">
                  <h2>Grand Total</h2>
                  <p>
                    Rs.
                    {subTotal + Number(import.meta.env.VITE_DELIVERY_CHARGES)}
                  </p>
                </div>
                <div className="checkoutbtn">
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/checkout");
                    }}
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

const EmptyCart = () => (
  <div className="empty">
    <MdOutlineNoFood />
    <h1>No Item Added</h1>
  </div>
);

export default CartModel;
