import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getTempPurchase, getTemporaryPurchaseDetails } from "../../actions/tempPurchaseAction";
import { useTranslation, initReactI18next } from "react-i18next";
import swal from "sweetalert2";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import { useParams, useNavigate } from "react-router-dom";
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
import {
  deleteTempSalePendingsFromTable,
  getTemporarySaleDetails,
  getTemporarySaleOnShop,
  getTemppSale,
} from "../../actions/tempSaleAction";
import Stack from "@mui/material/Stack";
let tempIsCalled = "false";
const SaleTable = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const pendings = "Pendings";
  const action3 = "Delete";
  const { tempSale, tempSaleLoading } = useSelector((state) => state.tempSale);
  const { tempSaleOnShopNo, tempSaleOnShopNoLoading } = useSelector(
    (state) => state.tempSaleOnShopNo
  );

  useEffect(() => {
    if (tempIsCalled === "false") {
      tempIsCalled = "true";
      dispatch(getTemppSale());
      dispatch(
        getTemporarySaleOnShop(JSON.parse(localStorage.getItem("shopId")))
      );
    }
  });

  useEffect(() => {
    console.log(tempSale);
  }, [tempSaleLoading, tempSale]);

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
    //     console.log(id);
    //     if (result.isConfirmed) {
    //       dispatch(getTemporarySaleDetails(id));
    //       navigate("/saleproduct");
    //     }
    //   });
    dispatch(getTemporarySaleDetails(id));
    navigate("/saleproduct");
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
          popup: "custom-swal-popup",
        },
      })
      .then(async (result) => {
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
          console.log(id);
          const res = await deleteTempSalePendingsFromTable(id);
          console.log(res);
          console.log(res.message);
          if (res.message === "tempSale deleted successfully") {
            swal.fire({
              icon: "success",
              title: t("titleDeleted"),
              text: t("textRecordDeleted"),
              showConfirmButton: false,
              customClass: {
                popup: "custom-swal-popup",
              },
            });
            window.location.reload();
          }
        }
      });
  };

  const columns = [
    { field: "customerName", label: t("cusotmerName") },
    { field: "customerNumber", label: t("customerNumber") },
    { field: "shopNo", label: t("shopNo") },
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
      <div className="search-withouInputfields-box"></div>

      <div className="table-container">
        {JSON.parse(localStorage.getItem("isAdministrator")) ? (
          <>
            {!tempSaleLoading ? (
              <div>
                <TableComponentId
                  data={tempSale}
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
            {!tempSaleOnShopNoLoading ? (
              <div>
                <TableComponentId
                  data={tempSaleOnShopNo}
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
    </>
  );
};

export default SaleTable;
