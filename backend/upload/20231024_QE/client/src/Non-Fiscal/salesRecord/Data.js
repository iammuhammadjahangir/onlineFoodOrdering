import React from "react";
import { useEffect, useState, useContext} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Dropdown, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "../salesRecipt/salerecipt.css";
import {
  Select,
  Loader,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { State } from "./context/ContextSales";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import { useCustomState } from "../Variables/stateVariables";
// import { getSaleRecord } from "../Api";
import { searchSaleRecord } from "../Components/searchComponent/SaleRecordSearch/saleRecordSearch";
import { tableState } from "../Components/tableComponent/tableContext";

import { useSelector, useDispatch } from "react-redux";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { getSaleRecord } from "../actions/saleProductAction";
import { refreshTokken } from "../actions/userAction";
let isCalledd = "false";
let pr = [];
const TableTransfer = () => {
  //for Scrolling

  ///////////////////////////////////////////
  const { setSalesId } = useContext(State);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEndDate, setSelectEndDate] = useState(null);
  const [SalesRecord, setSalesRecord] = useState([]);
  const navigate = useNavigate();
  const [InvoiceNumber, setInvoiceNumber] = useState();
  const [custName, setcustName] = useState("");
  // const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, setData } = useCustomState();
  const { rowCount } = useContext(tableState);
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { saleRecord, loading } = useSelector((state) => state.saleRecord);
  useEffect(() => {
    dispatch(getSaleRecord());
  }, [dispatch]);
  useEffect(() => {
    if (!loading) {
      getSalesRecord();
    }
  }, [saleRecord, ]);

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
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
  }, [i18n]);
  const getSalesRecord = async () => {
    // pr = await getSaleRecord();
    // console.log(pr);
    pr = saleRecord;
    if (saleRecord) {
      //to filter product for each storage location that a user login with account
      if (
        JSON.parse(localStorage.getItem("isAdministrator")) ||
        JSON.parse(localStorage.getItem("isSuperAdmin"))
      ) {
        pr = saleRecord;
        setSalesRecord(pr);
        setData(pr);
        setFilteredProducts(pr.reverse());
      } else {
        pr = saleRecord?.reduce((filteredProducts, product) => {
          if (product?.shopNo === JSON.parse(localStorage.getItem("shopId"))) {
            filteredProducts.push(product);
          }
          return filteredProducts;
        }, []);
        setSalesRecord(pr);
        setData(pr);
        setFilteredProducts(pr.reverse());
      }
    } else {
      pr = [];
    }
  };

  const sellproduct = (id) => {
    setSalesId(id);
    navigate("/Preview");
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

  const handleSearch = async () => {
    const dataa = await searchSaleRecord(
      SalesRecord,
      InvoiceNumber,
      custName,
      selectedDate,
      selectEndDate
    );
    setData(dataa);
  };

  const columns = [
    { field: "id", label: t("invoiceNumber") },
    { field: "invoiceNumber", label: t("fbrInvoiceNumber") },
    { field: "customerName", label: t("customerName") },
    { field: "customerNumber", label: t("customerNumber") },
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
      <div className={`App ${colorTheme}`}>
        <div className="contentt-box">
          <div className="heading-container">
            <h3>{t("saleInvoices")}</h3>
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
              text: element.customerName,
              value: element.customerName,
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
      {/* <div className="div1Container" style={{marginTop: "20px"}}>
      <div style={{width: "75%"}}>
      

      <Stack spacing={2} direction="row" marginTop={5} alignItems="center">
        <Typography className="typograpgy" style={{ color: "#000000", fontSize: 30 }}>
          {t("saleInvoices")}
        </Typography>
        <ButtonGroup>
          <Typography className="typograpgy2" style={{ backgroundColor: "#62cb67", fontSize: 20, color: "#ffffff", padding: '10px' }}>
            {t('totalRecords')}&nbsp;&nbsp;<EventAvailableIcon fontSize="small" />
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
                    options={SalesRecord?.map((element) => ({
                      key: element.id,
                      text: element.id,
                      value: element.id,
                    }))}
                    placeholder={t("invoiceNumber")}
                    fluid
                    search
                    selection
                    value={InvoiceNumber}
                    onChange={handleInvoiceNmberSelectChange}
                    style={{ flex: 1,  padding:"10px" ,width:"200px" }}
                  />
                  <Dropdown
                    control={Select}
                    options={SalesRecord?.map((element) => ({
                      key: element.id,
                      text: element.customerName,
                      value: element.customerName,
                    }))}
                    placeholder={t("customerName")}
                    fluid
                    search
                    selection
                    value={custName}
                    onChange={handlecustomerNameSelectChange}
                    style={{ flex: 1,width:"100px" }}
                  />

                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateSelectChange}
                    placeholderText={t("startingDate")}
                    dateFormat="dd/MM/yyyy"
                    style={{ flex: 1 }}
                  />
                  <DatePicker
                    selected={selectEndDate}
                    onChange={handleSelectEndDateChange}
                    placeholderText={t("endingDate")}
                    dateFormat="dd/MM/yyyy"
                    style={{ flex: 1 }}
                  />
              </Form.Group>
              <Form.Group widths="equal" style={{ display: "flex", gap: "20px" }}>
                <Button
                  style={{ backgroundColor: "transparent", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
                  onClick={handleSearch}
                  >
                    {t("search")}&nbsp;&nbsp;{<SearchIcon />}
                </Button>
                <Button
                  style={{ backgroundColor: "transparent",  border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "10px 10px 10px 10px", fontWeight: "bold",}}
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
          {!loading ? (
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

export default TableTransfer;
