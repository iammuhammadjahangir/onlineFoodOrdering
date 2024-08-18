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
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "../shopCss/shop.css";
import { addGodown, useTranslationForFunctions } from "../../../Api";
import { getStoragee } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import { useTranslation } from "react-i18next";

import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { postStorage } from "../../../actions/storageAction";
import { postShop } from "../../../actions/shopAction";

const ShopForm = () => {
  const [shopCode, setShopCode] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopType, setShopType] = useState("shop");
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [shopPhoneNo, setShopPhoneNo] = useState("");
  let { storen } = useCustomState();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storageRes } = useSelector((state) => state.storageRes);
  const { shop } = useSelector((state) => state.shop);

  useEffect(() => {});

  const backPage = async () => {
    navigate("/shopRecord");
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
    if (shop?.length > 0) {
      const sCodes = [];
      shop?.forEach((item) => {
        if (item.shopCode.startsWith("S_")) {
          sCodes.push(item.shopCode);
        }
      });
      const lastSCode = findLastNumericValue(sCodes);
      if (sCodes?.length === 0) {
        const nextSCode = "S_001";
        setShopCode(nextSCode);
      } else {
        const nextSCode = generateNextStorageCode("S_", lastSCode);
        setShopCode(nextSCode);
      }
    }
  }, [shop]);

  const findLastNumericValue = (codes) => {
    let maxNumericValue = 0;
    codes?.forEach((code) => {
      const numericPart = code.substring(2);
      const numericValue = parseInt(numericPart);
      if (numericValue > maxNumericValue) {
        maxNumericValue = numericValue;
      }
    });
    return maxNumericValue;
  };
  const generateNextStorageCode = (prefix, lastNumericValue) => {
    const nextNumericValue = lastNumericValue + 1;
    // console.warn(nextNumericValue);
    const nextNumericPart = nextNumericValue.toString().padStart(3, "0");
    // console.warn(nextNumericPart);
    return prefix + nextNumericPart;
  };

  const AddRecord = async () => {
    if (
      !shopCode ||
      !shopAddress ||
      !shopDescription ||
      !shopType ||
      !shopPhoneNo
    ) {
      return swal.fire({
        icon: "error",
        title: t("titleError"),
        text: t("textAllFieldsAreRequired"),
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      });
    } else {
      const response = await postShop(
        shopCode,
        shopAddress,
        shopDescription,
        shopType,
        shopPhoneNo
      );
      console.log(response);
      if (response) {
        navigate("/shopRecord");
        return swal.fire({
          icon: "success",
          title: t("titleAdded"),
          text: t("successMessage"),
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal-popup", // This is the custom class you're adding
          },
        });
      }
    }
  };
  return (
    <>
      <MetaData title="QE ~~AddShops" />
      <div className={`shop ${colorTheme}`}>
        <div className="formInput">
          <div className="row">
            <div className="form1">
              <label>{t("shopCode")}</label>
              <input
                type="text"
                placeholder={t("enterShopCode")}
                name="shopCode"
                autoComplete="off"
                maxLength="40"
                required
                value={shopCode}
                onChange={(e) => setShopCode(e.target.value)}
                disabled
              />
            </div>
            <div className="form1">
              <label>{t("shopAddress")}</label>
              <input
                type="text"
                placeholder={t("enterShopAddress")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("phoneNumber")}</label>
              <input
                type="text"
                placeholder={t("enterPhoneNumber")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={shopPhoneNo}
                onChange={(e) => setShopPhoneNo(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("shopDescription")}</label>
              <input
                type="text"
                placeholder={t("enterShopDescription")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={shopDescription}
                onChange={(e) => setShopDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="shopButtons">
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
              onClick={AddRecord}
              type="button"
              className={`button button-add-product `}
            >
              {t("add-product")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //    <Stack  backgroundColor="#ECECEC">
    //    <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //          <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("add-shop")}</Typography>
    //        </Stack>

    //   <Stack padding={3}>
    //   <Modal.Content>
    //     <Form>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("shopCode")}
    //           type="text"
    //           placeholder={t("enterShopCode")}
    //           name="storageCode"
    //           autoComplete="off"
    //           maxLength="40"
    //           required
    //           value={shopCode}
    //           onChange={(e) => setShopCode(e.target.value)}
    //           readOnly
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("shopAddress")}
    //           type="text"
    //           placeholder={t("enterShopAddress")}
    //           name="storageAddress"
    //           autoComplete="off"
    //           required
    //           value={shopAddress}
    //           onChange={(e) => setShopAddress(e.target.value)}
    //         />
    //         <Form.Input
    //           label={t("phoneNumber")}
    //           type="text"
    //           placeholder={t("enterPhoneNumber")}
    //           name="storagePhoneNoo"
    //           autoComplete="off"
    //           required
    //           value={shopPhoneNo}
    //           onChange={(e) => setShopPhoneNo(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("shopDescription")}
    //           type="text"
    //           placeholder={t("enterShopDescription")}
    //           name="storageDescription"
    //           autoComplete="off"
    //           required
    //           value={shopDescription}
    //           onChange={(e) => setShopDescription(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button
    //         color={"green"}
    //         onClick={AddRecord}
    //         style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="right"
    //       >
    //         {t("add-Record")}&nbsp;&nbsp;<AddIcon />
    //       </Button>
    //       <Button
    //         color={"green"}
    //         onClick={backPage}
    //         style={{fontSize: "17px", paddingLeft: "5px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="left"
    //       >
    //         <ArrowBackIcon />&nbsp;{t("back")}
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

export default ShopForm;
