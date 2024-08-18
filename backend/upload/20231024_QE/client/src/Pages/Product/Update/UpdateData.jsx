import React, { useEffect, useState } from "react";
import MetaData from "../../../MetaData";
import "../Css/ActualProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Dropdown, Form, Select, Modal } from "semantic-ui-react";
import { useCustomState } from "../../../Variables/stateVariables";
import { updateProductt, getProductLocation } from "../../../Api";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getProductDetails,
  updateProduct,
} from "../../../actions/productActions";
import { getProductLocationOnId } from "../../../actions/productLocationAction";
import { getColor } from "../../../actions/colorAction";
import { getCompany } from "../../../actions/companyAction";
import { getProductType } from "../../../actions/productTypeAction";
import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const data = [
  { key: "shop", text: "Shop", value: "shop" },
  { key: "store", text: "Store", value: "store" },
];
let productTypee = [];
// let color = [];
let company = [];
let storage = [];
let product_id = null;
let productLoc_id = "";
const UpdateData = () => {
  const {
    productTypeeName,
    setProductTypeName,
    productCode,
    setProductCode,
    productName,
    setProductName,
    producttCompany,
    setProducttCompany,
    producttColor,
    setProducttColor,
  } = useCustomState();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { color } = useSelector((state) => state.color);
  const { company } = useSelector((state) => state.company);
  const { productType } = useSelector((state) => state.productType);
  let bool = "true";
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const params = useParams();
  const navigate = useNavigate();

  const handleTypeSelectChange = (event, { value }) => {
    setProductTypeName(value);
  };

  const handleColorSelectChange = (event, { value }) => {
    setProducttColor(value);
  };

  const handleCompanySelectChange = (event, { value }) => {
    setProducttCompany(value);
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
    isCalled = "false";
  }, [productCode, productName]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  const backPage = () => {
    navigate("/Record");
  };

  useEffect(() => {
    console.log(params.id);
    callProductDetails();
  }, []);

  async function callProductDetails() {
    // console.warn("called");
    let result = await getProductDetails(params.id);
    console.log(result);
    // let result = await getProductLocationOnId(params.id);
    // console.warn(result._id);
    console.log(result);
    product_id = result?._id;
    setProductTypeName(result?.productTypeName?.productName);
    setProductCode(result?.productCode);
    setProductName(result?.productName);
    setProducttCompany(result?.productCompany?.companyName);
  }

  const Updateproduct = async () => {
    if (!productName || !productCode || !productTypeeName || !producttCompany) {
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
      let colorId;
      let companyId;
      let productTypeId;

      company?.map((comp) => {
        if (comp.companyName === producttCompany) {
          console.log(comp._id);
          companyId = comp._id;
        }
      });

      productType?.map((type) => {
        if (type.productName === productTypeeName) {
          console.log(type._id);
          productTypeId = type._id;
        }
      });

      const response = await updateProduct(
        product_id,
        productTypeId,
        productCode,
        productName,
        companyId
      );
      console.log(response);
      navigate("/record");
    }
  };

  return (
    <>
      <MetaData title="QE ~~UpdateProducts" />
      <div className={`Products ${colorTheme}`}>
        <div className="formInput">
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("productCompany")}</label>
              <Dropdown
                className="dropdown"
                options={company?.map((comp) => ({
                  key: comp.companyName,
                  text: comp.companyName,
                  value: comp.companyName,
                }))}
                placeholder={t("enterProdCompany")}
                selection
                search
                required
                autoComplete="off"
                value={producttCompany}
                onChange={handleCompanySelectChange}
              />
            </div>
            <div className="form1">
              <label>{t("productType")}</label>
              <Dropdown
                className="dropdown"
                options={productType?.map((element) => ({
                  key: element.productName,
                  text: element.productName,
                  value: element.productName,
                }))}
                placeholder={t("enterProdType")}
                selection
                search
                required
                value={productTypeeName}
                onChange={handleTypeSelectChange}
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
              onClick={Updateproduct}
              type="button"
              className={`button button-add-product `}
            >
              {t("updateProduct")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //    <Stack  backgroundColor="#ECECEC">
    //    <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //       <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("updateProduct")}</Typography>
    //     </Stack>

    //     <Stack padding={3}>
    //   <Modal.Content>
    //     <Form className={"product"}>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("productName")}
    //           type="text"
    //           placeholder={t("enterProdName")}
    //           name="productCode"
    //           maxLength="40"
    //           required
    //           value={productName}
    //           onChange={(e) => setProductName(e.target.value)}
    //         />

    //         <Form.Input
    //           label={t("productCode")}
    //           type="text"
    //           placeholder={t("enterProdCode")}
    //           name="productCode"
    //           maxLength="40"
    //           required
    //           value={productCode}
    //           onChange={(e) => setProductCode(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           control={Select}
    //           label={t("productType")}
    //           options={productType?.map((element) => ({
    //             key: element.productName,
    //             text: element.productName,
    //             value: element.productName,
    //           }))}
    //           placeholder={t("enterProdType")}
    //           selection
    //           value={productTypeeName}
    //           onChange={handleTypeSelectChange}
    //         />

    //         <Form.Input
    //           control={Select}
    //           label={t("productCompany")}
    //           options={company?.map((comp) => ({
    //             key: comp.companyName,
    //             text: comp.companyName,
    //             value: comp.companyName,
    //           }))}
    //           placeholder={t("enterProdCompany")}
    //           selection
    //           value={producttCompany}
    //           onChange={handleCompanySelectChange}
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           control={Select}
    //           label={t("productColor")}
    //           options={color?.map((clr) => ({
    //             key: clr.colorName,
    //             text: clr.colorName,
    //             value: clr.colorName,
    //           }))}
    //           placeholder={t("enterProdColor")}
    //           selection
    //           value={producttColor}
    //           onChange={handleColorSelectChange}
    //         />
    //       </Form.Group>

    //       <Button
    //         color={"green"}
    //         onClick={Updateproduct}
    //         style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="right"
    //       >
    //         {t("updateProduct")}&nbsp;&nbsp;<UpdateIcon />
    //       </Button>
    //       <Button
    //         color={"green"}
    //         onClick={backPage}
    //         style={{fontSize: "17px", paddingLeft: "5px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="left"
    //       >
    //          <ArrowBackIcon />&nbsp;{t("back")}
    //       </Button>
    //       <br />
    //       <br />
    //     </Form>
    //   </Modal.Content>
    //   </Stack>
    //   </Stack>
    // </Modal>
  );
};

export default UpdateData;
