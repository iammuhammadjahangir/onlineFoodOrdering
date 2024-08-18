import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import MetaData from "../../../MetaData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Select, Loader } from "semantic-ui-react";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useTranslation } from "react-i18next";

// import { getPurchaseRecord } from "../Api";
// import { searchPurchaseRecord } from "../Components/searchComponent/purchaseRecordSearch/purchaseRecord";
import { tableState } from "../../../Components/tableComponent/tableContext";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { refreshTokken } from "../../../actions/userAction";
import { getEmployeCommission } from "../../../actions/employeCommissionAction";
import { searchProfitInvoice } from "../../../Components/searchComponent/ProfitInvoiceSearch/profitInvoiceSearch";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

let pr = [];
let isCalledd = "false";
let shopNo = "";
let empName = "";
let result = [];
const PaidDataTable = () => {
  const linkk = "paidEmployePreviewCommission";
  //for Scrolling
  const tableContainerRef = useRef(null);
  const [shop, setShop] = useState();
  const [employeName, setEmployeName] = useState();
  const [ViewCommissionInvoicePermission, setViewCommissionInvoicePermission] =
    useState(false);

  useEffect(() => {
    setViewCommissionInvoicePermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Commission Invoice"
      );
      setViewCommissionInvoicePermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  ///////////////////////////////////////////
  const [data, setData] = useState();
  const { rowCount, setRowCount } = useContext(tableState);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const dispatch = useDispatch();

  useEffect(() => {
    isCalledd = "false";
  });

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    if (isCalledd === "false") {
      isCalledd = "true";
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
    getSalesRecord();
  }, []);
  const getSalesRecord = async () => {
    result = await getEmployeCommission();
    setData(result);
    console.log(result);
    // setLoading(true);
  };

  const sellproduct = (id) => {
    navigate("/Previewpurchase");
  };

  ////////////==================================//////////
  /////////////////  Function for search///////////////////////
  //////////==================================/////////
  const handleSearch = async (shopNo, empName) => {
    console.log(shopNo);
    console.log(empName);
    const dataa = await searchProfitInvoice(result, shopNo, empName);
    // console.warn(dataa);
    setData(dataa);
  };

  const columns = [
    { field: "employeName", label: t("employeName") },
    { field: "totalCommission", label: t("Total Commission") },
    { field: "percentage", label: t("Percentage") },
    { field: "shopNo", label: t("Shop") },
    { field: "createdAt", label: t("date"), format: "date" },
  ];
  const actions = [
    {
      label: "PreviewPaidInvoice",
      color: "green",
      url: (itemId) => `/paidEmployePreviewCommission/${itemId}`,
    },
  ];
  return (
    <>
      <MetaData title="QE ~~CommissionInvoice" />
      <div className={`profit ${colorTheme}`}>
        {ViewCommissionInvoicePermission && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("Paid Invoices")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
            </div>
            <div className="Profit-Invoice-search-box">
              <input
                type="text"
                name="shop"
                placeholder={t("enterShopNo")}
                autoComplete="off"
                value={shop}
                onChange={(e) => {
                  setShop(e.target.value);
                  shopNo = e.target.value;
                  handleSearch(shopNo, empName);
                }}
              />
              <input
                type="text"
                name="employeName"
                placeholder={t("employeName")}
                autoComplete="off"
                onChange={(e) => {
                  empName = e.target.value;
                  handleSearch(shopNo, empName);
                }}
              />
            </div>

            <div className="Purchase-table-container">
              {/* {!loading ? ( */}
              <TableComponentId
                data={data}
                columns={columns}
                linkk={linkk}
                actions={actions}
              />
              {/* ) : (
          <Loader active>Loading</Loader>
        )} */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PaidDataTable;
