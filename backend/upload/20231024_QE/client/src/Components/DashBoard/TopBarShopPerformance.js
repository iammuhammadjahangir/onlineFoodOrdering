import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./app.css";
import "./dashboard.css";
const TopBarShopPerformance = ({ props }) => {
  return (
    <>
      <div class="custom-container">
        <div class="header">
          <h6>{props.heading}</h6>
        </div>
        <div class="data">
          <h6>{props.data}</h6>
          <div class="icon-container">{props.icon}</div>
        </div>
        <div class="bottom-content">
          <div class="bottom">
            <p>
              <span class="highlight">{props.bottom}</span>{" "}
              <span class="highlightText">{props.bottomText}</span>
            </p>
          </div>
        </div>
      </div>
    </>
    // <Stack
    //   sx={{
    //     height: "100%",
    //     backgroundColor: "white",
    //     padding: "10px",
    //     margin: "10px",
    //     flex: "1",
    //     borderRadius: "20px",
    //   }}
    // >
    //   <Stack sx={{ flex: "1", justifyContent: "center" }}>
    //     <Typography variant="h6" color={"#5A607F"} ml={"15px"}>
    //       {props.heading}
    //     </Typography>
    //   </Stack>
    //   <Stack
    //     sx={{
    //       flex: "2",
    //       marginLeft: "5px",
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Typography
    //       variant="h6"
    //       sx={{
    //         fontSize: "32px",
    //         fontWeight: "bold",
    //         color: "#131523",
    //         marginLeft: "10px",
    //       }}
    //     >
    //       {props.data}
    //     </Typography>
    //     <Box
    //       sx={{
    //         backgroundColor: "#d4ebf2",
    //         borderRadius: "50%",
    //         height: "60px",
    //         width: "60px",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         border: "1px solid #ADD8E6",
    //       }}
    //     >
    //       {props.icon}
    //     </Box>
    //   </Stack>
    //   <Stack sx={{ flex: "1", marginLeft: "15px" }}>
    //     <Typography variant="p" color={"#5A607F"}>
    //       <span
    //         style={{ fontWeight: "Bold", color: "#3dd598", fontSize: "18px" }}
    //       >
    //         {props.bottom}
    //       </span>{" "}
    //       {props.bottomText}
    //     </Typography>
    //   </Stack>
    // </Stack>
  );
};

export default TopBarShopPerformance;
