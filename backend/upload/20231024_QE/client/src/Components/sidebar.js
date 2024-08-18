//for SideBar
import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import "./../SettingComponent/ThemeSetting/switcher.css";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import LogoutNavBar from "./LogoutNavBar.js";
import LoginNavBar from "./LoginNavBar";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { BiSolidDownArrow } from "react-icons/bi";
import LanguageSwitcher from "../locales/localeDropDownOption/LanguageDropDown";
import "./sidebar.css";
//SideBar Data
import { SidebarData } from "./SidebarData";

//For Navigation
import { useNavigate } from "react-router-dom";

//For Icons
import { BiLogOut } from "react-icons/bi";

import { useTranslation } from "react-i18next";
import { logout } from "../actions/userAction.js";
import {
  LOAD_USER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../constants/userConstants.js";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerFooter = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%", // Make the footer take up the full width
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ props }) {
  const dispatch = useDispatch();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const [colorTheme, setColorTheme] = useState(
    localStorage.getItem("theme-color")
  );

  //to set the status of the user
  const isSalesman = JSON.parse(localStorage.getItem("isSalesman"));
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isAdministrator = JSON.parse(localStorage.getItem("isAdministrator"));
  const isSuperAdmin = JSON.parse(localStorage.getItem("isSuperAdmin"));

  //For handling click on the item
  const handleLinkClick = (path, submenu) => {
    console.log("hello", path, submenu);
    if (path) {
      window.location.href = path;
    } else {
      if (selectedItem === submenu) {
        console.log("first");
        setSelectedItem(null);
      } else {
        console.log("second");
        setSelectedItem(submenu);
        setOpen(true);
      }
    }
  };

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showMenu, setShowMenu] = React.useState(false);

  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedItem(false);
  };

  React.useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));

    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme, localStorage.getItem("theme-color")]);

  const handleDrawerCloseForLogout = async () => {
    setOpen(false);
    // await logout()
    dispatch(logout());
    dispatch({ type: LOAD_USER_FAIL });
    navigate("/login");
  };

  const userPanel = () => {
    navigate("/settings");
    // navigate("/updateUserProfile");
  };

  //useEffect
  React.useEffect(() => {
    if (isSuccess) navigate("/login");
    setShowMenu(false);
  }, [isSuccess, navigate]);

  return (
    <>
      {JSON.parse(localStorage.getItem("username")) ? (
        <Box>
          <CssBaseline />
          <LoginNavBar
            props={{
              showMenu: showMenu,
              setShowMenu: setShowMenu,
              open: open,
              setOpen: setOpen,
            }}
          />

          <Drawer
            variant="permanent"
            sx={{
              position: "relative",
              marginLeft: "1000px",
            }}
            className={`appNavbar ${colorTheme}`}
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List sx={{ position: "relative" }}>
              {SidebarData?.map((item, index) =>
                (isSalesman && item.roles.includes("Salesman")) ||
                (isAdmin && item.roles.includes("Admin")) ||
                (isSuperAdmin && item.roles.includes("superAdmin")) ||
                (isAdministrator && item.roles.includes("Administrator")) ? (
                  <>
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() => {
                        handleLinkClick(item.path, item.subItems);
                        !item.subItems && setShowMenu(false);
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {item.subItems ? (
                          <>
                            <ListItemText
                              primary={<span>{t(item.title)} </span>}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                            <BiSolidDownArrow />
                          </>
                        ) : (
                          <ListItemText
                            primary={item.title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                    {item.subItems &&
                      selectedItem === item.subItems &&
                      open &&
                      item.subItems?.map((subItem, subIndex) => {
                        return (
                          (props.permissions.includes(subItem.permission) ||
                            subItem.permission.includes("superAdmin")) && (
                            <>
                              <ListItem
                                key={subIndex}
                                disablePadding
                                sx={{ display: "block", marginLeft: "30px" }}
                                onClick={() => {
                                  handleLinkClick(
                                    subItem.path,
                                    subItem.subItems
                                  );
                                  !subItem.subItems && setShowMenu(false);
                                }}
                              >
                                <ListItemButton
                                  sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: 0,
                                      mr: open ? 3 : "auto",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {subItem.icon}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={t(subItem.title)}
                                    sx={{ opacity: open ? 1 : 0 }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </>
                          )
                        );
                      })}
                  </>
                ) : null
              )}
            </List>
            <Divider />
            <DrawerFooter
              sx={{
                display: "flex",
                flexDirection: !open ? "column" : "row", // Change flex direction based on 'open' state
                alignItems: !open ? "flex-start" : "center", // Align items accordingly
              }}
            >
              <IconButton onClick={handleDrawerCloseForLogout}>
                {JSON.parse(localStorage.getItem("username")) && open ? (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: "100px",
                      alignSelf: "flex-end",
                      backgroundColor: "#000",
                    }}
                  >
                    {t("navlogout")}
                  </Button>
                ) : (
                  <BiLogOut />
                )}
              </IconButton>
              <IconButton onClick={() => setOpen(false)}>
                {JSON.parse(localStorage.getItem("username")) && (
                  <SettingsIcon onClick={userPanel} />
                )}
              </IconButton>
            </DrawerFooter>
          </Drawer>
        </Box>
      ) : (
        <LogoutNavBar />
      )}
    </>
  );
}
