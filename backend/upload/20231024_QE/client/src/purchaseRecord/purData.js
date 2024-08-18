import React from "react";
import MetaData from "../MetaData";
import { useEffect, useState, useContext, useRef } from "react";
import Arrow from "../Components/ScrollArrow/arrow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BottomBar from "../Components/bottomBar/bottomBar";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Table } from "semantic-ui-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import {
  Button,
  Input,
  Form,
  Select,
  Modal,
  Message,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";

import "../purchaseRecipt/PurchaseCss/purchase.css";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import { useTranslation } from "react-i18next";
import { State } from "./context/ContextSales";
import { useCustomState } from "../Variables/stateVariables";
// import { getPurchaseRecord } from "../Api";
import { searchPurchaseRecord } from "../Components/searchComponent/purchaseRecordSearch/purchaseRecord";
import { tableState } from "../Components/tableComponent/tableContext";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { getPurchaseRecord } from "../actions/purchaseAction";
import { getCompany } from "../actions/companyAction";
import { refreshTokken } from "../actions/userAction";
import "./../Pages/Product/Css/app.css";
let pr = [];
let isCalledd = "false";

const TableTransfer = () => {
  //for Scrolling
  const tableContainerRef = useRef(null);

  ///////////////////////////////////////////
  const { salesId, setSalesId, salesRef } = useContext(State);
  const { rowCount, setRowCount } = useContext(tableState);

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
    custName,
    setcustName,
    filteredProducts,
    setFilteredProducts,
    purchaseReceiptNumber,
    setPurchaseReceiptNumber,
    purchaseCompany,
    setPurchaseCompany,
  } = useCustomState();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [colorTheme, setColorTheme] = useState("theme-white");
  const dispatch = useDispatch();
  const { purchaseRecord, loading } = useSelector(
    (state) => state.purchaseRecord
  );
  const { company } = useSelector((state) => state.company);
  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);
  useEffect(() => {
    dispatch(getPurchaseRecord());
    dispatch(getCompany());
  }, []);

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
    if (!loading) {
      getSalesRecord();
    }
  }, [loading]);
  const getSalesRecord = async () => {
    // pr = await getPurchaseRecord();
    pr = purchaseRecord;
    // console.log(pr);
    if (pr) {
      //to filter product for each storage location that a user login with account
      if (
        JSON.parse(localStorage.getItem("isAdministrator")) ||
        JSON.parse(localStorage.getItem("isSuperAdmin"))
      ) {
        pr = purchaseRecord;
        setData(pr);
        console.log(pr);
        setSalesRecord(pr);
        setFilteredProducts(pr.reverse());
      } else {
        console.log("called");
        pr = pr?.reduce((filteredProducts, product) => {
          if (product?.shopNo === JSON.parse(localStorage.getItem("shopId"))) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        }, []);
        setData(pr);
        console.log(pr);
        setSalesRecord(pr);
        setFilteredProducts(pr.reverse());
      }
    } else {
      pr = [];
    }

    // setLoading(true);
  };

  const sellproduct = (id) => {
    setSalesId(id);
    navigate("/Previewpurchase");
  };

  const handleInvoiceNmberSelectChange = (event, { value }) => {
    setInvoiceNumber(value);
  };
  const handlecustomerNameSelectChange = (event, { value }) => {
    setcustName(value);
  };
  const handleReceiptSelectChange = (event, { value }) => {
    setPurchaseReceiptNumber(value);
  };
  const handleCompanySelectChange = (event, { value }) => {
    setPurchaseCompany(value);
  };

  const handleDateSelectChange = (date) => {
    setSelectedDate(date);
  };
  const handleSelectEndDateChange = (date) => {
    setSelectEndDate(date);
  };

  const handleSearch = async () => {
    const dataa = await searchPurchaseRecord(
      SalesRecord,
      InvoiceNumber,
      purchaseReceiptNumber,
      purchaseCompany,
      custName,
      selectedDate,
      selectEndDate
    );
    setData(dataa);
  };

  const columns = [
    { field: "id", label: t("invoiceNumber") },
    { field: "clientName", label: t("purchaseFrom") },
    { field: "purchaseReceiptNumber", label: t("receiptNumber") },
    { field: "purchaseCompany", label: t("company") },
    { field: "purchaseDate", label: t("purchaseDate"), format: "date" },
    { field: "createdAt", label: t("time"), format: "time" },
    { field: "createdAt", label: t("date"), format: "date" },
  ];
  const actions = [
    {
      label: "Preview",
      color: "green",
      handler: (itemId) => sellproduct(itemId),
      url: null,
    },
  ];
  return (
    <>
      <MetaData title="QE ~~PurchaseInvoice" />
      <div className={`purchase ${colorTheme}`}>
        <div className="contentt-box">
          <div className="heading-container">
            <h3>{t("purchaseInvoices")}</h3>
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
            options={SalesRecord?.map((element) => ({
              key: element.id,
              text: element.id,
              value: element.id,
            }))}
            placeholder={t("invoiceNumber")}
            className="purchaseDropdown1"
            fluid
            search
            selection
            value={InvoiceNumber}
            onChange={handleInvoiceNmberSelectChange}
          />
          <Dropdown
            control={Select}
            options={SalesRecord?.map((element) => ({
              key: element.id,
              text: element.clientName,
              value: element.clientName,
            }))}
            placeholder={t("customerName")}
            fluid
            search
            className="purchaseDropdown"
            selection
            value={custName}
            onChange={handlecustomerNameSelectChange}
            style={{ zIndex: "9" }}
          />
          <Dropdown
            control={Select}
            options={SalesRecord?.map((element) => ({
              key: element.id,
              text: element.purchaseReceiptNumber,
              value: element.purchaseReceiptNumber,
            }))}
            placeholder={t("receiptNumber")}
            fluid
            search
            className="purchaseDropdown"
            selection
            value={purchaseReceiptNumber}
            onChange={handleReceiptSelectChange}
            // style={{ flex: 1, width: "100px" }}
          />
          <Dropdown
            control={Select}
            options={company?.map((comp) => ({
              key: comp.companyName,
              text: comp.companyName,
              value: comp.companyName,
            }))}
            placeholder={t("company")}
            fluid
            search
            className="purchaseDropdown"
            selection
            value={purchaseCompany}
            onChange={handleCompanySelectChange}
            // style={{ flex: 1, width: "120px" }}
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
          <Button className="buttonPurchase" onClick={handleSearch}>
            {t("search")}&nbsp;&nbsp;{<SearchIcon />}
          </Button>
          <Button
            className="buttonPurchase"
            onClick={() => {
              setInvoiceNumber("");
              setcustName("");
              setSelectedDate("");
              setSelectEndDate("");
              setPurchaseCompany("");
              setPurchaseReceiptNumber("");
              setData(pr);
            }}
          >
            {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
          </Button>
        </div>
        <div className="Purchase-table-container">
          {!loading ? (
            <TableComponentId data={data} columns={columns} actions={actions} />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
      </div>
    </>
  );
};

export default TableTransfer;
