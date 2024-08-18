import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaFirstOrderAlt, FaRegAddressBook } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { HiMenuAlt4 } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import { TbBasketCancel, TbBrandWish } from "react-icons/tb";
import { Link, Location, useLocation } from "react-router-dom";

// sign Out
import { auth } from "../../authentication/firebase";
import toast from "react-hot-toast";

const UserSideBar = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      // navigate("/")
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />{" "}
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                // top: "65px",
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s ",
              }
            : {}
        }
      >
        <SectionOne location={location} />
        <SectionTwo location={location} />
        <SectionThree location={location} />
        {phoneActive && (
          <>
            <button id="closeSidebar" onClick={() => setShowModal(false)}>
              Close
            </button>
            <button id="closeSidebar" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </aside>
    </>
  );
};

const SectionOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Manage Account</h5>
    <ul>
      <Li url="/profile" text="Profile" Icon={ImProfile} location={location} />
      <Li
        url="/addressBook"
        text="Address"
        Icon={FaRegAddressBook}
        location={location}
      />
      <Li
        url="/paymentOptions"
        text="Payment Options"
        Icon={MdPayment}
        location={location}
      />
    </ul>
  </div>
);
const SectionTwo = ({ location }: { location: Location }) => (
  <div>
    <h5>Orders</h5>
    <ul>
      <Li
        url="/orders"
        text="My Orders"
        Icon={FaFirstOrderAlt}
        location={location}
      />
      <Li
        url="/returnedOrder"
        text="Return"
        Icon={GiReturnArrow}
        location={location}
      />
      <Li
        url="/cancelOrders"
        text="Cancel"
        Icon={TbBasketCancel}
        location={location}
      />
    </ul>
  </div>
);
const SectionThree = ({ location }: { location: Location }) => (
  <div>
    <h5>More...</h5>
    <ul>
      <Li
        url="/wishList"
        text="WishList"
        Icon={TbBrandWish}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: String;
  location: Location;
  Icon: IconType;
}

const Li = ({ Icon, location, text, url }: LiProps) => (
  <li
    className={
      location.pathname.includes(url) ? "yellowLightBackgroundColor" : "white"
    }
    // style={{
    //   backgroundColor: location.pathname.includes(url)
    //     ? "rgba(0,115,255,0.5)"
    //     : "white",
    // }}
  >
    <Link
      to={url}
      className={location.pathname.includes(url) ? "yellowColor" : "black"}
      // style={{
      //   color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      // }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default UserSideBar;
