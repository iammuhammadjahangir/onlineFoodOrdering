import { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import SpinnerLoader from "../../components/loader/spinnerLoader";
import { addedToLocalStorageCart } from "../../features/addedLocalStorageCart";
import {
  getCustomer,
  useUpdateCustomerMutation,
} from "../../redux/api/customerApi";
import {
  customerExist,
  customerNotExist,
} from "../../redux/reducers/customerReducer";
import { server } from "../../redux/store";
import valtioStore from "../../redux/valtioStore";
import { ItemsType, ItemsTypeCart } from "../../types/apiTypes";
import { CustomerReducerInitialState } from "../../types/reducerType";

const SearchCard = ({
  _id,
  actualPrice,
  category,
  description,
  name,
  offerPrice,
  productImage,
  variations,
}: ItemsType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const valtio = useSnapshot(valtioStore);
  const [updateCustomer] = useUpdateCustomerMutation();
  const [isLoadingMap, setIsLoadingMap] = useState<{
    [itemId: string]: boolean;
  }>(
    {} // Map to store loading state for each item
  );

  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

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

  const handleAddtoCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const item = {
      _id,
      actualPrice,
      category,
      description,
      name,
      offerPrice,
      productImage,
      variations,
    };
    const isProductRequired = item.variations.some(
      (variation) => variation.isRequired === true
    );

    if (isProductRequired) {
      toast.error("Please Select Required Option");
      window.scroll(0, 0);
      navigate(`/search/${item.name}`, { state: { item: item } });
    } else {
      // Handle Add to Cart
      if (valtio.user === false) {
        // Add to the user Database
        console.log("not entered");
      } else {
        const cartItem: ItemsTypeCart = {
          ...item,
          finalPrice: item.actualPrice,
          variationOptions: [],
          variationRequired: [],
          quantity: 1,
        };

        addedToLocalStorageCart(cartItem);
        // const tempItem = JSON.parse(localStorage.getItem("cart") || "[]");
        // // Check if the item is already in the cart
        // const hasItem = tempItem.some(
        //   (cartItem: ItemsType) => cartItem._id === item._id
        // );
        // if (!hasItem) {
        //   const updatedCart = [...tempItem, { ...item, qty: 1 }];
        //   localStorage.setItem("cart", JSON.stringify(updatedCart));
        //   toast.success("Added To Cart");
        // } else {
        //   toast.error("Already added in your cart");
        // }
      }
    }
  };

  const handleScroll = () => {
    window.scroll(0, 0);
  };

  // const handleFavourite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   setIsLoading((prev) => !prev);
  //   console.log("added to favourite");

  //   setTimeout(() => {
  //     setIsLoading((prev) => !prev);
  //     setIsFavourite((prev) => !prev);
  //   }, 5000);
  // };

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const items = {
      _id,
      actualPrice,
      category,
      description,
      name,
      offerPrice,
      productImage,
      variations,
    };
    navigate(`/search/${items.name}`, { state: { item: items } });
  };

  return (
    <div
      className={`itemCardContainer `}
      onClick={(e) => {
        handleNavigate(e);
      }}
    >
      <div>
        <div className="itemCard" onClick={handleScroll}>
          <img src={`${server}/${productImage.url}`} alt={name} />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          {Number(actualPrice) > 0 ? (
            <h5>Rs.{actualPrice}</h5>
          ) : (
            <h5>
              From Rs.
              {Math.min(
                ...variations.flatMap((v) =>
                  v.variationOptions.map((o) => o.price)
                )
              )}
            </h5>
          )}
          <div>
            <button onClick={(e) => handleAddtoCart(e)}>Add To Cart</button>
          </div>
          <div
            className="favourite"
            onClick={(e) => {
              handleFavourite(e, _id);
            }}
          >
            {!isLoadingMap[_id] ? (
              customer?.wishList?.some((wishListItem: string) =>
                wishListItem === _id ? true : false
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
      </div>
    </div>
  );
};

export default SearchCard;
