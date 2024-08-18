import React from "react";
import { useEffect, useState, useRef } from "react";
import Arrow from "../../../Components/ScrollArrow/arrow";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
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
import Stack from "@mui/material/Stack";
import "../../../table.css";
// import { getStorage, deleteGodown } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useSelector, useDispatch } from "react-redux";
import { getStorage } from "../../../actions/storageAction";
import { deleteShop, getShop } from "../../../actions/shopAction";
import "../shopCss/shop.css";
const ShopTable = (props) => {
  //for Scrolling
  const tableContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  ///////////////////////////////////////////
  const { product, setProduct, loading, setLoading, data, setData } =
    useCustomState();
  const { t } = useTranslation();
  const linkk = "shopUpdate";
  const actionUpdate = "Update";
  const action3 = "Delete";
  const [colorTheme, setColorTheme] = useState("theme-white");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  const deleteShopp = async (id) => {
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
          console.log("called");
          const response = await deleteShop(id);
          console.log(response);

          if (
            response?.data?.error ===
            "Cannot delete the Record as it is referenced by other records"
          ) {
            swal.fire({
              icon: "error",
              title: t("titleError"),
              text: t("textReferenceDeletion"),
              showConfirmButton: true,
              customClass: {
                popup: "custom-swal-popup", // This is the custom class you're adding
              },
            });
          } else {
            console.log(response);
            if (response.message === "Record deleted successfully") {
              swal.fire({
                icon: "success",
                title: t("titleDeleted"),
                text: t("textRecordDeleted"),
                showConfirmButton: false,
                customClass: {
                  popup: "custom-swal-popup", // This is the custom class you're adding
                },
              });
              window.location.reload();
            }
          }
        }
      });

    // deleteColor(id,translationFunctions);
  };

  useEffect(() => {
    call();
  }, []);

  async function call() {
    dispatch(getShop());
  }
  useEffect(() => {
    console.log(shop);
    if (shop.length > 0) {
      console.log(shop);
      setData(shop);
      setProduct(shop);
      setLoading(true);
    }
  }, [shop]);

  const columns = [
    { field: "shopCode", label: t("shopCode") },
    { field: "shopAddress", label: t("shopAddress") },
    { field: "shopDescription", label: t("shopDescription") },
    { field: "shopType", label: t("shopType") },
    { field: "shopPhoneNo", label: t("phoneNumber") },
  ];

  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => deleteShopp(itemId),
    },
    {
      label: "Update",
      color: "green",
      url: (itemId) => `/shopUpdate/${itemId}`,
    },
  ];

  return (
    <>
      <div className={`shop ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>
        <div className="table-container">
          <TableComponentId
            data={data}
            columns={columns}
            actions={actions}
            linkk={linkk}
            actionUpdate={actionUpdate}
            action3={action3}
          />
        </div>
      </div>
    </>
  );
};

export default ShopTable;
