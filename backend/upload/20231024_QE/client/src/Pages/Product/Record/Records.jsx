import React, { useContext, useEffect, useState } from "react";
// import { Container, Input, Label, Button } from "semantic-ui-react";
import "../Css/ActualProduct.css";
import MetaData from "../../../MetaData";
import { useParams, useNavigate } from "react-router-dom";
import TableUser from "../TableUser/TableUser";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { tableState } from "../../../Components/tableComponent/tableContext";
import "../../../Styling/AllStyle.css";
import { makeStyles } from "@material-ui/core/styles";

/////**** Material Ui */
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HorizontalMenu from "../../NestedMenu/HorizontalMenu";
/////////////////////////////////////////////////////////////////
import BottomBar from "../../../Components/bottomBar/bottomBar";
import { loadUser, refreshTokken } from "../../../actions/userAction";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";
import TableToExcel from "../../../Components/tableComponent/tableToExcelTable";

let isCalled = "false";
const App = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { rowCount, setRowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [viewProductPermission, setViewProductPermission] = useState(false);
  const [permissionForAddProduct, setPermissionForAddProduct] = useState(false);
  const [downloadXLS, setDownloadXLS] = useState(false);
  const dispatch = useDispatch();
  const { products, productLoading } = useSelector((state) => state.products);
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isCalled);
    if (isCalled === "false") {
      console.log("hfie");
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    const token = await refreshTokken();
    console.log(token);
    console.log("hcih");
    if (token.data === "Please login to acces this resource") {
      console.log("clai");
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  useEffect(() => {
    setViewProductPermission(false);
    setPermissionForAddProduct(false);
    setDownloadXLS(false);
    getPermission();
  }, []);
  useEffect(() => {
    isCalled = "false";

    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
    console.log(isAuthenticated);
  }, [loading, rowCount]);

  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Add Prouct");
      setPermissionForAddProduct(permissionForAdd);
      const permission = await getPermissionForRoles("View Product");
      console.log(permission);
      setViewProductPermission(permission);
      const permissionXLS = await getPermissionForRoles("download Record XLS");
      console.log(permissionXLS);
      setDownloadXLS(permissionXLS);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const column1 = [
    { field: "_id", label: "_id" },
    { field: "productName", label: "productName" },
    { field: "productCode", label: "productCode" },
    { field: "productTypeName._id", label: "productTypeName" },
    { field: "productCompany._id", label: "productCompany" },
    { field: "productpriceExcludingTax", label: "productpriceExcludingTax" },
    { field: "barcodeValue", label: "barcodeValue" },
    { field: "productCurrentPrice", label: "productCurrentPrice" },
    { field: "productExpenses", label: "productExpenses" },
    { field: "productDiscount", label: "productDiscount" },
    { field: "productTaxPrice", label: "productTaxPrice" },
  ];

  const primary = red[500];
  const classes = useStyles();
  return (
    <>
      <MetaData title="QE ~~Products" />
      <div className={`Products ${colorTheme}`}>
        {viewProductPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("products")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
              <div className="excelDiv">
                {products?.length > 0 && downloadXLS && (
                  <>
                    <TableToExcel
                      className="button-styled"
                      data={products}
                      columns={column1}
                    />
                  </>
                )}
                {permissionForAddProduct && (
                  <Button
                    className="button-styled" /* Apply the CSS class to the button */
                    variant="outlined"
                    // color="error"
                    endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                    onClick={() => {
                      navigate("/additem");
                    }}
                  >
                    {t("addItem")}
                  </Button>
                )}
              </div>
            </div>
            <TableUser />
          </>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles({
  records: {
    backgroundColor: "#62cb67",
    fontSize: "13px",
    color: "#ffffff",
    padding: "2px",
    paddingRight: "3px",
  },
});
export default App;
