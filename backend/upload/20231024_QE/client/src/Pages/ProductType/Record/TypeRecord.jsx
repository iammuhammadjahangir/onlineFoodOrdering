import React, { useContext, useEffect, useState } from "react";
import MetaData from "../../../MetaData";
import { Container, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
//import Godowntable from "../GodownTable/Godowntable";
//import TableUser from "../TableUser/TableUser";
//import FormUser from "../FormUser/FormUser";
// import ProdTable from "../TypeTable/ProdTable"
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProdType from "../TypeTable/ProdType";
import { tableState } from "../../../Components/tableComponent/tableContext";
import BottomBar from "../../../Components/bottomBar/bottomBar";
import { useSelector } from "react-redux";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { refreshTokken } from "../../../actions/userAction";
import TableToExcel from "../../../Components/tableComponent/tableToExcelTable";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import "../productTypeCss/productType.css";
let isCalled = "false";
const App = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { productType } = useSelector((state) => state.productType);
  const [viewProductType, setViewProductType] = useState(false);
  const [addProductType, setAddProductType] = useState(false);
  const [downloadXLS, setDownloadXLS] = useState(false);

  useEffect(() => {
    setViewProductType(false);
    setAddProductType(false);
    setDownloadXLS(false);
    getPermission();
  }, []);

  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Add Product Type");
      setAddProductType(permissionForAdd);
      const permission = await getPermissionForRoles("View Product Type");
      console.log(permission);
      setViewProductType(permission);
      const permissionXLS = await getPermissionForRoles("download Record XLS");
      console.log(permissionXLS);
      setDownloadXLS(permissionXLS);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    isCalled = "false";
  }, [productType, rowCount]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  const column1 = [
    { field: "_id", label: "_id" },
    { field: "productName", label: "productName" },
    { field: "productDescription", label: "productDescription" },
  ];
  return (
    <>
      <MetaData title="QE ~~ProductType" />
      <div className={`productType ${colorTheme}`}>
        {viewProductType && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3> {t("productType")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
              <div className="excelDiv">
                {productType?.length > 0 && downloadXLS && (
                  <>
                    <TableToExcel
                      className="button-styled"
                      data={productType}
                      columns={column1}
                    />
                  </>
                )}
                {addProductType && (
                  <Button
                    className="button-styled" /* Apply the CSS class to the button */
                    variant="outlined"
                    color="error"
                    endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                    onClick={() => {
                      navigate("/formType");
                    }}
                  >
                    {t("add-productType")}
                  </Button>
                )}
              </div>
            </div>
            <ProdType />
          </>
        )}
      </div>
    </>
    //   <div className="div1Container" >
    //   <div style={{width: "70%"}}>
    //   <Stack spacing={2} marginTop={10} direction="row" alignItems="center">
    //   <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>
    //   {t("productType")}
    //   </Typography>
    //   <ButtonGroup>
    //     <Typography className="typograpgy2" style={{ backgroundColor: "#62cb67", fontSize: 20, color: "#ffffff", padding: '10px', paddingRight: "3px" }}>
    //       {t('totalRecords')}&nbsp;&nbsp;
    //       <EventAvailableIcon fontSize="small" />
    //     </Typography>
    //     <Typography className="typograpgy3" style={{ backgroundColor: "#ffffff", fontSize: 20, color: "#393939", padding: '10px' }}>
    //       {rowCount}
    //     </Typography>
    //   </ButtonGroup>
    //   <Box flexGrow={1} textAlign="right">
    //     {JSON.parse(localStorage.getItem("isAdministrator")) || JSON.parse(localStorage.getItem("isSuperAdmin")) && (
    //       <Button
    //         variant="outlined" color="error" endIcon={<AddOutlinedIcon fontSize="small" color="error"/>}
    //         onClick={() => {
    //           navigate("/formType");;
    //         }}
    //       >
    //      {t("add-productType")}
    //       </Button>
    //     )}
    //   </Box>
    // </Stack>
    // <ProdType />
    //   </div>

    //   <br />
    // </div>
  );
};

export default App;
