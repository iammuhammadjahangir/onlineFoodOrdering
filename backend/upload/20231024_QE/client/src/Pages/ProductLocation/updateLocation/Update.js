import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Select, Modal } from "semantic-ui-react";
import { useCustomState } from "../../../Variables/stateVariables";
import {
  getProductDetails,
  getcolor,
  getCompany,
  getStorage,
  getProductType,
  updateProductt,
  getProductLocation,
  updateLocationQuantity,
  // updateLocation,
  useTranslationForFunctions,
} from "../../../Api";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import "../../../Styling/AllStyle.css";
import Stack from "@mui/material/Stack";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getProductLocationOnId,
  updateLocation,
} from "../../../actions/productLocationAction";
import { refreshTokken } from "../../../actions/userAction";
let productCompany = "";
let isCalled = "false";
const data = [
  { key: "shop", text: "Shop", value: "shop" },
  { key: "store", text: "Store", value: "store" },
];

let product_id = null;
let productLoc_id = "";
const UpdateLocation = () => {
  // const translationFunctions = useTranslationForFunctions();
  const [productCode, setProductCode] = useState("");
  const [productAvalibility, setProductAvalibility] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  // const { bool } = useParams();
  let bool = "true";
  const { t } = useTranslation();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    isCalled = "false";
  }, [productCode, productAvalibility, productQuantity]);

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
    navigate("/recordLocation");
  };

  useEffect(() => {
    callProductDetails();
  }, []);

  async function callProductDetails() {
    let result = await getProductLocationOnId(params.id);
    product_id = result._id;
    console.log(result);
    setProductAvalibility(result.productAvalibility.storageCode);
    setProductCode(result.product.productCode);
    setProductQuantity(result.productQuantity);
  }

  const Updateproduct = async () => {
    if (!productCode || !productAvalibility || !productQuantity) {
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
      console.log(productCode);
      console.log(productAvalibility);
      console.log(productQuantity);

      updateLocation(product_id, productQuantity);
      navigate("/recordLocation");
    }
  };

  return (
    <Modal open dimmer="inverted" size="tiny" closeIcon="close">
      <Stack backgroundColor="#ECECEC">
        <Stack
          spacing={2}
          direction="row"
          marginLeft={2}
          alignItems="center"
          marginTop={1}
        >
          <Typography variant="h5" gutterBottom style={{ color: "#000000" }}>
            {t("updateProduct")}
          </Typography>
        </Stack>
        {/* <Modal.Header>{t("updateColor")}</Modal.Header> */}
        <Stack padding={3}>
          {/* <Modal.Header></Modal.Header> */}
          <Modal.Content>
            <Form className={"product"}>
              <Form.Group widths="equal">
                <Form.Input
                  label={t("productCode")}
                  type="text"
                  placeholder={t("enterProdCode")}
                  name="productCode"
                  autoComplete="off"
                  maxLength="40"
                  required
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  disabled
                />

                <Form.Input
                  label="Product Availibility"
                  type="text"
                  placeholder="Product Availibility"
                  name="productCode"
                  maxLength="40"
                  autoComplete="off"
                  required
                  value={productAvalibility}
                  onChange={(e) => setProductAvalibility(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Input
                label="Product Quantity"
                type="text"
                placeholder="Product Quantity"
                name="productCode"
                maxLength="40"
                autoComplete="off"
                required
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              <Button
                color={"green"}
                onClick={Updateproduct}
                style={{
                  fontSize: "17px",
                  paddingLeft: "10px",
                  paddingRight: "5px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
                type="button"
                className="button"
                floated="right"
              >
                {t("updateProduct")}&nbsp;&nbsp;
                <UpdateIcon />
              </Button>
              <Button
                color={"green"}
                onClick={backPage}
                style={{
                  fontSize: "17px",
                  paddingLeft: "5px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
                type="button"
                className="button"
                floated="left"
              >
                <ArrowBackIcon />
                &nbsp;{t("back")}
              </Button>
              <br />
              <br />
            </Form>
          </Modal.Content>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default UpdateLocation;
