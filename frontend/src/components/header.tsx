import { useEffect, useRef, useState } from "react";
import {
  FaAddressCard,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import logo from "../assets/logo.png";
import { auth } from "../authentication/firebase";
import CartModel from "../pages/cart/cartModel";
import valtioStore from "../redux/valtioStore";

import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { server } from "../redux/store";
import { Customer } from "../types/types";
import MobileBottomHeader from "./mobileBottomHeader";

interface HeaderProps {
  customer: Customer | null;
}

const Header = ({ customer }: HeaderProps) => {
  const cartRef = useRef<HTMLDialogElement>(null);

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const { customer: customerDetails } = useSelector(
  //   (state: { customerReducer: CustomerReducerInitialState }) =>
  //     state.customerReducer
  // );

  // console.log(customer);
  const navigate = useNavigate();
  const location = useLocation();
  const valtio = useSnapshot(valtioStore);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(false);

  console.log(showRightArrow);
  console.log(isRightArrowVisible);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth < 768;
      setIsMobileScreen(width);
      if (width) {
        setIsOpen(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Call handleResize initially to set items per row based on initial screen width
    handleResize();

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Logic to check if the right arrow should be visible on component mount
  useEffect(() => {
    // console.log(scrollRef.current);
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const contentWidth = scrollRef.current.scrollWidth;
      // console.log(contentWidth > containerWidth);
      setShowRightArrow(contentWidth > containerWidth);
    }
  }, [scrollRef.current]);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        // Calculate whether right arrow should be visible
        const isScrollAtEnd =
          container.scrollLeft >= container.scrollWidth - container.clientWidth;
        setIsRightArrowVisible(!isScrollAtEnd);
      }
    };

    // Add event listener for scroll
    scrollRef.current?.addEventListener("scroll", handleScroll);

    // Call handleScroll initially
    handleScroll();

    // Remove event listener on component unmount
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef.current]);

  const handleSearch = () => {
    setIsOpen(false);
    navigate("/search");
  };
  const openCart = () => {
    setIsCartOpen(true);
    setIsOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setIsOpen(false);
  };

  const logoutHandler = async () => {
    setIsOpen(false);
    try {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  // const bottomNavItems = [
  //   {
  //     title: "Home",
  //     onClick: () => navigate("/"),
  //     icon: <IoHomeOutline />, // just for example
  //     activeIcon: <IoHome color="#fff" />,
  //   },
  //   {
  //     title: "WishList",
  //     onClick: () => {
  //       if (customerDetails?._id) {
  //         navigate("/wishList");
  //       } else {
  //         toast.error("Login to check wishList");
  //       }
  //     },
  //     icon: <FaRegHeart />, // just for example
  //     activeIcon: <FaHeart color="#fff" />,
  //   },
  //   {
  //     title: "Cart",
  //     onClick: () => {
  //       setIsCartOpen(true);
  //     },
  //     icon: <IoCartOutline />, // just for example
  //     // activeIcon: <IoCartSharp color="#fff" />,
  //   },
  //   {
  //     title: "Search",
  //     onClick: () => navigate("/search"),
  //     icon: <IoIosSearch />, // just for example
  //     activeIcon: <IoSearch color="#fff" />,
  //   },
  //   {
  //     title: "Account",
  //     onClick: () => {
  //       if (customer?._id) {
  //         navigate("/profile");
  //       } else {
  //         navigate("/login");
  //       }
  //     },
  //     icon: <FaRegUser />, // just for example
  //     activeIcon: <FaUserAlt color="#fff" />,
  //   },
  // ];

  // const handleScroll = (scrollOffset: number) => {
  //   // console.log("clicked on recent", scrollOffset);
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTo({
  //       left: scrollRef.current.scrollLeft + scrollOffset,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <>
      {isMobileScreen ? (
        <>
          {/* <BottomNavigation
            items={bottomNavItems}
            selected={0}
            // onItemClick={(item) => console.log(item)}
            activeBgColor="rgba(255, 182, 4, 1)"
            activeTextColor="white"
          /> */}
          <MobileBottomHeader setIsCartOpen={setIsCartOpen} />
        </>
      ) : (
        <>
          <nav className="header">
            <img src={logo} alt="Cheezious" onClick={() => navigate("/")} />
            {/* <h1 onClick={() => navigate("/")}>Cheezious</h1> */}
            {/* <p>logo.</p> */}
            <div className="headerContent">
              <button onClick={handleSearch}>
                <FaSearch />
              </button>
              {/* <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link> */}
              {location.pathname !== "/checkout" && (
                <button onClick={openCart} className="cartButton">
                  <FaCartShopping />

                  <p className="cartCount">{valtio.cartCount}</p>
                </button>
              )}

              {customer?._id ? (
                <>
                  <div
                    className="userDetails"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <img
                      src={
                        customer?.avatar!.startsWith("http")
                          ? customer?.avatar
                          : `${server}/${customer?.avatar}`
                      }
                      alt={customer.name}
                    />
                    <p>{customer.name}</p>
                    <IoMdArrowDropdown />
                  </div>
                  <dialog open={isOpen} ref={cartRef}>
                    <div>
                      {/* {user?.role === "admin" && (
              <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>
                Admin
              </Link>
            )} */}
                      <Link onClick={() => setIsOpen(false)} to={"/profile"}>
                        <FaUserAlt />
                        My Profile
                      </Link>
                      <Link onClick={() => setIsOpen(false)} to={"/orders"}>
                        <IoFastFood />
                        My Order
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        to={"/addressBook"}
                      >
                        <FaAddressCard /> My Address
                      </Link>
                      <Link onClick={() => setIsOpen(false)} to={"/wishList"}>
                        <MdFavorite />
                        My Favourite
                      </Link>
                      <Link to="" onClick={logoutHandler}>
                        <FaSignOutAlt /> Sign Out
                      </Link>
                    </div>
                  </dialog>
                </>
              ) : (
                <Link onClick={() => setIsOpen(false)} to={"/login"}>
                  <FaUser />
                </Link>
              )}
            </div>
            {/* Render the CartModel component */}
          </nav>
        </>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`overlay ${isCartOpen ? "open" : ""}`}
      />
      <CartModel isCartOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Header;

// import { useState } from "react";
// import {
//   FaAddressCard,
//   FaSearch,
//   FaShoppingBag,
//   FaSignInAlt,
//   FaSignOutAlt,
//   FaUserAlt,
// } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { IoFastFood } from "react-icons/io5";
// import { MdFavorite } from "react-icons/md";
// import CartModel from "../pages/cart/cartModel";
// import valtioStore from "../redux/valtioStore";

// import logo from "../assets/logo.png";

// import { Link, useNavigate } from "react-router-dom";
// import { useSnapshot } from "valtio";
// import { useSelector } from "react-redux";
// import { CustomerReducerInitialState } from "../types/reducerType";

// const user = { _id: "sd", role: "dssd", name: "muhammad Jahangir" };

// const Header = () => {
//   const navigate = useNavigate();
//   const valtio = useSnapshot(valtioStore);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const { customer: customerDetails } = useSelector(
//     (state: { customerReducer: CustomerReducerInitialState }) =>
//       state.customerReducer
//   );

//   // useEffect(() => {
//   //   const totalItems = JSON.parse(localStorage.getItem("cart") || "[]");
//   //   console.log(
//   //     totalItems.reduce((acc: number, current: ItemsTypeCart) => {
//   //       return acc + current.quantity;
//   //     }, 0)
//   //   );
//   //   setCartCount(
//   //     totalItems.reduce((acc: number, current: ItemsTypeCart) => {
//   //       return acc + current.quantity;
//   //     }, 0)
//   //   );
//   // }, [localStorage.getItem("cart")]);

//   const handleSearch = () => {
//     setIsOpen(false);
//     navigate("/search");
//   };
//   const openCart = () => {
//     setIsCartOpen(true);
//     setIsOpen(false);
//   };

//   const closeCart = () => {
//     setIsCartOpen(false);
//   };

//   const logoutHandler = () => {
//     setIsOpen(false);
//   };

//   return (
//     <nav className="header">
//       <img src={logo} alt="Jazeera Foods" onClick={() => navigate("/")} />
//       <div className="headerContent">
//         <button onClick={handleSearch}>
//           <FaSearch />
//         </button>
//         {/* <Link onClick={() => setIsOpen(false)} to={"/cart"}>
//           <FaShoppingBag />
//         </Link> */}
//         <button onClick={openCart} className="cartButton">
//           <FaShoppingBag />
//           <p className="cartCount">{valtio.cartCount}</p>
//         </button>

//         {user?._id ? (
//           <>
//             <button onClick={() => setIsOpen((prev) => !prev)}>
//               {user.name}
//               <IoMdArrowDropdown />
//             </button>
//             <dialog open={isOpen}>
//               <div>
//                 {/* {user?.role === "admin" && (
//                 <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>
//                   Admin
//                 </Link>
//               )} */}
//                 <Link onClick={() => setIsOpen(false)} to={"/profile"}>
//                   <FaUserAlt />
//                   My Profile
//                 </Link>
//                 <Link onClick={() => setIsOpen(false)} to={"/orders"}>
//                   <IoFastFood />
//                   My Order
//                 </Link>
//                 <Link onClick={() => setIsOpen(false)} to={"/address"}>
//                   <FaAddressCard /> My Address
//                 </Link>
//                 <Link onClick={() => setIsOpen(false)} to={"/favourite"}>
//                   <MdFavorite />
//                   My Favourite
//                 </Link>
//                 <Link to="" onClick={logoutHandler}>
//                   <FaSignOutAlt /> Sign Out
//                 </Link>
//               </div>
//             </dialog>
//           </>
//         ) : (
//           <Link onClick={() => setIsOpen(false)} to={"/login"}>
//             <FaSignInAlt />
//           </Link>
//         )}
//       </div>
//       {/* Render the CartModel component */}
//       <CartModel isCartOpen={isCartOpen} onClose={closeCart} />
//     </nav>
//   );
// };

// export default Header;
