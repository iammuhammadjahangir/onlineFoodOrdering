import React, { useContext, useEffect, useState } from "react";
import MetaData from "../../MetaData";
import { Container, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import SaleTable from "./SaleTable";
import { tableState } from "../../Components/tableComponent/tableContext";
import "../../purchaseRecipt/PurchaseCss/purchase.css";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getPermissionForRoles } from "../../Pages/user/rolesAssigned/RolesPermissionValidation";

import { refreshTokken } from "../../actions/userAction";

let isCalled = "false";
const RecordTempSale = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);
  const [pendingSalePermission, setPendingSalePermission] = useState(false);
  const [colorTheme, setColorTheme] = useState("theme-white");

  useEffect(() => {
    setPendingSalePermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("View Pending Sale");
      setPendingSalePermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme]);

  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      getToken();
    }
  }, []);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    isCalled = "false";
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);
  return (
    <>
      <MetaData title="QE ~~SalePendings" />
      <div className={`purchase ${colorTheme}`}>
        {pendingSalePermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3> {t("salePendings")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
            </div>
            <SaleTable />
          </>
        )}
      </div>
    </>
  );
};

export default RecordTempSale;
