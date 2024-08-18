//for SideBar
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, display } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

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
import SettingsIcon from "@mui/icons-material/Settings";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";

//SideBar Data
import { sideBarData } from "./sideBarData";

//For Navigation
import { useNavigate } from "react-router-dom";

//For Icons
import { BiLogOut } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";

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
  const theme = useTheme();
  const navigate = useNavigate();
  console.log("Props in MiniDrawer:", props);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerCloseForLogout = () => {
    setOpen(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  //handle setting button click
  const userPanel = async (req, res, next) => {
    console.log("hello");
    navigate("/rolesTable");
  };
  return (
    <Box>
      <CssBaseline />
      <AppBar position="relative" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              AL-KHAIR JEWELERS
            </Typography>
            <Typography variant="h6" noWrap component="div">
              {props.user}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          position: "relative",
          marginLeft: "1000px",
        }}
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
          {sideBarData?.map((text, index) =>
            (props.data === "admin" &&
              props.permissions.includes(text.permission)) ||
            (props.data === "Administrator" &&
              props.permissions.includes(text.permission)) ? (
              <ListItem
                key={text.title}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate(`${text.path}`);
                  setOpen(false);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Tooltip title={text.title} placement="right">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    primary={text.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              props.data === "user" &&
              props.permissions.includes(text.permission) && (
                <ListItem
                  key={text.title}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    navigate(`${text.path}`);
                    setOpen(false);
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
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )
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
            {props.user && open ? (
              <Button
                component={Link}
                to="/"
                variant="contained"
                size="small"
                sx={{ width: "100px", alignSelf: "flex-end" }}
              >
                Logout
              </Button>
            ) : (
              <BiLogOut />
            )}
          </IconButton>
          {JSON.parse(localStorage.getItem("userRoleName")) ===
            "Administrator" && (
            <IconButton onClick={() => setOpen(false)}>
              {JSON.parse(localStorage.getItem("username")) && (
                <SettingsIcon
                  onClick={() => {
                    navigate("/rolesTable");
                  }}
                />
              )}
            </IconButton>
          )}
        </DrawerFooter>
      </Drawer>
    </Box>
  );
}
