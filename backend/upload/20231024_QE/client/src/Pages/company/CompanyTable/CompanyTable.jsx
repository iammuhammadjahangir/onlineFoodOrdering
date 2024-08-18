import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import Stack from "@mui/material/Stack";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../../../table.css";
import { deleteCompany, getCompany } from "../../../actions/companyAction";
import { useSelector, useDispatch } from "react-redux";
// import { deleteCompany,useTranslationForFunctions } from "../../../Api";
import { useCustomState } from "../../../Variables/stateVariables";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { refreshTokken } from "../../../actions/userAction";
import "../companyCss/company.css";
let isCalledd = "false";
const CompanyTable = () => {
  //for Scrolling
  const tableContainerRef = useRef(null);
  // const translationFunctions = useTranslationForFunctions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { loading, company } = useSelector((state) => state.company);
  ///////////////////////////////////////////
  // const [companyName, setcompanyName] = useState();
  const { t } = useTranslation();
  const {
    isCalled,
    setIsCalled,
    companyName,
    setcompanyName,
    // loading,
    setLoading,
    data,
    setData,
  } = useCustomState();
  const linkk = "updatecompany";
  const actionUpdate = "Update";
  const action3 = "Delete";

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    console.log(localStorage.getItem("theme-color"));
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.className = currentThemeColor;
    }
  }, [colorTheme]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);
  useEffect(() => {
    isCalledd = "false";
  }, [isCalledd, company]);

  useEffect(() => {
    console.log(isCalledd);
    if (isCalledd === "false") {
      console.log("hfie");
      isCalledd = "true";
      getToken();
    }
  }, [isCalledd, company]);

  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
  };

  useEffect(() => {
    isCalled ? call() : call2();
  }, []);

  const deleteComp = async (id) => {
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
          const response = await deleteCompany(id);
          if (
            response?.data?.error ===
            "Cannot delete the company as it is referenced by other records"
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
            if (response.message === "Company deleted successfully")
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
      });
  };
  async function call2() {
    // console.warn('hii')
  }

  async function call() {
    dispatch(getCompany());
    // let result = await getCompany();
    // setcompanyName(result);
    // setData(result);
    setLoading(true);
  }

  const columns = [
    { field: "companyName", label: t("companyName") },
    { field: "address", label: t("companyAddress") },
  ];

  const actions = [
    {
      label: "Delete",
      color: "yellow",
      handler: (itemId) => deleteComp(itemId),
    },
    {
      label: "Update",
      color: "green",
      url: (itemId) => `/updatecompany/${itemId}`,
    },
  ];
  return (
    <>
      <div className={`company ${colorTheme}`}>
        <div className="search-withouInputfields-box"></div>

        <div className="table-container">
          {!loading && company !== "No Record Found" ? (
            <TableComponentId
              data={company}
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

export default CompanyTable;
