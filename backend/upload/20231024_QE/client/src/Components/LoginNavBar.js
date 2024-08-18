import React, { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Link from "@mui/material/Link";
import LanguageSwitcher from "../locales/localeDropDownOption/LanguageDropDown";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { Button } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { IoIosArrowDown } from "react-icons/io";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./sidebar.css";
const LoginNavBar = ({ props }) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const drawerWidth = 240;
  const [colorTheme, setColorTheme] = useState("theme-white");
  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  React.useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));

    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  //useEffect
  React.useEffect(() => {
    console.log("hiis");
    if (isSuccess) navigate("/");
    props.setShowMenu(false);
  }, [isSuccess, navigate]);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "props.open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(props.open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <AppBar position="relative" open={props.open}>
      <Toolbar className={`appNavbar ${colorTheme}`}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            color: "white",
            ...(props.open && { display: "none" }),
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
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <CatchingPokemonIcon style={{ marginRight: "20px" }} />{" "}
            {/* {"Qureshi Electronics"} */}
          </Typography>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
            <Stack>
              <Link
                sx={{
                  color: "#5D5E5F",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  transition: "color 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  backgroundColor: "#E0E1E2",
                  padding: "6px 20px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
                onClick={() => props.setShowMenu(!props.showMenu)}
                onMouseOver={(e) => {
                  e.target.style.color = "blue";
                  e.target.style.backgroundColor = "#D5D6D7";
                  //   props.setShowMenu(!props.showMenu);
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#5D5E5F";
                  e.target.style.backgroundColor = "#E0E1E2";
                }}
              >
                WELCOME &nbsp;{JSON.parse(localStorage.getItem("username"))}
                <IoIosArrowDown />
              </Link>
              {props.showMenu && (
                <>
                  <Stack>
                    <List
                      sx={{
                        position: "absolute",
                        right: "70px",
                        background: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "20px",
                        zIndex: "1",
                      }}
                    >
                      <ListItem>
                        <Button
                          aria-readonly
                          variant="text"
                          sx={{
                            fontSize: "1rem",
                            color: "black",
                          }}
                        >
                          {JSON.parse(localStorage.getItem("isAdministrator"))
                            ? `${JSON.parse(localStorage.getItem("status"))}`
                            : `${JSON.parse(localStorage.getItem("status"))}
                  (${JSON.parse(localStorage.getItem("shopId"))})`}
                        </Button>
                      </ListItem>
                    </List>
                  </Stack>
                </>
              )}
            </Stack>
            {/* <Link>
              <LanguageSwitcher />
            </Link> */}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoginNavBar;
