import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart, FaRegUser, FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import {
  IoCartOutline,
  IoHome,
  IoHomeOutline,
  IoSearch,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomerReducerInitialState } from "../types/reducerType";

interface BottomBarProps {
  setIsCartOpen: (value: boolean) => void;
}
const MobileBottomHeader = ({ setIsCartOpen }: BottomBarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { customer: customerDetails } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );
  console.log(customerDetails);

  const handleNavigation = (index: any, path: string) => {
    if (index === 2) {
      setIsCartOpen(true);
      //   setActiveIndex(null); // Do not set active state for Cart
    } else {
      setActiveIndex(index);
      navigate(path);
    }
  };

  useEffect(() => {
    console.log("entered");
    if (customerDetails) {
      console.log("entered");

      if (activeIndex === 4) {
        console.log("entered");

        setActiveIndex(0);
      }
    } else if (activeIndex === 4) {
      console.log("entered");
      setActiveIndex(0);

      // setActiveIndex(activeIndex
    }
  }, [customerDetails]);

  return (
    <div className="bottomBar">
      <div
        className={`navItem0 bottomNavItem ${
          activeIndex === 0 ? "active" : ""
        }`}
        onClick={() => handleNavigation(0, "/")}
      >
        {activeIndex === 0 ? <IoHome color="#fff" /> : <IoHomeOutline />}
        <p>Home</p>
      </div>
      <div
        className={`navItem1 bottomNavItem ${
          activeIndex === 1 ? "active" : ""
        }`}
        onClick={() =>
          customerDetails?._id
            ? handleNavigation(1, "/wishList")
            : toast.error("Login to check wishList")
        }
      >
        {activeIndex === 1 ? <FaHeart color="#fff" /> : <FaRegHeart />}
        <p>WishList</p>
      </div>
      <div
        className={`navItem2 bottomNavItem`}
        onClick={() => handleNavigation(2, "")}
      >
        <IoCartOutline />
        <p>Cart</p>
      </div>
      <div
        className={`navItem3 bottomNavItem ${
          activeIndex === 3 ? "active" : ""
        }`}
        onClick={() => handleNavigation(3, "/search")}
      >
        {activeIndex === 3 ? <IoSearch color="#fff" /> : <IoIosSearch />}
        <p>Search</p>
      </div>
      <div
        className={`navItem4 bottomNavItem ${
          activeIndex === 4 ? "active" : ""
        }`}
        onClick={() =>
          customerDetails?._id
            ? handleNavigation(4, "/profile")
            : handleNavigation(4, "/login")
        }
      >
        {activeIndex === 4 ? <FaUserAlt color="#fff" /> : <FaRegUser />}
        <p>Account</p>
      </div>
    </div>
  );
};

export default MobileBottomHeader;
