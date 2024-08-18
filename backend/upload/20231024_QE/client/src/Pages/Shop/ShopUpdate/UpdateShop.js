import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../../../MetaData";
import { Button, Form, Select, Modal } from "semantic-ui-react";
// import { getStorageDetails, updateStorage } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import {
  updateStorage,
  getStorageDetails,
} from "../../../actions/storageAction";
import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { useSelector, useDispatch } from "react-redux";
import { getShopDetails, updateShop } from "../../../actions/shopAction";
import "../shopCss/shop.css";
const StockUpdate = () => {
  const [shopCode, setShopCode] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [shopType, setShopType] = useState("shop");
  const [shopPhoneNo, setShopPhoneNo] = useState("");
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shopDetails } = useSelector((state) => state.shopDetails);

  const backPage = () => {
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
    console.log(shopDetails);
    if (shopDetails) {
      setShopCode(shopDetails?.shopCode);
      setShopAddress(shopDetails?.shopAddress);
      setShopDescription(shopDetails?.shopDescription);
      setShopType(shopDetails?.shopType);
      setShopPhoneNo(shopDetails?.shopPhoneNo);
    }
  }, [shopDetails]);

  useEffect(() => {
    call();
  }, []);

  async function call() {
    console.log(params.id);
    dispatch(getShopDetails(params.id));
  }

  const updateShopData = async () => {
    if (!shopDescription || !shopAddress || !shopPhoneNo) {
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
      const response = await updateShop(
        params.id,
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
          title: t("titleUpdated"),
          text: t("recordUpdated"),
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
      <MetaData title="QE ~~UpdateShops" />
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
              onClick={updateShopData}
              type="button"
              className={`button button-add-product `}
            >
              {t("updateLocation")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //   <Stack  backgroundColor="#ECECEC">
    //     <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //       <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("updateLocation")}</Typography>
    //     </Stack>
    //   {/* <Modal.Header>{t("updateColor")}</Modal.Header> */}
    //   <Stack padding={3}>
    //   <Modal.Header></Modal.Header>
    //   <Modal.Content>
    //     <Form className={"company"}>
    //     <Form.Group widths="equal">
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
    //         onClick={updateShopData}
    //         style={{fontSize: "17px", paddingLeft: "10px", paddingRight: "5px", paddingTop: "5px", paddingBottom: "5px" }}
    //         type="button"
    //         className="button"
    //         floated="right"
    //       >
    //         {t("updateLocation")}&nbsp;&nbsp;<UpdateIcon />
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

export default StockUpdate;
