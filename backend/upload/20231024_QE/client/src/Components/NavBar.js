import React, { useState, useEffect } from "react";
import * as iconss from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, json } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import * as ImCross from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import LanguageSwitcher from "../locales/localeDropDownOption/LanguageDropDown";
import { BiSolidDownArrow } from "react-icons/bi";
import MiniDrawer from "./sidebar";
import { useLocation } from "react-router-dom";
import { getOnlyAssignedTaskByRole } from "../actions/assignTaskAction";

/////***** material ui ******//////
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const userName = JSON.parse(localStorage.getItem("username"));

  const [showMenu, setShowMenu] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [permissions, setPermissions] = useState("");

  useEffect(() => {
    console.log("Hello");
    getRole();
    console.log("Hello2");
  }, [location.pathname]);

  const getRole = async () => {
    const permission = await getOnlyAssignedTaskByRole(
      JSON.parse(localStorage.getItem("userRoleId"))
    );
    console.log(permission.data.taskNamesArray);
    setPermissions(permission.data.taskNamesArray);
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
    setShowMenu(false);
    setSidebar(false);
  }, [isSuccess, navigate]);

  const { isSalesman, isAdmin, username, status } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);

  // const auth = localStorage.getItem("user");
  // console.log(userRole);
  const showSidebar = () => setSidebar(!sidebar);
  const userPanel = () => {
    console.log("hello");
    navigate("/updateUserProfile");
  };

  const handleLinkClick = (path, submenu) => {
    // console.log(path);
    // console.log(submenu);
    if (path) {
      window.location.href = path;
    } else {
      if (selectedItem === submenu) {
        // If the selected item is the same as the clicked submenu, toggle its state
        setSelectedItem(null);
      } else {
        setSelectedItem(submenu); // Otherwise, set the currently selected submenu
      }
    }
    // console.log(path);
  };
  const logout = () => {
    localStorage.clear();
  };

  return (
    <MiniDrawer
      props={{
        userName: userName,
        permissions: permissions,
      }}
    />
    //   <AppBar position="static" sx={{ backgroundColor: 'white' }}>
    //     <sideBar/>
    //   <Toolbar>
    //     <IconButton size="large" edge="start" color="inherit" aria-label="logo">
    //       <CatchingPokemonIcon style={{ color: 'black' }}/>
    //     </IconButton>
    //     <Typography variant="h6" component="div" sx={{flexGrow: 1}} style={{ color: 'black' }}>Qureshi Electronics</Typography>
    //     <Stack  direction="row" spacing={2}>
    //       <Button color="inherit" endIcon={<CircleNotificationsOutlinedIcon style={{ color: 'black' }}/>} />
    //                <LanguageSwitcher />

    //   {JSON.parse(localStorage.getItem("username")) ? (
    //     <>
    //       <IconContext.Provider value={{ color: "#f3f3f3" }}>
    //         <div>
    //           <div style={{ display: "flex", gap: "40px" }}>
    //             <div>
    //               <a
    //                 className="menu-barsss"
    //                 style={{
    //                   color: "#5D5E5F",
    //                   fontWeight: "bold",
    //                   fontSize: "1.2rem",
    //                   transition: "color 0.3s ease",
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   alignItems: "center",
    //                   gap: "10px",
    //                   cursor: "pointer",
    //                   textTransform: "uppercase",
    //                   backgroundColor: "#E0E1E2",
    //                   padding: "6px 20px",
    //                   borderRadius: "10px",
    //                 }}
    //                 onClick={() => setShowMenu(!showMenu)}
    //                 onMouseOver={(e) => {
    //                   e.target.style.color = "blue";
    //                   e.target.style.backgroundColor = "#D5D6D7";
    //                   setShowMenu(!showMenu);
    //                 }}
    //                 onMouseOut={(e) => {
    //                   e.target.style.color = "#5D5E5F";
    //                   e.target.style.backgroundColor = "#E0E1E2";
    //                 }}
    //               >
    //                 WELCOME &nbsp;{userName}
    //                 <IoIosArrowDown />
    //               </a>
    //               {showMenu && (
    //                 <div className="popup-menu">
    //                   <ul className="direction-Elements">
    //                     <li>
    //                       {JSON.parse(
    //                         localStorage.getItem("isAdministrator")
    //                       ) ? (
    //                         <button disabled>
    //                           {`${JSON.parse(localStorage.getItem("status"))}`}
    //                         </button>
    //                       ) : (
    //                         <button disabled>
    //                           {`${JSON.parse(
    //                             localStorage.getItem("status")
    //                           )}(${JSON.parse(
    //                             localStorage.getItem("shopId")
    //                           )})`}
    //                         </button>
    //                       )}
    //                     </li>
    //                     {
    //                       //for Update password menu ..
    //                       <li
    //                         style={{
    //                           fontWeight: "bolder",
    //                           fontSize: "1.5rem",
    //                         }}
    //                         onMouseOver={(e) => {
    //                           e.target.style.color = "blue";
    //                         }}
    //                         onMouseOut={(e) => {
    //                           e.target.style.color = "black";
    //                         }}
    //                       >
    //                         <button onClick={userPanel}>Upate Profile</button>
    //                       </li>
    //                     }
    //                     <li
    //                       style={{
    //                         fontWeight: "bolder",
    //                         fontSize: "1.5rem",
    //                       }}
    //                       onMouseOver={(e) => {
    //                         e.target.style.color = "blue";
    //                       }}
    //                       onMouseOut={(e) => {
    //                         e.target.style.color = "black";
    //                       }}
    //                     >
    //                       <button onClick={sendLogout}>Logout</button>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         </div>

    //       </IconContext.Provider>
    //     </>
    //   ) : (
    //     <ul
    //       className="navbar"
    //       style={{
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         paddingRight: "40px",
    //       }}
    //     >
    //       <li>
    //         <Link
    //           to="login"
    //           style={{
    //             color: "whitesmoke",
    //             backgroundColor: "blueviolet",
    //             borderRadius: "25px",
    //             padding: "15px 30px",
    //           }}
    //         >
    //           Login
    //         </Link>
    //       </li>
    //     </ul>
    //   )}
    //     </Stack>
    //   </Toolbar>
    // </AppBar>
    // <div>
    //   {JSON.parse(localStorage.getItem("username")) ? (
    //     <>
    //       <IconContext.Provider value={{ color: "#f3f3f3" }}>
    //         <div
    //           className="navbar"
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             paddingRight: "40px",
    //           }}
    //         >
    //           <Link to="#" className="menu-bars">
    //             <iconss.FaBars onClick={showSidebar} />
    //           </Link>
    //           <div style={{ display: "flex", gap: "40px" }}>
    //             <div>
    //               <a
    //                 className="menu-barsss"
    //                 style={{
    //                   color: "#5D5E5F",
    //                   fontWeight: "bold",
    //                   fontSize: "1.2rem",
    //                   transition: "color 0.3s ease",
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   alignItems: "center",
    //                   gap: "10px",
    //                   cursor: "pointer",
    //                   textTransform: "uppercase",
    //                   backgroundColor: "#E0E1E2",
    //                   padding: "6px 20px",
    //                   borderRadius: "10px",
    //                 }}
    //                 onClick={() => setShowMenu(!showMenu)}
    //                 onMouseOver={(e) => {
    //                   e.target.style.color = "blue";
    //                   e.target.style.backgroundColor = "#D5D6D7";
    //                   setShowMenu(!showMenu);
    //                 }}
    //                 onMouseOut={(e) => {
    //                   e.target.style.color = "#5D5E5F";
    //                   e.target.style.backgroundColor = "#E0E1E2";
    //                 }}
    //               >
    //                 WELCOME &nbsp;{userName}
    //                 <IoIosArrowDown />
    //               </a>
    //               {showMenu && (
    //                 <div className="popup-menu">
    //                   <ul className="direction-Elements">
    //                     <li>
    //                       {JSON.parse(
    //                         localStorage.getItem("isAdministrator")
    //                       ) ? (
    //                         <button disabled>
    //                           {`${JSON.parse(localStorage.getItem("status"))}`}
    //                         </button>
    //                       ) : (
    //                         <button disabled>
    //                           {`${JSON.parse(
    //                             localStorage.getItem("status")
    //                           )}(${JSON.parse(
    //                             localStorage.getItem("shopId")
    //                           )})`}
    //                         </button>
    //                       )}
    //                     </li>
    //                     {
    //                       //for Update password menu ..
    //                       <li
    //                         style={{
    //                           fontWeight: "bolder",
    //                           fontSize: "1.5rem",
    //                         }}
    //                         onMouseOver={(e) => {
    //                           e.target.style.color = "blue";
    //                         }}
    //                         onMouseOut={(e) => {
    //                           e.target.style.color = "black";
    //                         }}
    //                       >
    //                         <button onClick={userPanel}>Upate Profile</button>
    //                       </li>
    //                     }
    //                     <li
    //                       style={{
    //                         fontWeight: "bolder",
    //                         fontSize: "1.5rem",
    //                       }}
    //                       onMouseOver={(e) => {
    //                         e.target.style.color = "blue";
    //                       }}
    //                       onMouseOut={(e) => {
    //                         e.target.style.color = "black";
    //                       }}
    //                     >
    //                       <button onClick={sendLogout}>Logout</button>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               )}
    //             </div>
    //             <div>
    //               <LanguageSwitcher />
    //             </div>
    //           </div>
    //         </div>
    //         <nav className={sidebar ? "nav-menu active  " : "nav-menu"}>
    //           <ul className="nav-menu-items navbar-container">
    //             <li className="navbar-toggle">
    //               <Link
    //                 to="#"
    //                 className="menu-bars"
    //                 onClick={() => {
    //                   setSidebar(!sidebar);
    //                 }}
    //               >
    //                 <ImCross.ImCross />
    //               </Link>
    //             </li>
    //             {SidebarData?.map((item, index) => {
    //               const isSalesman = JSON.parse(
    //                 localStorage.getItem("isSalesman")
    //               );
    //               const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    //               const isAdministrator = JSON.parse(
    //                 localStorage.getItem("isAdministrator")
    //               );

    //               if (
    //                 (isSalesman && item.roles.includes("Salesman")) ||
    //                 (isAdmin && item.roles.includes("Admin")) ||
    //                 (isAdministrator && item.roles.includes("Administrator"))
    //               ) {
    //                 return (
    //                   <div>
    //                     <li key={index} className={item.cName}>
    //                       <Link
    //                         to={item.path}
    //                         onClick={() => {
    //                           handleLinkClick(item.path, item.subItems);
    //                           !item.subItems && setShowMenu(!showMenu);
    //                         }}
    //                       >
    //                         {item.icon}
    //                         <div className="arowstyle">
    //                           <span>{item.title} </span>
    //                           {item.subItems && <BiSolidDownArrow />}
    //                         </div>
    //                       </Link>
    //                     </li>
    //                     {item.subItems && selectedItem === item.subItems && (
    //                       <ul
    //                         className="nav-menu-items navbar-container"
    //                         style={{
    //                           paddingLeft: "20px",
    //                         }}
    //                       >
    //                         {item.subItems?.map((subItem, subIndex) => {
    //                           if (
    //                             (isSalesman &&
    //                               subItem.roles.includes("Salesman")) ||
    //                             (isAdmin && subItem.roles.includes("Admin")) ||
    //                             (isAdministrator &&
    //                               subItem.roles.includes("Administrator"))
    //                           ) {
    //                             return (
    //                               <li key={subIndex} className={subItem.cName}>
    //                                 <Link
    //                                   to={subItem.path}
    //                                   onClick={() => {
    //                                     handleLinkClick(
    //                                       subItem.path,
    //                                       subItem.subItems
    //                                     );
    //                                     !subItem.subItems &&
    //                                       setShowMenu(!showMenu);
    //                                   }}
    //                                 >
    //                                   {subItem.icon}
    //                                   <span>{subItem.title}</span>
    //                                 </Link>
    //                               </li>
    //                             );
    //                           }
    //                           return null; // Skip rendering the subitem if the user's role doesn't match
    //                         })}
    //                       </ul>
    //                     )}
    //                   </div>
    //                 );
    //               }
    //               return null; // Skip rendering the link if the user's role doesn't match
    //             })}
    //           </ul>
    //         </nav>
    //       </IconContext.Provider>
    //     </>
    //   ) : (
    //     <ul
    //       className="navbar"
    //       style={{
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         paddingRight: "40px",
    //       }}
    //     >
    //       <li>
    //         <Link
    //           to="login"
    //           style={{
    //             color: "whitesmoke",
    //             backgroundColor: "blueviolet",
    //             borderRadius: "25px",
    //             padding: "15px 30px",
    //           }}
    //         >
    //           Login
    //         </Link>
    //       </li>
    //     </ul>
    //   )}
    // </div>
  );
};

export default NavBar;
