import React, { useContext, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Table } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { State } from "./context/stateContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dropdown,
} from "semantic-ui-react";
import "../Styling/AllStyle.css";
import "./PurchaseCss/purchase.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import Showconfrm from "./showConfirmDialogsubmitBox";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { refreshTokken } from "../actions/userAction";
let quantities = [];
let isCalled = "false";
const DiscountModel = () => {
  const [maxQuantity, setMaxQuantity] = useState(0);
  const { t } = useTranslation();
  const {
    Quantity,
    setQuantitye,
    PurchaseQuantity,
    setPurchaseQuantity,
    Discount,
    setDiscount,
    showModalconfirm,
    setShowModalconfirm,
    setColor,
    purchasePrice,
    setPurchasePrice,
    purchaseDiscount,
    setPurchaseDiscount,
    purchaseExpenses,
    setPurchaseExpenses,
    purchaseTaxPercentage,
    setPurchaseTaxPercentage,
    productColor,
    setProductColor,
    setFetchingListData,
    handleSubmit,
  } = useContext(State);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { color } = useSelector((state) => state.color);
  // console.log(quantityidset);

  const navigate = useNavigate();

  useEffect(() => {
    isCalled = "false";
  }, [
    PurchaseQuantity,
    purchaseDiscount,
    productColor,
    purchasePrice,
    purchaseTaxPercentage,
  ]);

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
    setPurchaseQuantity("");
    setDiscount("");
    setColor("");
    setProductColor("");

    setPurchaseDiscount("");
    setPurchaseExpenses(0);
    setPurchaseTaxPercentage("");
    quantities = Quantity;
    const max = Quantity;
    // Update the maxQuantity state variable
    setMaxQuantity(max);
  }, []);

  const handleColorSelectChange = (event, { value, text }) => {
    const selectedOption = color.find((clr) => clr._id === value);
    if (selectedOption) {
      const selectedText = selectedOption.colorName;
      console.log(selectedText); // Log the selected colorName (text)
      console.log(value); // Log the value (_id)
      setColor(selectedText);
      setProductColor(value);
    }
  };

  const sellProduct = () => {
    console.log(purchaseExpenses);
    if (
      !PurchaseQuantity ||
      !purchaseDiscount ||
      !productColor ||
      !purchasePrice ||
      !purchaseTaxPercentage
    ) {
      return swal.fire({
        icon: "error",
        title: t("titleOops"),
        text: t("textAllFieldsAreRequired"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else if (purchaseTaxPercentage < 0) {
      return swal.fire({
        icon: "error",
        title: t("titleOops"),
        text: t("textTaxShouldbegreaterThanOrEqualToZero"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else if (PurchaseQuantity < 1) {
      return swal.fire({
        icon: "error",
        title: t("titleOops"),
        text: t("textPurchaseQuantityShouldBeGreaterThanZero"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      //   setFetchingListData(true);
      // setItemsAdded(true);
      handleSubmit();
      // setShowModalconfirm(false);
      navigate("/PurchaseRecipt");
      // console.log("hi");
      // setShowModalconfirm(true);
      // console.log("hiii");
    }
  };

  return (
    <>
      <div className={`purchase ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>{t("quantity")}</label>
              <input
                label={t("quantityPurchase")}
                type="text"
                placeholder={t("enterProdName")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={PurchaseQuantity}
                onChange={(e) => setPurchaseQuantity(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("price")}</label>
              <input
                label={t("productCode")}
                type="text"
                placeholder={t("enterPrice")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("discount")}</label>
              <input
                type="text"
                placeholder={t("enterDiscount")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={purchaseDiscount}
                onChange={(e) => setPurchaseDiscount(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("taxPercentage")}</label>
              <input
                type="text"
                placeholder={t("enterTaxPercentage")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={purchaseTaxPercentage}
                onChange={(e) => setPurchaseTaxPercentage(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("productColor")}</label>
              <Dropdown
                className="dropdown"
                options={color?.map((clr) => ({
                  key: clr.colorName,
                  text: clr.colorName,
                  value: clr._id,
                }))}
                placeholder={t("enterProdColor")}
                selection
                search
                required
                autoComplete="off"
                value={productColor}
                onChange={handleColorSelectChange}
              />
            </div>
          </div>
          <div className="purchaseButtons">
            <Button
              color={"green"}
              onClick={() => {
                navigate("/purchaseProductPage");
              }}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              onClick={() => {
                sellProduct();
              }}
              type="button"
              className={`button button-add-product `}
            >
              {t("add-product")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
            {/* {showModalconfirm && <Showconfrm />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountModel;
