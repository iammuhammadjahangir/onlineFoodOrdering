import React, { useContext, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Table } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Statee } from "./context/stateContext";
import { useTranslation } from "react-i18next";
import "../Styling/AllStyle.css";
import "./SaleReciptCss/sale.css";
import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dropdown,
} from "semantic-ui-react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import Showconfrm from "./showConfirmDialogsubmitBox";
import swal from "sweetalert2";

let quantities = [];
const SellProductPage = () => {
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const {
    price,
    list,
    Quantity,
    PurchaseQuantity,
    handleSubmit,
    setPurchaseQuantity,
    Discount,
    setDiscount,
    showModalconfirm,
    setShowModalconfirm,
    productColor,
    excludeTaxPrice,
    quantityidset,
    barBack,
  } = useContext(Statee);
  const { t } = useTranslation();
  // console.log(quantityidset);

  const navigate = useNavigate();

  const backPage = () => {
    console.log(barBack);
    if (barBack === "true") {
      navigate("/saleproduct");
    } else {
      if (barBack === "false") {
        navigate("/saleproductpage");
      }
    }
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
    quantities = Quantity;

    const max = Quantity;

    // Update the maxQuantity state variable
    setMaxQuantity(max);
  }, []);

  const sellProduct = () => {
    // if (quantity > PurchaseQuantity){

    let quantityAmount;
    list?.map((temp) => {
      if (
        temp?.quantityidset === quantityidset &&
        temp?.productColor === productColor
      ) {
        console.log(temp?.quantityidset);
        console.log(quantityidset);
        quantityAmount = temp?.PurchaseQuantity + PurchaseQuantity;
      }
    });
    if (Discount < 0) {
      if (PurchaseQuantity) {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          text: t("textDiscountGreaterThan0"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      } else {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          text: t("textSelectQuantity"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
    } else if (Discount >= excludeTaxPrice) {
      if (PurchaseQuantity) {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          text: `${t("textLessThanPrice")} ${price}`,
          showConfirmButton: true,
        });
      } else {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          text: t("textSelectQuantity"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
    } else {
      if (PurchaseQuantity < 1 || PurchaseQuantity > maxQuantity) {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          text: `Quantity should be greater than zero && equal to ${maxQuantity}`,
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      } else if (!PurchaseQuantity) {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          text: t("textSelectQuantity"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      } else if (quantityAmount > Quantity) {
        return swal.fire({
          icon: "error",
          title: t("titleOops"),
          html: `${t("textFewItemsAvalibleInList")} <br>${t(
            "textOnly"
          )} ${Quantity} ${t("textAvalibleItems")}`,
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      } else {
        handleSubmit();
        navigate("/saleproduct");
        // setShowModalconfirm(true);
      }
    }

    // navigate("/showconfirmdialogursubmitbox");
  };

  const Sellproductpage = () => {
    navigate("/saleproductpage");
  };
  const checkchange = (data) => {
    // console.log(data);
    setPurchaseQuantity(data);
    // console.log(PurchaseQuantity);
    // console.log(Quantity);
  };

  return (
    <>
      <div className={`sale ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>
                {" "}
                {t("quantity")}{" "}
                <span style={{ color: "red", margin: 0 }}>*</span> (Available
                Item(s)={maxQuantity})
              </label>
              <input
                type="number"
                placeholder={t("saleQuantity")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={PurchaseQuantity}
                onChange={(e) => setPurchaseQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="form1">
              <label>{t("discount")}</label>
              <input
                type="number"
                placeholder={t("enterSaleDiscount")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={Discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className="saleButtons">
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

export default SellProductPage;
