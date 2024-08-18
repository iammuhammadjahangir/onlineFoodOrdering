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
import "../godownCss/godown.css";
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
import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const StockForm = () => {
  const [shopp, setShopp] = useState("");
  const [storageType, setStorageType] = useState("store");
  const {
    storageCode,
    setStorageCode,
    storageAddress,
    setStorageAddress,
    storageDescription,
    setStorageDescription,
    options,
    storagePhoneNo,
    setStoragePhoneNo,
  } = useCustomState();
  let { storen } = useCustomState();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { storageRes } = useSelector((state) => state.storageRes);
  const { storage } = useSelector((state) => state.storage);
  const { shop } = useSelector((state) => state.shop);

  useEffect(() => {});

  useEffect(() => {
    isCalled = "false";
  }, [
    storageCode,
    storageAddress,
    shopp,
    storageDescription,
    storageType,
    storagePhoneNo,
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

  const backPage = async () => {
    navigate("/godownrecord");
  };

  const handleSelectShop = (event, { value }) => {
    setShopp(value);
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
    if (storage.length > 0) {
      const gCodes = [];
      storage?.forEach((item) => {
        if (item.storageCode.startsWith("G_")) {
          gCodes.push(item.storageCode);
        }
      });
      const lastGCode = findLastNumericValue(gCodes);
      if (gCodes?.length === 0) {
        const nextGCode = "G_001";
        // console.warn(nextGCode);
        setStorageCode(nextGCode);
      } else {
        const nextGCode = generateNextStorageCode("G_", lastGCode);
        setStorageCode(nextGCode);
      }
    }
  }, storage);

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
      !storageCode ||
      !storageAddress ||
      !shopp ||
      !storageDescription ||
      // !storageType ||
      !storagePhoneNo
    ) {
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
      const response = await postStorage(
        storageCode,
        storageAddress,
        shopp,
        storageDescription,
        storageType,
        storagePhoneNo
      );
      console.log(response);
      if (response) {
        navigate("/godownrecord");
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
      <MetaData title="QE ~~AddGodowns" />
      <div className={`godown ${colorTheme}`}>
        <div className="stockFormInput">
          <div className="row">
            <div className="form1">
              <label>{t("storageCode")}</label>
              <input
                type="text"
                placeholder={t("enterStorageCode")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={storageCode}
                onChange={(e) => setStorageCode(e.target.value)}
                disabled
              />
            </div>
            <div className="form1">
              <label>{t("storageAddress")}</label>
              <input
                type="text"
                placeholder={t("enterStorageAddress")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={storageAddress}
                onChange={(e) => setStorageAddress(e.target.value)}
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
                value={storagePhoneNo}
                onChange={(e) => setStoragePhoneNo(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("storageDescription")}</label>
              <input
                type="text"
                placeholder={t("enterStorageDescription")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={storageDescription}
                onChange={(e) => setStorageDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("shop")}</label>
              <Dropdown
                className="dropdown"
                options={shop?.map((element) => ({
                  key: element.shopCode,
                  text: element.shopCode,
                  value: element._id,
                }))}
                placeholder={t("enterShop")}
                selection
                search
                required
                autoComplete="off"
                value={shopp}
                onChange={handleSelectShop}
              />
            </div>
          </div>
          <div className="godownButtons">
            <Button
              onClick={backPage}
              className="button button-back"
              type="button"
            >
              <ArrowBackIcon />
              &nbsp; &nbsp;&nbsp;{t("back")}
            </Button>
            <Button
              color={"green"}
              onClick={AddRecord}
              type="button"
              className={`button button-add-product `}
            >
              {t("add-Record")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //    <Stack  backgroundColor="#ECECEC">
    //    <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //          <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("add-location")}</Typography>
    //        </Stack>

    //   <Stack padding={3}>
    //   <Modal.Content>
    //     <Form>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("storageCode")}
    //           type="text"
    //           placeholder={t("enterStorageCode")}
    //           name="storageCode"
    //           autoComplete="off"
    //           maxLength="40"
    //           required
    //           value={storageCode}
    //           onChange={(e) => setStorageCode(e.target.value)}
    //           readOnly
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("storageAddress")}
    //           type="text"
    //           placeholder={t("enterStorageAddress")}
    //           name="storageAddress"
    //           autoComplete="off"
    //           required
    //           value={storageAddress}
    //           onChange={(e) => setStorageAddress(e.target.value)}
    //         />
    //         <Form.Input
    //           label={t("phoneNumber")}
    //           type="text"
    //           placeholder={t("enterPhoneNumber")}
    //           name="storagePhoneNoo"
    //           autoComplete="off"
    //           required
    //           value={storagePhoneNo}
    //           onChange={(e) => setStoragePhoneNo(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("storageDescription")}
    //           type="text"
    //           placeholder={t("enterStorageDescription")}
    //           name="storageDescription"
    //           autoComplete="off"
    //           required
    //           value={storageDescription}
    //           onChange={(e) => setStorageDescription(e.target.value)}
    //         />
    //         <Form.Field
    //                   control={Select}
    //                   label={t("shop")}
    //                   options={shop?.map((element) => ({
    //                     key: element.shopCode,
    //                     text: element.shopCode,
    //                     value: element._id,
    //                   }))}
    //                   placeholder={t("enterShop")}
    //                   selection
    //                   search
    //                   required
    //                   value={shopp}
    //                   onChange={handleSelectShop}
    //                 />
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

export default StockForm;
