import React, { useContext, useEffect, useState, useTransition } from "react";
import MetaData from "../../../MetaData";
// import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LocationTable from "../LocationTable/LocationTable";
import { refreshTokken } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { tableState } from "../../../Components/tableComponent/tableContext";
import { useTranslation, initReactI18next } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  getProductLocation,
  getProductLocationOnGodownType,
  getProductLocationOnShopType,
} from "../../../actions/productLocationAction";
import "../productLocationCss/productLocation.css";
import { getStorage } from "../../../actions/storageAction";
import { getShop } from "../../../actions/shopAction";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

let isCalled = "false";
const LocationRecord = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { rowCount, setRowCount } = useContext(tableState);
  const [viewProductLocationPermission, setViewProductLocationPermission] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    isCalled = "false";
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [colorTheme, rowCount]);

  useEffect(() => {
    setViewProductLocationPermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Product Location"
      );
      setViewProductLocationPermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    if (isCalled === "false") {
      isCalled = "true";
      dispatch(getProductLocation());
      dispatch(getProductLocationOnShopType());
      dispatch(getProductLocationOnGodownType());
      dispatch(getStorage());
      dispatch(getShop());
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

  return (
    <>
      <MetaData title="QE ~~ProductLocation" />
      <div className={`productLocation ${colorTheme}`}>
        {viewProductLocationPermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3> {t("productLocation")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
            </div>
            <LocationTable />
          </>
        )}
      </div>
    </>
  );
};

export default LocationRecord;
