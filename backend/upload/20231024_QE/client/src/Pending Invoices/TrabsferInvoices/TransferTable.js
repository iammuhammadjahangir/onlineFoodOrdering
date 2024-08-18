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
  getTemporaryTransferDetails,
  getTemppTransfer,
} from "../../actions/tempTransferAction";
import { deleteTempTransferPendingsFromTable } from "../../actions/transferAction";
let tempIsCalled = "false";
let selectedShop = [];
let seletedGodown = [];
let newTempTransfer = [];
const TransferTable = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const navigate = useNavigate();
  const pendings = "Pendings";
  const action3 = "Delete";
  const { tempPurchase, tempPurchaseLoading } = useSelector(
    (state) => state.tempPurchase
  );
  const { tempPurchaseDetails } = useSelector(
    (state) => state.tempPurchaseDetails
  );
  const { tempTransfer, loadingTempTransfer } = useSelector(
    (state) => state.tempTransfer
  );
  const shopAsArray = [selectedShop];
  const shopCodes = shopAsArray?.map((shop) => shop);
  const godownCodes = seletedGodown.map((godown) => godown);
  const combinedOptions = [...shopCodes, ...godownCodes];

  useEffect(() => {
    selectedShop = JSON.parse(localStorage.getItem("shopId"));
    seletedGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(seletedGodown);
  });

  useEffect(() => {
    if (tempIsCalled === "false") {
      tempIsCalled = "true";
      dispatch(getTemppTransfer());
      // dispatch(getTemporaryPurchaseOnShop(JSON.parse(localStorage.getItem("shopId"))))
    }
  });

  useEffect(() => {
    console.log(tempTransfer);
    console.log(combinedOptions);
    console.log(combinedOptions.length);
    console.log(tempTransfer.length);
    for (let i = 0; i < combinedOptions?.length; i++) {
      tempTransfer?.map((temp) => {
        if (temp.transferFrom === combinedOptions[i]) {
          newTempTransfer.push(temp);
          console.log(temp.transferFrom);
          console.log(newTempTransfer);
          console.log(combinedOptions[i]);
        }
      });
    }
  }, [tempTransfer]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    console.log(tempTransfer);
  }, [loadingTempTransfer, tempTransfer]);

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
    //       popup: "custom-swal-popup", // This is the custom class you're adding
    //     },
    //   })
    //   .then(async (result) => {
    //     console.log(result.isConfirmed);
    //     if (result.isConfirmed) {
    //       console.log(id);
    //       console.log(result);
    //       dispatch(getTemporaryTransferDetails(id));
    //       navigate("/TransferRecordd");
    //     }
    //   });
    dispatch(getTemporaryTransferDetails(id));
    navigate("/TransferRecordd");
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
          const res = await deleteTempTransferPendingsFromTable(id);
          console.log(res);
          console.log(res.message);
          if (res.message === "tempTransfer deleted successfully") {
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
    { field: "transferFrom", label: t("transferFrom") },
    { field: "transferTo", label: t("transferTo") },
    { field: "transferBy", label: t("transferBy") },
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
          <TableComponentId
            data={newTempTransfer}
            columns={columns}
            actions={actions}
            pendings={pendings}
            action3={action3}
          />
        </div>
      </div>
    </>
  );
};

export default TransferTable;
