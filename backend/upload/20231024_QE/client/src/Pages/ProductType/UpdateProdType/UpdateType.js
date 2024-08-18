import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import MetaData from "../../../MetaData";
// import { getProductTypeDetails, updateProductTypeDetails } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../productTypeCss/productType.css";
import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getProductTypeDetails,
  updateProducType,
} from "../../../actions/productTypeAction";
import { useSelector, useDispatch } from "react-redux";
import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const UpdateType = () => {
  const { t } = useTranslation();
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
  } = useCustomState();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { productTypeDetails } = useSelector(
    (state) => state.productTypeDetails
  );
  const backPage = () => {
    navigate("/recordType");
  };

  useEffect(() => {
    isCalled = "false";
  }, [productName, productDescription]);

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
    call();
  }, []);

  async function call() {
    dispatch(getProductTypeDetails(params.id));
  }

  useEffect(() => {
    if (productTypeDetails) {
      setProductName(productTypeDetails.productName);
      setProductDescription(productTypeDetails.productDescription);
    }
  }, [productTypeDetails]);
  const Updateproduct = async () => {
    if (!productName || !productDescription) {
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
      const response = await updateProducType(
        params.id,
        productName,
        productDescription
      );
      console.log(response);
      if (response) {
        navigate("/recordType");
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
      // updateProductTypeDetails(params.id, productName, productDescription);?
    }
  };

  return (
    <>
      <MetaData title="QE ~~UpdateProductType" />
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
              onClick={Updateproduct}
              type="button"
            >
              {t("updateProductType")}&nbsp;&nbsp;
              <AddIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Modal open dimmer="inverted" size="tiny" closeIcon="close">
    //   <Stack  backgroundColor="#ECECEC">
    //     <Stack spacing={2} direction="row" marginLeft={2} alignItems="center" marginTop={1}>
    //       <Typography variant="h5" gutterBottom style={{ color: "#000000"}}>{t("updateProductType")}</Typography>
    //     </Stack>

    //   <Stack padding={3}>

    //   <Modal.Content>
    //     <Form className={"product"}>
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label={t("productType")}
    //           type="text"
    //           placeholder={t("typeItems")}
    //           name="productName"
    //           maxLength="40"
    //           required
    //           autoComplete="off"
    //           value={productName}
    //           onChange={(e) => setProductName(e.target.value)}
    //         />
    //         <Form.Input
    //           label={t("productTypeDescription")}
    //           type="text"
    //           placeholder={t("productTypeDescription")}
    //           name="productDescription"
    //           required
    //           autoComplete="off"
    //           value={productDescription}
    //           onChange={(e) => setProductDescription(e.target.value)}
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
    //         {t("updateProductType")}&nbsp;&nbsp;<UpdateIcon />
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

export default UpdateType;
