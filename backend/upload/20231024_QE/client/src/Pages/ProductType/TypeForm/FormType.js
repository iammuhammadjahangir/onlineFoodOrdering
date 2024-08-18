import React, { useEffect, useState } from "react";
import MetaData from "../../../MetaData";
import {
  Message,
  Button,
  Dropdown,
  Form,
  Select,
  Modal,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useCustomState } from "../../../Variables/stateVariables";
import "../productTypeCss/productType.css";
import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { postProductType } from "../../../actions/productTypeAction";
import { refreshTokken } from "../../../actions/userAction";
let productMatch = "false";
let productTypes = [];
let isCalled = "false";
const FormType = () => {
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
  } = useCustomState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { productType } = useSelector((state) => state.productType);
  const backPage = () => {
    navigate("/recordType");
  };

  useEffect(() => {
    isCalled = "false";
  }, [productName, productDescription, productType]);

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

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    productMatch = "false";
  });

  const AddRole = async () => {
    productType.map((types) => {
      const productType = types.productName
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      if (
        productType === productName.replace(/\s+/g, " ").trim().toLowerCase()
      ) {
        productMatch = "true";
      }
    });

    if (productMatch === "true") {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: "Company is already Available",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      const response = await postProductType(productName, productDescription);
      console.log(response);
      if (response) {
        navigate("/recordType");
        return swal.fire({
          icon: "success",
          title: t("titleAdded"),
          text: t("successMessage"),
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
    }
  };

  return (
    <>
      <MetaData title="QE ~~AddProductType" />
      <div className={`productType ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>{t("productType")}</label>
              <input
                type="text"
                placeholder={t("typeItems")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("productTypeDescription")}</label>
              <input
                type="text"
                placeholder={t("productTypeDescription")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="productTypeButtons">
            <Button
              color={"green"}
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              className={`button button-add-product `}
              onClick={AddRole}
              type="button"
            >
              {t("add-color")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormType;
