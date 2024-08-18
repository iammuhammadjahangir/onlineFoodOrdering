import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import MetaData from "../../../MetaData";
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
import { refreshTokken } from "../../../actions/userAction";
import "../godownCss/godown.css";
let isCalled = "false";
const StockUpdate = () => {
  const {
    storageCode,
    setStorageCode,
    storageAddress,
    setStorageAddress,
    storageDescription,
    setStorageDescription,
    storageType,
    setStorageType,
    options,
    storagePhoneNo,
    setStoragePhoneNo,
  } = useCustomState();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storageDetails } = useSelector((state) => state.storageDetails);

  const handleSelectChange = (event, { value }) => {
    setStorageType(value);
  };

  useEffect(() => {
    isCalled = "false";
  }, [
    storageCode,
    storageAddress,
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

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);
  const backPage = () => {
    navigate("/godownrecord");
  };

  useEffect(() => {
    if (storageDetails) {
      setStorageCode(storageDetails?.storageCode);
      setStorageAddress(storageDetails?.storageAddress);
      setStorageDescription(storageDetails?.storageDescription);
      setStorageType(storageDetails?.storageType);
      setStoragePhoneNo(storageDetails?.storagePhoneNo);
    }
  }, [storageDetails]);

  useEffect(() => {
    call();
  }, []);

  async function call() {
    dispatch(getStorageDetails(params.id));
  }

  const UpdateCompanydata = async () => {
    if (!storageDescription || !storageAddress || !storagePhoneNo) {
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
      const response = await updateStorage(
        params.id,
        storageCode,
        storageAddress,
        storageDescription,
        storageType,
        storagePhoneNo
      );
      console.log(response);
      if (response) {
        navigate("/godownrecord");
        return swal.fire({
          icon: "success",
          title: t("titleUpdated"),
          text: t("recordUpdated"),
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
      <MetaData title="QE ~~UpdateGodowns" />
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
              <label>{t("storageType")}</label>
              <input
                type="text"
                placeholder={t("enterStorageAddress")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                disabled
                value={storageType}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form1">
              <label>{t("storageAddress")}</label>
              <input
                type="text"
                placeholder={t("enterStorageAddress")}
                name="productType"
                autoComplete="off"
                maxLength="40"
                required
                value={storageAddress}
                onChange={(e) => setStorageAddress(e.target.value)}
              />
            </div>
            <div className="form1">
              <label>{t("phoneNumber")}</label>
              <input
                type="text"
                placeholder={t("enterPhoneNumber")}
                name="productCode"
                autoComplete="off"
                maxLength="40"
                required
                value={storagePhoneNo}
                onChange={(e) => setStoragePhoneNo(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="dropdownform1">
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
          <div className="godownButtons">
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
              onClick={UpdateCompanydata}
              type="button"
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
    //   <Stack padding={3}>
    //   <Modal.Header></Modal.Header>
    //   <Modal.Content>
    //     <Form className={"company"}>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("storageCode")}
    //           type="string"
    //           placeholder="Enter Godown Code"
    //           name="storageCode"
    //           // maxLength="40"
    //           required
    //           disabled
    //           autoComplete="off"
    //           value={storageCode}
    //           onChange={(e) => setStorageCode(e.target.value)}
    //         />
    //         <Form.Field
    //           control={Select}
    //           label={t("storageType")}
    //           options={options}
    //           placeholder={t("enterStorageCode")}
    //           selection
    //           disabled
    //           value={storageType}
    //           onChange={handleSelectChange}
    //         />
    //       </Form.Group>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("storageAddress")}
    //           type="text"
    //           placeholder={t("enterStorageAddress")}
    //           name="Storage Address"
    //           autoComplete="off"
    //           // maxLength="40"
    //           required
    //           value={storageAddress}
    //           onChange={(e) => setStorageAddress(e.target.value)}
    //         />
    //         <Form.Input
    //           label={t("phoneNumber")}
    //           type="text"
    //           placeholder={t("enterPhoneNumber")}
    //           name="Storage Description"
    //           autoComplete="off"
    //           // maxLength="40"
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
    //           name="godownDescription"
    //           autoComplete="off"
    //           // maxLength="40"
    //           required
    //           value={storageDescription}
    //           onChange={(e) => setStorageDescription(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button
    //         color={"green"}
    //         onClick={UpdateCompanydata}
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
