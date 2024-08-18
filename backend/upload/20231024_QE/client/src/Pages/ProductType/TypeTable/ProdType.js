import React from "react";
import { useEffect, useState, useRef } from "react";
import Arrow from "../../../Components/ScrollArrow/arrow";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import {
  Button,
  Form,
  Select,
  Modal,
  Message,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert2";
import "../../../table.css";
import { useNavigate } from "react-router-dom";
// import { deleteProductType, getProductType,useTranslationForFunctions } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import {
  deleteProductType,
  getProductType,
} from "../../../actions/productTypeAction";
import "../productTypeCss/productType.css";
import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const ProdType = (props) => {
  // const translationFunctions = useTranslationForFunctions();
  //for Scrolling
  const tableContainerRef = useRef(null);
  const navigate = useNavigate();
  ///////////////////////////////////////////
  const { data, setData, loading, setLoading } = useCustomState();
  const linkk = "Updatetype";
  const actionUpdate = "Update";
  const action3 = "Delete";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { productType } = useSelector((state) => state.productType);
  useEffect(() => {
    call();
  }, []);

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
  }, [productType]);

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

  async function call() {
    dispatch(getProductType());
    // let resp = await getProductType();
    // console.warn(resp);
  }
  const deleletType = async (id) => {
    swal
      .fire({
        icon: "warning",
        title: t("titleMessage"),
        text: t("textRevertWarning"),
        showCancelButton: true,
        confirmButtonText: t("confirmButtonText"),
        cancelButtonText: t("cancelButtonText"),
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
      })
      .then(async (result) => {
        if (result.value) {
          const response = await deleteProductType(id);
          console.log(response);
          if (
            response?.data?.error ===
            "Cannot delete the Product Type as it is referenced by other records"
          ) {
            swal.fire({
              icon: "error",
              title: t("titleError"),
              text: t("textReferenceDeletion"),
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                popup: "custom-swal-popup", // This is the custom class you're adding
              },
            });
          } else {
            if (response.message === "Product Type deleted successfully") {
              swal.fire({
                icon: "success",
                title: t("titleDeleted"),
                text: t("textRecordDeleted"),
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  popup: "custom-swal-popup", // This is the custom class you're adding
                },
              });
              window.location.reload();
            }
          }
        }
      });
  };
  useEffect(() => {
    if (productType?.length > 0) {
      setData(productType);
      setLoading(true);
    }
  }, [productType]);

  const columns = [
    { field: "productName", label: t("productType") },
    { field: "productDescription", label: t("productTypeDescription") },
  ];

  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => deleletType(itemId),
    },
    {
      label: "Update",
      color: "green",
      url: (itemId) => `/Updatetype/${itemId}`,
    },
  ];

  return (
    <>
      <div className={`productType ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>

        <div className="table-container">
          {loading && data !== "No Record Found" ? (
            <TableComponentId
              data={data}
              columns={columns}
              actions={actions}
              linkk={linkk}
              actionUpdate={actionUpdate}
              action3={action3}
            />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
      </div>
    </>
  );
};

export default ProdType;
