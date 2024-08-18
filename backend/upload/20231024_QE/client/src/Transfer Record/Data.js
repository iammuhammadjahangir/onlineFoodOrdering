import React from "react";
import MetaData from "../MetaData";
import { useEffect, useState, useContext, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Arrow from "../Components/ScrollArrow/arrow";
import BottomBar from "../Components/bottomBar/bottomBar";
import "../Transfer Recipt/transferReciptCss/transfer.css";
import { Dropdown, Table } from "semantic-ui-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "../salesRecipt/salerecipt.css";
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
import { useTranslation } from "react-i18next";
import { State } from "./context/ContextSales";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import { useCustomState } from "../Variables/stateVariables";
// import { getProductLocOnStorageCode, getTransferInvoiceRecord, getTransferRecord } from "../Api";
import { tableState } from "../Components/tableComponent/tableContext";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Box, ButtonGroup } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {
  getTransferInvoiceRecord,
  getTransferRecord,
} from "../actions/transferAction";
import { refreshTokken } from "../actions/userAction";
let pr = [];
let selectedShop = [];
let seletedGodown = [];
let selectedTempShop = "";
let isCalledd = "false";
const TableTransfer = () => {
  //for Scrolling
  const tableContainerRef = useRef(null);

  ///////////////////////////////////////////
  const {
    salesId,
    setSalesId,
    salesRef,
    selectedRadioOption,
    setSelectedRadioOption,
  } = useContext(State);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEndDate, setSelectEndDate] = useState(null);
  const [SalesRecord, setSalesRecord] = useState([]);
  const navigate = useNavigate();
  const [InvoiceNumber, setInvoiceNumber] = useState();
  const [custName, setcustName] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, setData } = useCustomState();
  const { rowCount, setRowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, []);
  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    isCalledd = "false";
  });
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

  ////////////==================================//////////
  /////////////////  shop selection ///////////////////////
  //////////==================================/////////
  const shopAsArray = [selectedShop];
  const shopCodes = shopAsArray?.map((shop) => shop);
  const godownCodes = seletedGodown.map((godown) => godown.storageCode);
  const combinedOptions = [...shopCodes, ...godownCodes];

  useEffect(() => {
    console.log(combinedOptions);
    if (combinedOptions?.length > 0 && !selectedRadioOption) {
      setSelectedRadioOption(combinedOptions[0]);
      console.log(combinedOptions[0]);
      selectedTempShop = combinedOptions[0];
    }
  }, [combinedOptions, selectedRadioOption]);

  useEffect(() => {
    selectedShop = JSON.parse(localStorage.getItem("shopId"));
    seletedGodown = JSON.parse(localStorage.getItem("godownId"));
    console.log(selectedShop);
    console.log(seletedGodown);
  });

  const handleOptionChange = async (event, { value }) => {
    setLoading(false);
    console.log(value);
    pr = await getTransferInvoiceRecord(value);
    console.log(pr);
    setSelectedRadioOption(value);
    setData(pr);
    setLoading(true);
  };

  async function call() {
    if (
      JSON.parse(localStorage.getItem("isAdministrator")) ||
      JSON.parse(localStorage.getItem("isAdministrator"))
    ) {
      let result = await getTransferRecord();
      console.log(result);
      pr = result;
      setData(result);
      setSalesRecord(result);
      setFilteredProducts(result.reverse());
      setLoading(true);
    } else {
      let result = await getTransferInvoiceRecord(
        JSON.parse(localStorage.getItem("shopId"))
      );
      console.log(result);
      pr = result;
      setData(result);
      setSalesRecord(result);
      setFilteredProducts(result.reverse());
      setLoading(true);
    }
  }

  const sellproduct = (id) => {
    setSalesId(id);
    navigate("/TranferPreviewBill");
  };

  const handleInvoiceNmberSelectChange = (event, { value }) => {
    setInvoiceNumber(value);
  };
  const handlecustomerNameSelectChange = (event, { value }) => {
    setcustName(value);
  };

  const handleDateSelectChange = (date) => {
    setSelectedDate(date);
  };
  const handleSelectEndDateChange = (date) => {
    setSelectEndDate(date);
  };

  const handleSearch = () => {
    let Filtered = SalesRecord?.filter((product) => {
      //Filter by Products
      if (
        InvoiceNumber &&
        !product.id
          .toString()
          .toLowerCase()
          .includes(InvoiceNumber.toString().toLowerCase())
      ) {
        return false;
      }

      //Filter by product Type
      if (
        custName &&
        !product.transferTo
          .toString()
          .toLowerCase()
          .includes(custName.toString().toLowerCase())
      ) {
        return false;
      }

      // Filter by starting date
      if (selectedDate) {
        const saleDate = new Date(product.createdAt);
        if (saleDate < selectedDate) {
          return false;
        }
      }

      // Filter by ending date
      if (selectEndDate) {
        const saleDate = new Date(product.createdAt);
        if (saleDate > selectEndDate) {
          return false;
        }
      }

      return true;
    });

    setData(Filtered);
  };

  const columns = [
    { field: "id", label: t("invoiceNumber") },
    { field: "tranferFrom", label: t("transferFrom") },
    { field: "transferTo", label: t("transferTo") },
    { field: "createdAt", label: t("date"), format: "date" },
    { field: "createdAt", label: t("time"), format: "time" },
    // {field: `${new Date(createdAt).toLocaleDateString()}`, label: 'Sale Date'},
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
      <MetaData title="QE ~~TransferInvoice" />
      <div className={`transfer ${colorTheme}`}>
        <div className="contentt-box">
          <div className="heading-container">
            <h3>{t("transferInvoices")}</h3>
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
              key: element.transferTo,
              text: element.transferTo,
              value: element.transferTo,
            }))}
            placeholder={t("enterTransferTo")}
            fluid
            search
            className="purchaseDropdown"
            selection
            value={custName}
            onChange={handlecustomerNameSelectChange}
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
          {!JSON.parse(localStorage.getItem("isAdministrator")) ||
            (!JSON.parse(localStorage.getItem("isSuperAdmin")) && (
              <Dropdown
                placeholder="Select an option"
                selection
                options={combinedOptions.map((option) => ({
                  key: option,
                  text: option,
                  value: option,
                }))}
                className="purchaseDropdown1"
                value={selectedRadioOption}
                onChange={handleOptionChange}
              />
            ))}
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
              setData(pr);
            }}
          >
            {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
          </Button>
        </div>
        <div className="Purchase-table-container">
          {loading ? (
            <TableComponentId data={data} columns={columns} actions={actions} />
          ) : (
            <Loader active>Loading</Loader>
          )}
        </div>
      </div>

      {/*       
      <div className="div1Container" style={{marginTop: "20px"}}>
      <div style={{width: "75%"}}>
      
      
      <Stack spacing={2} direction="row" marginTop={5} alignItems="center">
      <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>
      {t("transferInvoices")}
      </Typography>
      <ButtonGroup>
        <Typography className="typograpgy2" style={{ backgroundColor: "#62cb67", fontSize: 20, color: "#ffffff", padding: '10px', paddingRight: "3px" }}>
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
                    options={SalesRecord?.map((element) => ({
                      key: element.id,
                      text: element.id,
                      value: element.id,
                    }))}
                    placeholder={t("invoiceNumber")}
                    fluid
                    search
                    selection
                    clearable
                    value={InvoiceNumber}
                    onChange={handleInvoiceNmberSelectChange}
                    style={{ flex: 1, padding:"10px" ,width:"230px"  }}
                  />
                  <Dropdown
                    control={Select}
                    options={SalesRecord?.map((element) => ({
                      key: element.transferTo,
                      text: element.transferTo,
                      value: element.transferTo,
                    }))}
                    placeholder={t("enterTransferTo")}
                    fluid
                    search
                    selection
                    clearable
                    value={custName}
                    onChange={handlecustomerNameSelectChange}
                    style={{ flex: 1,width:"70px"  }}
                  />

                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateSelectChange}
                    placeholderText={t("startingDate")}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    style={{ flex: 1 }}
                  />
                  <DatePicker
                    selected={selectEndDate}
                    onChange={handleSelectEndDateChange}
                    placeholderText={t("endingDate")}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    style={{ flex: 1 }}
                  />
                  {!JSON.parse(localStorage.getItem("isAdministrator")) || !JSON.parse(localStorage.getItem("isSuperAdmin"))  && (
                 <Dropdown
                 placeholder="Select an option"
                 selection
                 options={combinedOptions.map((option) => ({
                   key: option,
                   text: option,
                   value: option,
                 }))}
                 value={selectedRadioOption}
                 onChange={handleOptionChange}
                 style={{
                   marginBottom: '0px',
                   padding: '10px',
                   width: '200px',
                   height: '30px',
                 }}
               />
                )}
              </Form.Group>
              <Form.Group widths="equal" style={{ display: "flex", gap: "20px" }}>
              <Button
                style={{ backgroundColor: "transparent", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
                onClick={handleSearch}
              >
                {t("search")}&nbsp;&nbsp;{<SearchIcon />}
              </Button>
              <Button
                 style={{ backgroundColor: "transparent", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
                onClick={() => {
                setInvoiceNumber("");
                setcustName("");
                setSelectedDate("");
                setSelectEndDate("");
                setData(pr);
                }}
              >
                {t("clear")}&nbsp;&nbsp;{<ClearAllIcon />}
              </Button>
              </Form.Group>
              </Stack>
            </Form>
            </Stack>
          </Stack>
                
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

    </div>
     */}
    </>
  );
};

export default TableTransfer;
