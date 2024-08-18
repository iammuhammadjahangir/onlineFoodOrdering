import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Tooltip from "../../tooltip/tooltip";

// Icons
import { HiOutlineLogout } from "react-icons/hi";
import {
  MdOutlineCatchingPokemon,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { RiSettingsLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logoutUser } from "../../../redux/reducers/userReducer";
import LanguageDropDown from "../../../locale/languageDropDown";

interface NavBarProps {
  setIsOpen: (value: boolean) => void;
}
const Navbar = ({ setIsOpen }: NavBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleLogoClick = () => {
    navigate("/dashboard");
  };
  const settings = async () => {
    navigate("/settings");
  };

  const Logout = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure You Want to Logout",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.value) {
        // console.log("called");
        dispatch(logoutUser() as any);
      }
    });
  };
  return (
    <nav className="navBar">
      <button onClick={() => setIsOpen(true)}>
        <FaBars className="svgClass" />
      </button>
      <div className="logo" onClick={HandleLogoClick}>
        {/* <Tooltip text="Dashboard" length="medium" position="down"> */}
        <button>
          <MdOutlineCatchingPokemon />
        </button>
        {/* </Tooltip> */}
        <p className="brandName">{import.meta.env.VITE_BRANDNAME}</p>
      </div>
      <aside className="navMenu">
        {/* <p className="userName">
          {JSON.parse(localStorage.getItem("username") || "")}
        </p> */}
        <LanguageDropDown />
        <Tooltip text="Notification" length="small" position="down">
          <button>
            <span className="badge">9+</span>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency/20/alarm.png"
              alt="alarm"
            />
          </button>
        </Tooltip>

        {/* <Tooltip text="Setting" length="small" position="down">
          <button onClick={settings}>
            <RiSettingsLine />
          </button>
        </Tooltip> */}
        <Tooltip text="Logout" length="small" position="down">
          <button onClick={Logout}>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/dusk/20/exit.png"
              alt="exit"
            />
          </button>
        </Tooltip>
      </aside>
    </nav>
  );
};

export default Navbar;
