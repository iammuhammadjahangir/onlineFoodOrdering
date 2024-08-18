import React from "react";
import MetaData from "../../../MetaData";
import { useEffect, useState, useContext, useRef } from "react";
import Arrow from "../../../Components/ScrollArrow/arrow";
import BottomBar from "../../../Components/bottomBar/bottomBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { getStorage } from "../../../Api";
import { Container, Dropdown, Input, Table } from "semantic-ui-react";
import { baseQuery } from "../../../app/api/apiSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TableComponentId from "../../../Components/tableComponent/tableComponentId";
import { useTranslation } from "react-i18next";
import { tableState } from "../../../Components/tableComponent/tableContext";
import { getPermissionForRoles } from "../../user/rolesAssigned/RolesPermissionValidation";

import swal from "sweetalert2";
import "../expenseCss/expense.css";
// import "../salesRecipt/salerecipt.css";
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
import { Statee } from "../context/stateContext";

import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useCustomState } from "../../../Variables/stateVariables";
import { getExpenseRecord } from "../../../actions/expenseAction";
import { refreshTokken } from "../../../actions/userAction";

let pr = [];
let isCalledd = "false";
const ExpenseInvoice = () => {
  //for Scrolling
  const tableContainerRef = useRef(null);

  ///////////////////////////////////////////
  const {
    data,
    setData,
    selectedDate,
    setSelectedDate,
    selectEndDate,
    setSelectEndDate,
    SalesRecord,
    setSalesRecord,
    InvoiceNumber,
    setInvoiceNumber,
    loading,
    setLoading,
    custName,
    setcustName,
    filteredProducts,
    setFilteredProducts,
  } = useCustomState();
  const { rowCount, seRowCount } = useContext(tableState);
  const [reportType, setReportType] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const { expenseLocation, setExpenseLocation, saledId, setSalesId } =
    useContext(Statee);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const [canViewExpenseInvoice, setCanViewExpenseInvoice] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { shop } = useSelector((state) => state.shop);
  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);
  let categoryOptions = [
    { key: "1", text: "Monthly", value: "Monthly" },
    { key: "2", text: "Daily", value: "Daily" },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setCanViewExpenseInvoice(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Expense Invoice"
      );
      setCanViewExpenseInvoice(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    isCalledd = "false";
  });
  useEffect(() => {
    if (isCalledd === "false") {
      isCalledd = "true";
      getToken();
    }
  }, []);

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  const getToken = async () => {
    const token = await refreshTokken();
    if (token.data === "Please login to acces this resource") {
      navigate("/login");
    }
    console.log(token);
  };

  useEffect(() => {
    getExpenseRecordd();
    // callStorage();

    // filterData();
  }, []);

  const handleSelectChange = (event, { value }) => {
    setExpenseLocation(value);
  };

  const handleCategoryChange = (event, { value }) => {
    setReportType(value);
  };

  const handleDateSelectChange = (date) => {
    setSelectedDate(date);
  };
  const handleSelectEndDateChange = (date) => {
    setSelectEndDate(date);
  };

  // async function callStorage() {
  //   storage = await getStorage();
  //   // console.warn(storage);
  // }

  const sellproduct = (id) => {
    setSalesId(id);
    navigate("/expensePreview");
  };

  const getExpenseRecordd = async () => {
    pr = await getExpenseRecord();
    console.log(pr);
    if (pr) {
      //to filter product for each storage location that a user login with account
      if (
        JSON.parse(localStorage.getItem("isAdministrator")) ||
        JSON.parse(localStorage.getItem("isSuperAdmin"))
      ) {
        setData(pr);
        setSalesRecord(pr);
        setFilteredProducts(pr.reverse());
        setLoading(true);
      } else {
        pr = pr?.reduce((filteredProducts, product) => {
          if (
            product.expenseLocation.shopCode ===
            JSON.parse(localStorage.getItem("shopId"))
          ) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        }, []);
        // console.log(pr);
        setData(pr);
        // console.warn(pr.expenses);
        setSalesRecord(pr);
        setFilteredProducts(pr.reverse());
        setLoading(true);
      }
    } else {
      pr = [];
    }
  };

  //Search
  const filterData = () => {
    let Filtered = data?.filter((data) => {
      //for category
      if (
        reportType &&
        !data.expenseCategory
          .toString()
          .toLowerCase()
          .includes(reportType.toString().toLowerCase())
      ) {
        return false;
      }

      //for Expense Location
      if (
        expenseLocation &&
        !data.expenseLocation.shopCode
          .toString()
          .toLowerCase()
          .includes(expenseLocation.toString().toLowerCase())
      ) {
        return false;
      }

      // // Filter by starting date
      if (selectedDate) {
        const saleDate = new Date(data.createdAt);
        if (saleDate < selectedDate) {
          return false;
        }
      }

      // Filter by ending date
      if (selectEndDate) {
        const saleDate = new Date(data.createdAt);
        if (saleDate > selectEndDate) {
          return false;
        }
      }
      return true;
    });
    // console.log(Filtered);
    pr = Filtered;
    setData(Filtered);
  };

  const columns = [
    // { field: "id", label: "Invoice Number" },
    { field: "invoiceNumber", label: t("invoiceNumber") },
    { field: "expenseCategory", label: t("expenseCategory") },
    { field: "expenseLocation.shopCode", label: t("location") },
    { field: "createdAt", label: t("date"), format: "date" },
    { field: "createdAt", label: t("time"), format: "time" },
    // {field: `${new Date(createdAt).toLocaleDateString()}`, label: 'Sale Date'},
  ];
  const actions = [
    {
      label: "InvoicePreview",
      color: "green",
      handler: (itemId) => sellproduct(itemId),
      url: null,
    },
  ];
  return (
    <>
      <MetaData title="QE ~~ExpenseInvoice" />
      <div className={`expense ${colorTheme}`}>
        {canViewExpenseInvoice && (
          <>
            <div className="contentt-box">
              <div className="heading-container">
                <h3>{t("expenseInvoices")}</h3>
                <h5>
                  <span className="total-records">
                    {t("totalRecords")}&nbsp;&nbsp;
                    <EventAvailableIcon fontSize="small" />
                  </span>
                  <span className="rowCount">{rowCount}</span>
                </h5>
              </div>
            </div>
            <div className="search-Purchase-box">
              <Dropdown
                control={Select}
                placeholder={t("expenseCategory")}
                className="purchaseDropdown1"
                fluid
                search
                selection
                options={categoryOptions}
                value={reportType}
                onChange={handleCategoryChange}
              />
              <Dropdown
                control={Select}
                options={shop?.map((str) => ({
                  key: str.shopCode,
                  text: str.shopCode,
                  value: str.shopCode,
                }))}
                placeholder={t("enterTransferTo")}
                fluid
                search
                className="purchaseDropdown"
                selection
                value={expenseLocation}
                onChange={handleSelectChange}
                style={{ zIndex: "9" }}
              />

              <DatePicker
                selected={selectedDate}
                onChange={handleDateSelectChange}
                placeholderText={t("startingDate")}
                dateFormat="dd/MM/yyyy"
                className="datePicker"
                // style={{ flex: 1 }}
              />
              <DatePicker
                selected={selectEndDate}
                onChange={handleSelectEndDateChange}
                placeholderText={t("endingDate")}
                dateFormat="dd/MM/yyyy"
                // style={{ flex: 1 }}
                className="datePicker"
              />
              <Button className="buttonPurchase" onClick={filterData}>
                {t("search")}&nbsp;&nbsp;{<SearchIcon />}
              </Button>
              <Button
                className="buttonPurchase"
                onClick={() => {
                  setExpenseLocation("");
                  setReportType("");
                  setSelectEndDate("");
                  setSelectedDate("");
                  getExpenseRecord();
                  setData(pr);
                }}
              >
                {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
              </Button>
            </div>
            <div className="Purchase-table-container">
              {loading ? (
                <TableComponentId
                  data={data}
                  columns={columns}
                  actions={actions}
                />
              ) : (
                <Loader active>Loading</Loader>
              )}
            </div>
          </>
        )}
      </div>
      {/* <div className="div1Container">
      <div style={{width: "75%"}}>
      <Stack spacing={2} direction="row" alignItems="center" marginTop={5}>
      <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>
      {t("expenseInvoices")}
      </Typography>
      <ButtonGroup>
        <Typography className="typograpgy2" style={{ backgroundColor: "#62cb67", fontSize: 20, color: "#ffffff", padding: '10px' }}>
         {t('totalRecords')}&nbsp;&nbsp;
          <EventAvailableIcon fontSize="small" />
        </Typography>
        <Typography className="typograpgy3" style={{ backgroundColor: "#ffffff", fontSize: 20, color: "#393939", padding: '10px' }}>
          {rowCount}
        </Typography>
      </ButtonGroup>
    </Stack>
   

    <Stack  backgroundColor="white"   borderRadius="50px 50px 0 0" padding={1} marginTop={1}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} padding={3}>
           <Form style={{width:"100%"}}>
            <Stack direction="row" sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                <Form.Group widths="equal" style={{ display: "flex", gap: "30px" }} >
                  <Dropdown
                    control={Select}
                    placeholder={t("expenseCategory")}
                    fluid
                    selection
                    options={categoryOptions}
                    value={reportType}
                    onChange={handleCategoryChange}
                    style={{ flex: 1, padding:"10px" ,width:"200px" }}
                  />
                  <Dropdown
                    control={Select}
                    options={shop?.map((str) => ({
                      key: str.shopCode,
                      text: str.shopCode,
                      value: str.shopCode,
                    }))}
                    placeholder={t("location")}
                    fluid
                    search
                    selection
                    clearable
                    value={expenseLocation}
                    onChange={handleSelectChange}
                    style={{ flex: 1,width:"100px" }}
                  />
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateSelectChange}
                    placeholderText={t("startingDate")}
                    dateFormat="dd/MM/yyyy"
                    style={{ flex: 1 }}
                    //isClearable
                  />
                  <DatePicker
                    selected={selectEndDate}
                    onChange={handleSelectEndDateChange}
                    placeholderText={t("endingDate")}
                    dateFormat="dd/MM/yyyy"
                    style={{ flex: 1 }}
                    //isClearable
                  />
                  </Form.Group>
                  <Form.Group widths="equal" style={{ display: "flex", gap: "20px" }}>
                  <Button onClick={filterData} 
                style={{ backgroundColor: "transparent", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
                  >
                    {t("search")}&nbsp;&nbsp;{<SearchIcon />}
                  </Button>
                  <Button
                    onClick={() => {
                    setExpenseLocation("");
                    setReportType("");
                    setSelectEndDate("");
                    setSelectedDate("");
                    getExpenseRecord();
                    setData(pr);
                    }}
                    style={{ backgroundColor: "transparent", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
                  >
                    {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
                  </Button> 
              </Form.Group>
              </Stack>
            </Form>
            </Stack>
          </Stack>
 {loading ? (
              <div
                ref={tableContainerRef}
                style={{ height: "70vh", overflow: "auto" }}
              >
        <TableComponentId
                  data={data}
                  columns={columns}
                  actions={actions}
                />
                </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  height: "100vh",
                }}
              >
                <Loader active>Loading</Loader>
              </div>
            )}
      </div>

    </div> */}
    </>
  );
};

export default ExpenseInvoice;
