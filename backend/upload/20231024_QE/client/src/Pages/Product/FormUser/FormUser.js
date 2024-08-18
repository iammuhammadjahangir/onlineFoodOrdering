import React, { useEffect, useState } from "react";
import MetaData from "../../../MetaData";
import {
  Message,
  Button,
  Dropdown,
  Form,
  Select,
  Modal,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import { useTranslation, initReactI18next } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BarcodeScanner } from "react-barcode";
import swal from "sweetalert2";
import "../../../table.css";
import "../Css/ActualProduct.css";
import "../../../Styling/AllStyle.css";
import { useCustomState } from "../../../Variables/stateVariables";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { postProduct } from "../../../actions/productActions";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { searchProductData } from "../../../Components/searchComponent/productMainPageSearch/productSearch";
let storage = [];
let color = [];
let company = [];
let productTypee = [];
const FormUser = () => {
  // const translationFunctions = useTranslationForFunctions();
  const {
    isCalled,
    setIsCalled,
    buttonClicked,
    setButtonClicked,
    producttName,
    setProducttName,
    productCode,
    setProductCode,
    productName,
    setProductName,
    productQuantity,
    setProductQuantity,
    formClassName,
    setformClassName,
    productStorage,
    setProductStorage,
    prodCompany,
    setProdCompany,
    prodColor,
    setProdColor,
  } = useCustomState();
  let {
    productLoc,
    productss,
    quantity,
    barcode,
    id,
    productBarcode,
    productAvalibility,
    product_idd,
    product_id,
    hasCompanyError,
    hasColorError,
    hasStorageError,
    productlocate,
    hasErrorProduct,
    productMatch,
    productColor,
    prodType,
  } = useCustomState();
  const { t, i18n } = useTranslation();
  const { color } = useSelector((state) => state.color);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { company } = useSelector((state) => state.company);
  const { productType } = useSelector((state) => state.productType);
  const { products, productLoading } = useSelector((state) => state.products);
  const [productCompany, setProductCompany] = useState()
  const [producttType, setProducttType]= useState()
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const backPage = () => {
    navigate("/Record");
  };

  const handleSelectChange = (event, { value }) => {
    setProductStorage(value);
  };

  const handleTypeSelectChange = (event, { value, options }) => {
    const selectedOptions = options.find((opt)=> opt.value === value)
    setButtonClicked(false);
    setProducttName(value);
    setProducttType(selectedOptions.text)
    handleSearch(productCode, selectedOptions.text, productCompany)
  };

  const handleCompanySelectChange = (event, { value, options  }) => {
    const selectedOption = options.find((opt) => opt.value === value);
    console.log(value)
    console.log(selectedOption.text)
    setButtonClicked(false);
    setProdCompany(value);
    setProductCompany(selectedOption.text)
    handleSearch(productCode, producttType, selectedOption.text)
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    setProductQuantity(0);
    productMatch = "false";
    productlocate = "false";
  }, []);

  const AddProduct = async () => {
    if (!producttName || !productCode || !productName || !prodCompany) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textAllFieldsAreRequired"),
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      setButtonClicked(true);
      if (products?.length > 0) {
        products?.forEach((prod) => {
          const trimmedProductCode = prod.productCode
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
          const trimmedProductName = prod.productName
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
          // const trimmedProdColor = (prod.productColor?.colorName || '').replace(/\s+/g, ' ').trim().toLowerCase();
          const trimmedProductTypeName = prod.productTypeName._id;
          const trimmedProdCompany = prod.productCompany._id;
          if (
            trimmedProductCode ===
              productCode.replace(/\s+/g, " ").trim().toLowerCase() &&
            trimmedProductName ===
              productName.replace(/\s+/g, " ").trim().toLowerCase() &&
            // (trimmedProdColor === prodColor.replace(/\s+/g, ' ').trim().toLowerCase() || !trimmedProdColor) &&
            trimmedProductTypeName === producttName &&
            trimmedProdCompany === prodCompany
          ) {
            productMatch = "true";
          }
        });
      }
      if (productMatch === "true") {
        return swal.fire({
          icon: "error",
          title: t("titleError"),
          text: t("dataIsAlreadyAvailable"),
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      } else {
        const barcodeValue = Math.floor(
          Math.random() * 1000000000000
        ).toString();
        const result = await postProduct(
          producttName,
          productCode,
          productName,
          prodCompany,
          prodColor,
          barcodeValue
        );
        console.log(result);
        if (result.statusText === "OK") {
          navigate("/Record");
          return swal.fire({
            icon: "success",
            title: t("titleAdded"),
            text: t("successMessage"),
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: "custom-swal-popup", // This is the custom class you're adding
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    if (products?.length > 0) {
      console.log(products);
      setData(products);
      setLoading(false);
    }
  }, [productLoading, products]);

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
    // { field: "productColor.colorName", label: t("color") },
    // { field: "productpriceExcludingTax", label: t("price") },
    // { field: "productQuantity", label: t("quantity") },
    // { field: "productAvalibility.storageCode", label: t("storageCode") },
  ];
  return (
    <>
      <MetaData title="QE ~~AddProducts" />
      <div className={`Products ${colorTheme}`}>
      
        <div className="formInput">
        <div className="Product-form-table-container">
          {!loading ? (
            <TableComponentId
              data={data}
              columns={columns}
            />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
          <div className="row">
            <div className="form1">
              <label>{t("productCompany")}</label>
              <Dropdown
                className="dropdown"
                options={
                  company &&
                  company?.map((comp) => ({
                    key: comp.companyName,
                    text: comp.companyName,
                    value: comp._id,
                  }))
                }
                placeholder={t("enterProdCompany")}
                selection
                search
                required
                autoComplete="off"
                value={prodCompany}
                onChange={handleCompanySelectChange}
              />
            </div>
            <div className="form1">
              <label>{t("productType")}</label>
              <Dropdown
                className="dropdown"
                options={
                  productType &&
                  productType?.map((element) => ({
                    key: element.productName,
                    text: element.productName,
                    value: element._id,
                  }))
                }
                placeholder={t("enterProdType")}
                selection
                search
                required
                value={producttName}
                onChange={handleTypeSelectChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("productName")}</label>
              <input
                label={t("productName")}
                type="text"
                placeholder={t("enterProdName")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={productName ? productName : ""}
                onChange={(e) => {
                  setButtonClicked(false);
                  setProductName(e.target.value);
                }}
              />
            </div>
            <div className="form1">
              <label>{t("productCode")}</label>
              <input
                label={t("productCode")}
                type="text"
                placeholder={t("enterProdCode")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={productCode ? productCode : ""}
                onChange={(e) => {
                  setButtonClicked(false);
                  setProductCode(e.target.value);
                  handleSearch(e.target.value, producttType, productCompany)
               
                }}
              />
            </div>
          </div>
          <div className="productButtons">
            <Button
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              color={buttonClicked ? "green" : "white"}
              onClick={AddProduct}
              type="button"
              className={`button button-add-product ${
                buttonClicked ? "clicked" : "Notclicked"
              }`}
              disabled={buttonClicked}
            >
              {t("add-product")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUser;
