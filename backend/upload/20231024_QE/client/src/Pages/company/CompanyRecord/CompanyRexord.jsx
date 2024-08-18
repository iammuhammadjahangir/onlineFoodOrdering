import React, { useContext, useEffect, useState, useTransition } from "react";
import { Container, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../../../MetaData";
import TableUser from "../CompanyTable/CompanyTable";
import ModalUser from "../ModalCompany/ModalCompany";
import { tableState } from "../../../Components/tableComponent/tableContext";
import BottomBar from "../../../Components/bottomBar/bottomBar";
import { useSelector } from "react-redux";
import { Button, TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HorizontalMenu from "../../NestedMenu/HorizontalMenu";
import { refreshTokken } from "../../../actions/userAction";
import TableToExcel from "../../../Components/tableComponent/tableToExcelTable";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import "../companyCss/company.css";
let isCalled = "false";
const CompanyRexord = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { loading, company } = useSelector((state) => state.company);
  const [viewCompanyPermission, setViewCompanyPermission] = useState(false);
  const [addCompanyPermission, setAddCompanyPermission] = useState(false);
  const [downloadXLS, setDownloadXLS] = useState(false);

  useEffect(() => {
    setViewCompanyPermission(false);
    setAddCompanyPermission(false);
    setDownloadXLS(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("Add Company");
      setAddCompanyPermission(permissionForAdd);
      const permission = await getPermissionForRoles("View Company");
      console.log(permission);
      setViewCompanyPermission(permission);
      const permissionXLS = await getPermissionForRoles("download Record XLS");
      console.log(permissionXLS);
      setDownloadXLS(permissionXLS);
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
    isCalled = "false";
  }, [isCalled, company]);

  useEffect(() => {
    console.log(isCalled);
    if (isCalled === "false") {
      console.log("hfie");
      isCalled = "true";
      getToken();
    }
  }, [isCalled, company]);
  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
  };

  useEffect(() => {
    isCalled = "false";
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);

  const column1 = [
    { field: "_id", label: "_id" },
    { field: "companyName", label: "companyName" },
    { field: "address", label: "address" },
  ];
  return (
    <>
      <MetaData title="QE ~~Company" />
      <div className={`company ${colorTheme}`}>
        {viewCompanyPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3> {t("company")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
              <div className="excelDiv">
                {company?.length > 0 && downloadXLS && (
                  <>
                    <TableToExcel
                      className="button-styled"
                      data={company}
                      columns={column1}
                    />
                  </>
                )}
                {addCompanyPermission && (
                  <Button
                    className="button-styled" /* Apply the CSS class to the button */
                    variant="outlined"
                    color="error"
                    endIcon={<AddOutlinedIcon fontSize="small" color="error" />}
                    onClick={() => {
                      navigate("/addcompany");
                    }}
                  >
                    {t("add-company")}
                  </Button>
                )}
              </div>
            </div>
            <TableUser />
          </>
        )}
      </div>
    </>
  );
};

export default CompanyRexord;
