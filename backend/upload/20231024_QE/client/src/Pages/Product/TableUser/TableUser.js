import React from "react";
import { useEffect, useState, useRef } from "react";
import { Dropdown, Form, Table, Select, Button } from "semantic-ui-react";
import swal from "sweetalert2";
// import { Button } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import Arrow from "../../../Components/ScrollArrow/arrow";
import { useCustomState } from "../../../Variables/stateVariables";
import { Loader } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import { getCompany } from "../../../actions/companyAction";
import TableToExcel from "../../../Components/tableComponent/tableToExcelTable";
import { useSelector, useDispatch } from "react-redux";

import "../Css/app.css";
/////////////////////////********** Material UI ****************************///////////////
import { Box, TextField, MenuItem, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { AiOutlineFontColors } from "react-icons/ai";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import WrapTextIcon from "@mui/icons-material/WrapText";
import BusinessIcon from "@mui/icons-material/Business";
///////////////////////////////////
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
//  import { searchData } from "../../../Components/searchComponent/productSearch/search";
import { searchPurchaseData } from "../../../Components/searchComponent/productLocationSearch/locSearch";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import { useTranslation, initReactI18next } from "react-i18next";
import { BsUiRadios } from "react-icons/bs";
import { searchProductData } from "../../../Components/searchComponent/productMainPageSearch/productSearch";
import {
  getProductLocation,
  getProductLocationOnStorageCode,
} from "../../../actions/productLocationAction";
import { getProductType } from "../../../actions/productTypeAction";
import { getStorage } from "../../../actions/storageAction";
import { getColor } from "../../../actions/colorAction";
import { getProductt } from "../../../actions/productActions";
import { refreshTokken } from "../../../actions/userAction";

let userRole = "Salesman";
let selectedShop = [];
let seletedGodown = [];
let code = "";
let type = "";
let companyProduct = "";
let isCalled = "false";
const TableUser = (props) => {
  const componentRef = useRef();
  const navigate = useNavigate();
  //////////////////================================================//////////////////////////////
  /////////////////////////// All useState Variables ////////////////////////////////////////////
  /////////////////=================================================/////////////////////////////
  const [isProductCalled, setIsProductCalled] = useState(true);
  const [isCompanyCalled, setIsCompanyCalled] = useState(true);
  const [productCode, setProductCode] = useState();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [producttCompany, setProducttCompany] = useState();
  const [selectedRadioOption, setSelectedRadioOption] = useState(
    JSON.parse(localStorage.getItem("shopId"))
  );
  const [storeSorting, setStoreSorting] = useState("");
  const [productTypee, setProductTypee] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const linkk = "update";
  const link2 = "generate";
  const actionUpdate = "Update";
  const action1 = "View Barcode";

  //////////////////================================================//////////////////////////////
  /////////////////////////// All Hook Variables ////////////////////////////////////////////
  /////////////////=================================================/////////////////////////////
  //for Scrolling
  const tableContainerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const { color } = useSelector((state) => state.color);
  const { productType } = useSelector((state) => state.productType);
  const { productLocation } = useSelector((state) => state.productLocation);
  const { productLocationOnStorageCode } = useSelector(
    (state) => state.productLocationOnStorageCode
  );
  const { storage } = useSelector((state) => state.storage);
  const { products, productLoading } = useSelector((state) => state.products);

  ////////////==================================//////////
  /////////////////  shop selection ///////////////////////
  //////////==================================/////////
  const shopAsArray = [selectedShop];
  const shopCodes = shopAsArray?.map((shop) => shop);
  const godownCodes = seletedGodown?.map((godown) => godown?.storageCode);
  const combinedOptions = [...shopCodes, ...godownCodes];

  useEffect(() => {
    console.log(combinedOptions);
    if (combinedOptions?.length > 0 && !selectedRadioOption) {
      setSelectedRadioOption(combinedOptions[0]);
      console.log(combinedOptions[0]);
    }
  }, [combinedOptions, selectedRadioOption]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    isCalled = "false";
  }, [data, products, combinedOptions, productCode]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token?.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  ////////////==================================//////////
  /////////////////  All UseEffects ///////////////////////
  //////////==================================/////////
  useEffect(() => {
    callCompany();
  }, []);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    userRole = auth ? JSON.parse(auth).role : "";
    // console.log(userRole);
  }, []);

  useEffect(() => {
    selectedShop = JSON.parse(localStorage.getItem("shopId"));
    seletedGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(seletedGodown);
  });

  useEffect(() => {
    if (products?.length > 0) {
      console.log(products);
      setData(products);
      setLoading(false);
    }
  }, [productLoading, products]);

  ////////////==================================//////////
  /////////////////  Function to get companies ///////////////////////
  //////////==================================/////////
  async function callCompany() {
    dispatch(getProductLocation());
    dispatch(getCompany());
    dispatch(getProductType());
    dispatch(getColor());
    dispatch(getStorage());
    dispatch(getProductt());
    setIsCompanyCalled(false);
  }

  ////////////==================================//////////
  /////////////////  Function for search///////////////////////
  //////////==================================/////////
  const handleSearch = async (code, type, companyProduct) => {
    console.log(code);
    console.log(type);
    console.log(companyProduct);
    const dataa = await searchProductData(products, code, type, companyProduct);
    // console.warn(dataa);
    setData(dataa);
  };

  const columns = [
    { field: "productName", label: t("productName") },
    { field: "productCode", label: t("code") },
    { field: "productTypeName.productName", label: t("type") },
    { field: "productCompany.companyName", label: t("company") },
    { field: "productpriceExcludingTax", label: t("price") },
  ];

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

  const actions = [
    {
      label: "Update",
      color: "yellow",
      handler: null,
      url: (itemId) => `/update/${itemId}`,
    },
    {
      label: "View Barcode",
      color: "green",
      handler: null,
      url: (itemId) => `/generate/${itemId}`,
    },
  ];
  return (
    <>
      <div className={`Products ${colorTheme}`}>
        <div className="Product-search-box">
          <input
            type="text"
            name="productCode"
            placeholder={t("enterProdCode")}
            autoComplete="off"
            value={productCode}
            onChange={(e) => {
              setProductCode(e.target.value);
              code = e.target.value;
              handleSearch(code, type, companyProduct);
            }}
          />
          <input
            type="text"
            name="productType"
            placeholder={t("enterProdType")}
            autoComplete="off"
            onChange={(e) => {
              type = e.target.value;
              handleSearch(code, type, companyProduct);
            }}
          />
          <input
            type="text"
            name="Company"
            placeholder={t("enterProdCompany")}
            autoComplete="off"
            onChange={(e) => {
              companyProduct = e.target.value;
              handleSearch(code, type, companyProduct);
            }}
          />
        </div>

        <div className="Product-table-container">
          {!loading ? (
            <TableComponentId
              data={data}
              columns={columns}
              actions={actions}
              linkk={linkk}
              link2={link2}
              actionUpdate={actionUpdate}
              action1={action1}
            />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
      </div>
    </>
  );
};

export default TableUser;
