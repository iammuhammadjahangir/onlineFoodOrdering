import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@material-ui/core/Paper";
import "./app.css";
import "./dashboard.css";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import { useTranslation } from "react-i18next";

const SalesBreakDown = ({ props }) => {
  const { t } = useTranslation();
  const [colorTheme, setColorTheme] = useState();
  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);
  console.log(props);
  const backgroundColors = ["#42a5f5", "#ff7043", "#9ccc65", "#ffca28"];
  return (
    <div className={`sales-breakdown-container ${colorTheme}`}>
      <Typography color={"#131523"} ml={"5px"} className="section-title">
        {t("dashSalesBreakDownByProducts")}
      </Typography>

      <Stack sx={{ height: "200px", width: "200px", margin: "0 auto" }}>
        <Chart data={props?.sale}>
          <PieSeries
            valueField="totalSales"
            argumentField="_id"
            innerRadius={0.6}
          />
        </Chart>
      </Stack>

      {props?.sale?.map((data, index) => {
        const backgroundColor =
          backgroundColors[index % backgroundColors?.length];
        return (
          <div className="data-row">
            <div className="abcd">
              <div className="color-box" style={{ backgroundColor }}></div>
              <h1 className="data-label">{data._id}</h1> ({data.totalSales}{" "}
              {t("dashItem")})
            </div>
            <h1 className="data-text-bold">
              {" "}
              Rs.{" "}
              {data.totalAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h1>
          </div>
        );
      })}
    </div>
    // <Stack sx={{ width: "100%", height: "100%", backgroundColor: "white" }}>
    //   <Typography
    //     color={"#131523"}
    //     ml={"5px"}
    //     sx={{ margin: "5px auto", fontSize: "18px", fontWeight: "bold" }}
    //   >
    //     {t("dashSalesBreakDownByProducts")}
    //   </Typography>
    //   <Stack sx={{ height: "200px", width: "200px", margin: "0 auto" }}>
    //     <Chart data={props?.sale}>
    //       <PieSeries
    //         valueField="totalSales"
    //         argumentField="_id"
    //         innerRadius={0.6}
    //       />
    //     </Chart>
    //   </Stack>

    //   {props?.sale?.map((data, index) => {
    //     const backgroundColor =
    //       backgroundColors[index % backgroundColors?.length];
    //     return (
    //       <Stack
    //         sx={{
    //           margin: "3px 90px",
    //           flexDirection: "row",
    //           alignItems: "center",
    //           justifyContent: "space-between",
    //           height: "100%",
    //         }}
    //       >
    //         <Stack
    //           sx={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               height: "10px",
    //               width: "10px",
    //               backgroundColor: backgroundColor,
    //             }}
    //           ></Box>
    //           <Typography
    //             color={"#131523"}
    //             ml={"5px"}
    //             sx={{ fontSize: "14px" }}
    //           >
    //             <span style={{ fontWeight: "bold" }}>{data._id} </span> (
    //             {data.totalSales} {t("dashItem")})
    //           </Typography>
    //         </Stack>
    //         <Typography
    //           color={"#131523"}
    //           ml={"5px"}
    //           sx={{ fontSize: "14px", fontWeight: "bold" }}
    //         >
    //           Rs.
    //           {data.totalAmount
    //             .toString()
    //             .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //         </Typography>
    //       </Stack>
    //     );
    //   })}
    // </Stack>
  );
};

export default SalesBreakDown;
