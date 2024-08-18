import { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { addedToLocalStorageCart } from "../features/addedLocalStorageCart";
import { server } from "../redux/store";
import valtioStore from "../redux/valtioStore";
import { ItemsType, ItemsTypeCart } from "../types/apiTypes";
import { itemCardTypes } from "../types/types";
import SpinnerLoader from "./loader/spinnerLoader";
import {
  getCustomer,
  useUpdateCustomerMutation,
} from "../redux/api/customerApi";
import {
  customerExist,
  customerNotExist,
} from "../redux/reducers/customerReducer";
import { useDispatch, useSelector } from "react-redux";
import { CustomerReducerInitialState } from "../types/reducerType";

const ItemCard = ({ data, index }: itemCardTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const valtio = useSnapshot(valtioStore);
  const [updateCustomer] = useUpdateCustomerMutation();
  const [isLoadingMap, setIsLoadingMap] = useState<{
    [itemId: string]: boolean;
  }>(
    {} // Map to store loading state for each item
  );
  // console.log(valtio.user);
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

  const handleAddtoCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ItemsType
  ) => {
    e.stopPropagation();
    const isProductRequired = item.variations.some(
      (variation) => variation.isRequired === true
    );

    if (isProductRequired) {
      toast.error("Please Select Required Option");
      navigate(`/search/${item.name}`, { state: { item: item } });
    } else {
      // Handle Add to Cart
      if (valtio.user === false) {
        // Add to the user Database
        // console.log("not entered");
      } else {
        // console.log("Entered");
        const cartItem: ItemsTypeCart = {
          ...item,
          productImage: {
            url: item.productImage.url,
            blurHash: item.productImage.blurHash,
          },
          finalPrice: item.actualPrice,
          variationOptions: [],
          variationRequired: [],
          quantity: 1,
        };

        addedToLocalStorageCart(cartItem);
      }
    }
  };

  const handleFavourite = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: any
    // item: ItemsType
  ) => {
    e.stopPropagation();
    // Just and a data with this id so that no other component will start loading
    setIsLoadingMap((prevState) => ({
      ...prevState,
      [id]: true, // Set loading state for the specific item
    }));

    // Set current wishList of the user
    const wishList = customer?.wishList;
    console.log(wishList);
    let newWishList;

    // Condition to Check if there is already an item in the wishlist then filter .. otherwuse add
    if (
      wishList &&
      wishList?.length > 0 &&
      wishList?.some((wishListItem) => (wishListItem === id ? true : false))
    ) {
      // console.log("entered");
      newWishList = wishList.filter((item) => item !== id);
    } else {
      newWishList = [...(wishList || []), id];
    }

    // now update wishList for the customer
    const res = await updateCustomer({
      id: customer?._id ?? "",
      wishList: newWishList,
    });

    // Rerender the customer data in store
    if ("data" in res) {
      const data = await getCustomer(customer?._id!);
      dispatch(customerExist(data.customer));
      toast.success("WishList Updated");
    } else {
      dispatch(customerNotExist());
      toast.error("Something Went Wrong");
    }
    setIsLoadingMap((prevState) => ({
      ...prevState,
      [id]: false, // Reset loading state for the specific item
    }));
  };

  const handleNavigate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    items: ItemsType
  ) => {
    e.stopPropagation();
    navigate(`/search/${items.name}`, { state: { item: items } });
  };

  return (
    <div className={`itemCardContainer `} id={`category${index}`}>
      <h1>{data.category}</h1>
      <div className={data.items.length > 1 ? "centerClass" : ""}>
        {data.items.map((item, index) => (
          <div
            className="itemCard"
            key={index}
            onClick={(e) => {
              handleNavigate(e, item);
            }}
          >
            <img src={`${server}/${item.productImage.url}`} alt={item.name} />
            <div>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
            {Number(item.actualPrice) > 0 ? (
              <h5>Rs.{item.actualPrice}</h5>
            ) : (
              <h5>
                From Rs.
                {Math.min(
                  ...item.variations.flatMap((v) =>
                    v.variationOptions.map((o) => o.price)
                  )
                )}
              </h5>
            )}

            <div>
              <button onClick={(e) => handleAddtoCart(e, item)}>
                Add To Cart
              </button>
            </div>
            <div
              className="favourite"
              onClick={(e) => {
                handleFavourite(e, item._id);
              }}
            >
              {!isLoadingMap[item._id] ? (
                customer?.wishList?.some((wishListItem: string) =>
                  wishListItem === item?._id ? true : false
                ) ? (
                  <FaHeart style={{ fill: "red" }} />
                ) : (
                  <FaRegHeart />
                )
              ) : (
                <SpinnerLoader />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
