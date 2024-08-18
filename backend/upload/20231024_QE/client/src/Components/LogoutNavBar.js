import React from "react";
import { Box } from "@mui/system";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
//For Navigation
import { useNavigate } from "react-router-dom";

const LogoutNavBar = () => {
  const navigate = useNavigate();
  const drawerWidth = 240;

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            sx={{
              color: "black",
              padding: "10px 20px",
              backgroundColor: "#2e7d32",
              "&:hover": {
                backgroundColor: "#41b044",
              },
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LogoutNavBar;
