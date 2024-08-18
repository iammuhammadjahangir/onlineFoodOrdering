import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../dashboard.css";
import { useNavigate } from "react-router-dom";

const PagesButton = ({ props }) => {
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState();
  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);
  return (
    <div
      className={`page-button-container ${colorTheme}`}
      onClick={() => {
        navigate(`${props.linkNavigation}`);
      }}
    >
      <h4
        className="page-button-title"
        // sx={{ fontSize: "22px", whiteSpace: "nowrap" }}
      >
        {props.linkName}
      </h4>
      <div className="page-button-icon">{props.linkIcon}</div>
    </div>
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     gap: "20px",
    //     border: "1px solid #e2e2e2",
    //     borderRadius: "20px",
    //     padding: "3px 7px",
    //     height:"40px",
    //     cursor: "pointer",
    //     "&:hover": {
    //       backgroundColor: "#f0f0f0", // Change the background color on hover
    //     },
    //   }}
    //   onClick={() => {
    //     navigate(`${props.linkNavigation}`);
    //   }}
    // >
    //   <Typography color="#000" sx={{ fontSize: "22px", whiteSpace: "nowrap" }}>
    //     {props.linkName}
    //   </Typography>
    //   {props.linkIcon}
    // </Box>
  );
};

export default PagesButton;
