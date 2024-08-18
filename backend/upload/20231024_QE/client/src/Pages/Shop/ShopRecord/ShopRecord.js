import React, { useContext, useEffect, useState } from "react";
import MetaData from "../../../MetaData";
import { Link } from "react-router-dom";
// import Stocktable from "../../Godown/GodownTable/Stocktable";
import ShopTable from "../ShopTable/ShopTable";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
//import TableUser from "../TableUser/TableUser";
//import FormUser from "../FormUser/FormUser";
import { tableState } from "../../../Components/tableComponent/tableContext";
import BottomBar from "../../../Components/bottomBar/bottomBar";
import TableToExcel from "../../../Components/tableComponent/tableToExcelTable";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { refreshTokken } from "../../../actions/userAction";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import "../shopCss/shop.css";
let isCalled = "false";
const App = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { shop } = useSelector((state) => state.shop);
  const [data, setData] = useState();
  const [viewShopPermission, setViewShopPermission] = useState(false);
  const [addShopPermission, setAddShopPermission] = useState(false);
  const [downloadXLS, setDownloadXLS] = useState(false);
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);
  useEffect(() => {
    setViewShopPermission(false);
    setAddShopPermission(false);
    setDownloadXLS(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Add Shop");
      setAddShopPermission(permissionForAdd);
      const permission = await getPermissionForRoles("View Shop");
      console.log(permission);
      setViewShopPermission(permission);
      const permissionXLS = await getPermissionForRoles("download Record XLS");
      console.log(permissionXLS);
      setDownloadXLS(permissionXLS);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, []);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    console.log(shop);
    if (shop.length > 0) {
      setData(shop);
    }
  }, [shop]);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  const columns = [
    { field: "shopCode", label: t("shopCode") },
    { field: "shopAddress", label: t("shopAddress") },
    { field: "shopDescription", label: t("shopDescription") },
    { field: "shopType", label: t("shopType") },
    { field: "shopPhoneNo", label: t("phoneNumber") },
  ];
  return (
    <>
      <MetaData title="QE ~~Shops" />
      <div className={`shop ${colorTheme}`}>
        {viewShopPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3> {t("shops")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
              <div className="excelDiv">
                {data?.length > 0 && downloadXLS && (
                  <>
                    <TableToExcel
                      className="button-styled"
                      data={data}
                      columns={columns}
                    />
                  </>
                )}
                {addShopPermission && (
                  <Button
                    className="button-styled" /* Apply the CSS class to the button */
                    variant="outlined"
                    color="error"
                    endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                    onClick={() => {
                      navigate("/shopform");
                    }}
                  >
                    {t("add-location")}
                  </Button>
                )}
              </div>
            </div>
            <ShopTable />
          </>
        )}
      </div>
    </>
    //   <div className="div1Container" >
    //   <div style={{width: "70%"}}>
    //   <Stack spacing={2} direction="row" marginTop={10} alignItems="center">
    //   <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>
    //   {t("shops")}
    //   </Typography>
    //   <ButtonGroup>
    //     <Typography  className={`typograpgy2 ${classes.records}` } style={{fontSize: 20, marginTop: "10px", marginBottom: "10px" }}>
    //       {t('totalRecords')}&nbsp;&nbsp;
    //       <EventAvailableIcon fontSize="small" />
    //     </Typography>
    //     <Typography  className="typograpgy3" style={{ backgroundColor: "#ffffff", fontSize: 20, color: "#393939", padding: '2px', paddingRight: "3px", marginTop: "10px", marginBottom: "10px" }}>
    //       {rowCount}
    //     </Typography>
    //   </ButtonGroup>
    //   <Box flexGrow={1} textAlign="right"> {/* Use flexGrow to push the button to the right */}
    //     {(JSON.parse(localStorage.getItem("isAdministrator")) || JSON.parse(localStorage.getItem("isSuperAdmin")))  && (
    //       <Button
    //         variant="outlined" color="error" endIcon={<AddOutlinedIcon fontSize="small" color="error"/>}
    //         onClick={() => {
    //           navigate("/shopform");
    //         }}
    //       >
    //    {t("add-location")}
    //       </Button>
    //     )}
    //   </Box>
    // </Stack>
    // <ShopTable />
    //   </div>

    //   <br />
    // </div>
  );
};

export default App;
