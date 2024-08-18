import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTempPendingsFromTable,
  getTempPurchase,
  getTemporaryPurchaseDetails,
  getTemporaryPurchaseOnShop,
} from "../../actions/tempPurchaseAction";
import { useTranslation, initReactI18next } from "react-i18next";
import swal from "sweetalert2";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import "../../purchaseRecipt/PurchaseCss/purchase.css";
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
let tempIsCalled = "false";
const PurchaseTable = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const pendings = "Pendings";
  const action3 = "Delete";
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { tempPurchase, tempPurchaseLoading } = useSelector(
    (state) => state.tempPurchase
  );
  const { tempPurchaseDetails } = useSelector(
    (state) => state.tempPurchaseDetails
  );
  const { tempPurchaseOnShop, tempPurchaseOnShopLoading } = useSelector(
    (state) => state.tempPurchaseOnShop
  );
  useEffect(() => {
    if (tempIsCalled === "false") {
      tempIsCalled = "true";
      dispatch(getTempPurchase());
      dispatch(
        getTemporaryPurchaseOnShop(JSON.parse(localStorage.getItem("shopId")))
      );
    }
  });

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    console.log(tempPurchase);
  }, [tempPurchaseLoading, tempPurchase]);

  const handlePendings = async (id) => {
    // swal
    //   .fire({
    //     icon: "warning",
    //     title: t("titlePendingMessage"),
    //     text: t("pendingText"),
    //     showCancelButton: true,
    //     confirmButtonText: t("yesButtonText"),
    //     cancelButtonText: t("noButtonText"),
    //     customClass: {
    //       popup: "custom-swal-popup",
    //     },
    //   })
    //   .then(async (result) => {
    //     console.log(result.isConfirmed);
    //     if (result.isConfirmed) {
    //       console.log(id);
    //       console.log(result);
    //       dispatch(getTemporaryPurchaseDetails(id));
    //       console.log(tempPurchaseDetails);
    //       navigate("/PurchaseRecipt");
    //     }
    //   });
    dispatch(getTemporaryPurchaseDetails(id));
    navigate("/PurchaseRecipt");
  };

  const handleDeletePendings = async (id) => {
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
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
          console.log(id);
          const res = await deleteTempPendingsFromTable(id);
          console.log(res);
          console.log(res.message);
          if (res.message === "tempPurchase deleted successfully") {
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
      });
  };
  const columns = [
    { field: "clientName", label: t("clientName") },
    { field: "purchaseCompany", label: t("purchaseCompany") },
    { field: "shopNo", label: t("shopNo") },
    { field: "purchaseDate", label: t("purchaseDate") },
    { field: "purchaseReceiptNumber", label: t("purchaseReceiptNumber") },
  ];

  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => handleDeletePendings(itemId),
    },
    {
      label: "Pendings",
      color: "yellow",
      handler: (itemId) => handlePendings(itemId),
    },
  ];

  return (
    <>
      <div className={`purchase ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>

        <div className="table-container">
          {JSON.parse(localStorage.getItem("isAdministrator")) ? (
            <>
              {!tempPurchaseLoading ? (
                <div>
                  <TableComponentId
                    data={tempPurchase}
                    columns={columns}
                    actions={actions}
                    action3={action3}
                    pendings={pendings}
                  />
                </div>
              ) : (
                <Loader active>Loading</Loader>
              )}
            </>
          ) : (
            <>
              {!tempPurchaseOnShopLoading ? (
                <div>
                  <TableComponentId
                    data={tempPurchaseOnShop}
                    columns={columns}
                    actions={actions}
                    pendings={pendings}
                    action3={action3}
                  />
                </div>
              ) : (
                <Loader active>Loading</Loader>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseTable;
