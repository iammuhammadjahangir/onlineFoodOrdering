import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//icons
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import BusinessIcon from "@mui/icons-material/Business";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "./dashboard.css";
import "./app.css";
//inportig buttons
import PagesButton from "./pagesButton/PagesButton";

import { useTranslation } from "react-i18next";

const RecordsBar = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="records-container">
        <div className="contentt-container">
          <div className="page-title">
            <h1> {t("records")}</h1>
          </div>
          <div className="records-subcontainer ">
            <PagesButton
              props={{
                linkName: t("product"),
                linkIcon: <Inventory2Icon />,
                linkNavigation: "/record",
              }}
            />
            {(JSON.parse(localStorage.getItem("isAdministrator")) ||
              JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
              <>
                {/* For Colors DashBoard Link */}
                <PagesButton
                  props={{
                    linkName: t("Color"),
                    linkIcon: <ColorLensIcon />,
                    linkNavigation: "/color",
                  }}
                />

                {/* For Company DashBoard Link */}
                <PagesButton
                  props={{
                    linkName: t("Company"),
                    linkIcon: <BusinessIcon />,
                    linkNavigation: "/company",
                  }}
                />

                {/* For Shop DashBoard Link */}
                <PagesButton
                  props={{
                    linkName: t("dashShop"),
                    linkIcon: <StorefrontIcon />,
                    linkNavigation: "/godownrecord",
                  }}
                />

                {/* For Godowns DashBoard Link */}
                <PagesButton
                  props={{
                    linkName: t("dashDown"),
                    linkIcon: <SwapVertIcon />,
                    linkNavigation: "/godownrecord",
                  }}
                />

                {/* For Product Type DashBoard Link */}

                <PagesButton
                  props={{
                    linkName: t("Product Type"),
                    linkIcon: <Inventory2Icon />,
                    linkNavigation: "/recordType",
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
    // <Stack sx={{ width: "100%" }}>
    //   <Typography
    //     variant="h6"
    //     color="#393939"
    //     ml={"60px"}
    //     sx={{ fontSize: "25px", fontWeight: "bold" }}
    //   >
    //     {t("records")}
    //   </Typography>
    //   <Stack
    //     sx={{
    //       height: "100%",
    //       backgroundColor: "white",
    //       padding: "40px 40px 40px 60px",
    //       flex: "1",
    //       margin: "0 10px",
    //       borderRadius: "70px 0 0 0 ",
    //       flexDirection: "row",
    //       gap: "30px",
    //     }}
    //   >
    //     {/* For Products DashBoard Link */}
    //     <PagesButton
    //       props={{
    //         linkName: t("product"),
    //         linkIcon: <Inventory2Icon />,
    //         linkNavigation: "/record",
    //       }}
    //     />

    //     {(JSON.parse(localStorage.getItem("isAdministrator")) || JSON.parse(localStorage.getItem("isSuperAdmin"))) && (
    //       <>
    //         {/* For Colors DashBoard Link */}
    //         <PagesButton
    //           props={{
    //             linkName: t("Color"),
    //             linkIcon: <ColorLensIcon />,
    //             linkNavigation: "/color",
    //           }}
    //         />

    //         {/* For Company DashBoard Link */}
    //         <PagesButton
    //           props={{
    //             linkName: t("Company"),
    //             linkIcon: <BusinessIcon />,
    //             linkNavigation: "/company",
    //           }}
    //         />

    //         {/* For Shop DashBoard Link */}
    //         <PagesButton
    //           props={{
    //             linkName: t("dashShop"),
    //             linkIcon: <StorefrontIcon />,
    //             linkNavigation: "/godownrecord",
    //           }}
    //         />

    //         {/* For Godowns DashBoard Link */}
    //         <PagesButton
    //           props={{
    //             linkName: t("dashDown"),
    //             linkIcon: <SwapVertIcon />,
    //             linkNavigation: "/godownrecord",
    //           }}
    //         />

    //         {/* For Product Type DashBoard Link */}

    //         <PagesButton
    //           props={{
    //             linkName: t("Product Type"),
    //             linkIcon: <Inventory2Icon />,
    //             linkNavigation: "/recordType",
    //           }}
    //         />
    //       </>
    //     )}
    //   </Stack>
    // </Stack>
  );
};

export default RecordsBar;
