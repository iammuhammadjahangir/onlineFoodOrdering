import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useCustomState } from "../../../Variables/stateVariables";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useTranslation } from "react-i18next";
import { deleteColor, getColor } from "../../../actions/colorAction";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import { Loader } from "semantic-ui-react";
import "../../../table.css";

import { refreshTokken } from "../../../actions/userAction";
let isCalled = "false";
const TableUserColor = () => {
  //for Scrolling
  const tableContainerRef = useRef(null);
  // const translationFunctions = useTranslationForFunctions();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, color } = useSelector((state) => state.color);
  ///////////////////////////////////////////
  const { colorName, setColorName, setLoading, data, setData } =
    useCustomState();
  const linkk = "updatecolor";
  const actionUpdate = "Update";
  const action3 = "Delete";
  const { t, i18n } = useTranslation();
  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    isCalled = "false";
  }, [isCalled, color]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, [isCalled, color]);
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

  async function call() {
    try {
      dispatch(getColor());
      setLoading(true);
    } catch (err) {}
  }

  const deleteProduct = async (id) => {
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
          const response = await deleteColor(id);
          console.log(response);

          if (
            response?.data?.error ===
            "Cannot delete the color as it is referenced by other records"
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
            if (response.message === "Color deleted successfully") {
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

    // deleteColor(id,translationFunctions);
  };

  const columns = [
    { field: "colorName", label: t("colorName") },
    { field: "colorDescription", label: t("colorDescription") },
  ];

  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => deleteProduct(itemId),
    },
    {
      label: "Update",
      color: "green",
      url: (itemId) => `/updatecolor/${itemId}`,
    },
  ];

  return (
    <>
      <div className={`color ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>

        <div className="table-container">
          {!loading && color !== "No Record Found" ? (
            <TableComponentId
              data={color}
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

export default TableUserColor;
