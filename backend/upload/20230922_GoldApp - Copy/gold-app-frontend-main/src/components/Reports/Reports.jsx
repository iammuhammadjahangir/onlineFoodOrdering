import React, { Component, useEffect, forwardRef } from "react";
import Navbar from "../Navbar/Navbar";
import TableComponent from "../TableComponent/tableComponent";
import Box from "@mui/material/Box";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import style from "./Reports.module.css";
import { Button, TextField, InputAdornment, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import View from "../View/View";
import {
  deletePurchaseRecord,
  deleteTradeRecord,
  getPurchaseFormData,
  getTradeFormData,
  getPurchaseDurationWise,
  getTradeDurationWise,
  getTradeTypeWiseData,
  getAssignRolesByIdAndNames,
} from "../../api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { format } from "date-fns";
import { RotatingLines } from "react-loader-spinner";
import { Print, Search, DateRange } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Calculations from "../Calculations/Calculations";
import { original } from "@reduxjs/toolkit";
const date = new Date();
const d = date.getDate();
const mo = date.getMonth();
const y = date.getFullYear();
const h = date.getHours();
const m = date.getMinutes();
const string = `${d}/${mo}/${y}`;

const initialData = {
  reportID: "",
};

let checkedforActions = "Delete";

//for Purchase report
let cash = "";
let pureWeight = "";
let originalPond = "";
let finalPond = "";
let mail = "";

//For Trade Report
let goldBought = 0;
let cashPaid = 0;
let goldSold = 0;
let cashRecieved = 0;
let pcsGoldBought = 0;
let pcsCashPaid = 0;
let pcsGoldSold = 0;
let pcsCashRecieved = 0;
let rawaGoldBought = 0;
let rawaCashPaid = 0;
let rawaGoldSold = 0;
let rawaCashRecieved = 0;
let gramiGoldBought = 0;
let gramiCashPaid = 0;
let gramiGoldSold = 0;
let gramiCashRecieved = 0;

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState("Active Records");

  const [permission, setPermission] = useState(false);
  const navigate = useNavigate();
  const [formdataArray, setFormDataArray] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isPurchaseReport, setPurchaseStatus] = useState(true);
  const [reportID, hanldeReportID] = useState();
  const [data, setData] = useState(initialData);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setSendDate] = useState(false);
  const [showComp, setShowComp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [duration, setDuration] = useState("");
  const [searchRawaGramiPcs, setSearchRawaGramiPcs] = useState("");
  const ComponentDivRef = useRef();
  const { bool } = useParams();

  useEffect(() => {
    setSearchRawaGramiPcs("");
  }, [navigate]);
  useEffect(() => {
    setDuration("today");
    isPurchaseReport ? call() : call2();
  }, [pageNumber, isPurchaseReport, reportID, date, checked, update]);

  useEffect(() => {
    bool === "true" ? setPurchaseStatus(true) : setPurchaseStatus(false);

    async function getPermission() {
      try {
        const data = await getAssignRolesByIdAndNames(
          JSON.parse(localStorage.getItem("userRoleId")),
          bool === "true" ? "View Purchase Report" : "View Trade Report"
        );
        console.log(data.data.status);
        setPermission(data.data.status);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the async function
    getPermission();
  }, [bool]);

  async function call() {
    try {
      setLoading(true);
      const resp = await getPurchaseFormData(
        pageNumber,
        reportID,
        startDate,
        endDate,
        checked
      );

      const { data, total } = resp?.data;
      console.log(data);
      console.log(resp);
      // const date = format(new Date(resp?.data?.data[0]?.createdAt), "dd/MM/yyyy hh:mm:ss a");
      console.log(data);
      console.log(resp);
      setFormDataArray([...data]);
      totalValuesForPurchase([...data]);

      setTotalPages(total);
    } catch (e) {}
  }
  async function call2() {
    try {
      setLoading(true);
      const resp = await getTradeFormData(
        pageNumber,
        reportID,
        startDate,
        endDate,
        checked
      );

      console.log(resp);

      const { data, total } = resp?.data;

      totalValuesForTrade([...data]);
      setFormDataArray([...data]);

      setTotalPages(total);
    } catch (e) {}
  }
  const columnsForPurchaseReport = [
    { id: "reportID", label: "Report ID" },
    { id: "customer", label: "Name" },
    { id: "pondWeight", label: "Orignal Pond" },
    { id: "mail", label: "Mail" },
    { id: "finalWeight", label: "Final Pond" },
    { id: "pureWeight", label: "Pure" },
    { id: "cash", label: "Cash" },
    { id: "gramRate", label: "Gram Rate" },
    { id: "rate", label: "Rate" },
    { id: "createdAt", label: "Date/Time", format: "date" },
    // { id: "sellerName", label: "Seller Name", minWidth: 100 },
  ];

  const columnsForTradeReport = [
    { id: "reportID", label: "Report ID" },
    { id: "name", label: "Name" },
    { id: "weight", label: "Weight" },
    { id: "rate", label: "Rate" },
    { id: "type", label: "Type" },
    { id: "cash", label: "Cash" },
    { id: "createdAt", label: "Date/Time", format: "date" },
    // { id: "sellerName", label: "Seller Name", minWidth: 100 },
  ];

  const actionsForPurchaseReport = [
    {
      id: `${checkedforActions}`,
      color: "white",
      url: (itemId) => `/update/${itemId}`,
      backgroundColor: "#1976d2",
      align: "column.align",
      minWidth: "100",
      label: "Purchase Report",
    },
    {
      id: `Print`,
      color: "white",
      backgroundColor: "#1976d2",
      align: "column.align",
      minWidth: "100",
      label: "Purchase Report",
    },
  ];
  const actionsForTradeReport = [
    {
      id: `${checkedforActions}`,
      color: "white",
      url: (itemId) => `/update/${itemId}`,
      align: "column.align",
      minWidth: "100",
      backgroundColor: "blue",
      label: "Trade Report",
    },
    {
      id: `Print`,
      color: "white",
      align: "column.align",
      minWidth: "100",
      backgroundColor: "blue",
      label: "Trade Report",
    },
  ];

  // Define the callback function
  const handleChildButtonClickForPurchaseReport = async (itemId) => {
    try {
      const res = await deletePurchaseRecord(
        itemId,
        checked ? { status: false } : { status: true }
      );
      console.log(res);
      if (res.status === 200) {
        setUpdate((prev) => !prev);
        alert("Record Updated");
      }
    } catch (e) {
      console.log(e);
      alert(e?.res?.data?.message);
    }
  };

  const handleChildButtonClickForTradeReport = async (itemId) => {
    try {
      const res = await deleteTradeRecord(
        itemId,
        checked ? { status: false } : { status: true }
      );
      console.log(res);
      if (res.status === 200) {
        setUpdate((prev) => !prev);
        alert("Record Updated");
      }
    } catch (e) {
      console.log(e);
      alert(e?.res?.data?.message);
    }
  };

  const sellerName = useSelector((state) => {
    return state.authFormData.authFormData.name;
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handlePrint = useReactToPrint({
  //   content: () => ComponentDivRef.current,
  //   documentTitle: "Purchase-Data",
  //   // onAfterPrint: () => {
  //   // 	alert("Print Success");
  //   // },
  // });

  const handlePrintTrade = (data) => {
    localStorage.setItem(
      "values",
      JSON.stringify({
        id: data.reportID,
        name: data.name,
        weight: data.weight,
        rate: data.rate,
        type: data.type,
        cash: data.cash,
        packingCharges: data.packingCharges,
        desc: data.desc,
        type: "trade",
        category: data.type,
        navigate: "admin/report/false",
      })
    );
    navigate("/thermalPrintComponent");
  };
  const handlePrintPurchase = (data) => {
    localStorage.setItem(
      "values",
      JSON.stringify({
        customerId: data.reportID,
        customer: data.customer,
        pondWeight: data.pondWeight,
        mail: data.mail,
        finalWeight: data.finalWeight,
        gramRate: data.gramRate,
        pureWeight: data.pureWeight,
        rate: data.rate,
        cash: data.cash,
        desc: data.desc,
        ratti: data.ratti,
        milli: data.milli,
        rattiMilli: "RattiMilli",
        paymentMethod: data.paymentMethod,
        type: "purchase",
        navigate: "admin/report/true",
      })
    );
    navigate("/thermalPrintComponent");
  };

  const handleSearch = () => {};
  console.log(startDate);
  console.log(endDate);
  const pickStartDate = (date) => {
    setStartDate(date);
  };
  const pickEndDate = (date) => {
    setEndDate(date);
  };
  const handleSwitchChange = (event) => {
    setDuration("");
    setSelectedOption(event.target.value);
    setChecked((prev) => !prev);
    selectedOption === "Deleted Records"
      ? (checkedforActions = "Delete")
      : (checkedforActions = "Recover");
  };

  const handleDurationChange = async (value) => {
    setDuration(value);
    console.log(value);
    console.log(selectedOption);
    if (isPurchaseReport && selectedOption) {
      const data = await getPurchaseDurationWise(
        value,
        selectedOption === "Deleted Records" ? true : false
      );
      console.log(data);
      totalValuesForPurchase(data.data);
      setFormDataArray(data.data);
    }
    if (!isPurchaseReport && selectedOption) {
      const data = await getTradeDurationWise(
        value,
        selectedOption === "Deleted Records" ? true : false
      );
      console.log(data);
      totalValuesForTrade(data.data);
      setFormDataArray(data.data);
    }
  };

  const totalValuesForPurchase = (record) => {
    cash = 0;
    pureWeight = 0;
    originalPond = 0;
    finalPond = 0;
    mail = 0;
    cash = record
      .reduce((sum, cust) => sum + parseFloat(cust.cash, 10), 0)
      .toString();
    pureWeight = record
      .reduce((sum, cust) => sum + parseFloat(cust.pureWeight, 10), 0)
      .toString();
    originalPond = record
      .reduce((sum, cust) => sum + parseFloat(cust.pondWeight, 10), 0)
      .toString();
    finalPond = record
      .reduce((sum, cust) => sum + parseFloat(cust.finalWeight, 10), 0)
      .toString();
    mail = record
      .reduce((sum, cust) => sum + parseFloat(cust.mail, 10), 0)
      .toString();
  };

  //for trafe total values
  const totalValuesForTrade = (record) => {
    goldBought = 0;
    cashPaid = 0;
    goldSold = 0;
    cashRecieved = 0;
    pcsGoldBought = 0;
    pcsCashPaid = 0;
    pcsGoldSold = 0;
    pcsCashRecieved = 0;
    rawaGoldBought = 0;
    rawaCashPaid = 0;
    rawaGoldSold = 0;
    rawaCashRecieved = 0;
    gramiGoldBought = 0;
    gramiCashPaid = 0;
    gramiGoldSold = 0;
    gramiCashRecieved = 0;
    record.forEach((cust) => {
      const cash = parseFloat(cust.cash, 10);
      const weight = parseFloat(cust.weight, 10);
      if (cust.type.includes("buy")) {
        cashPaid += cash;
        goldBought += weight;
      } else if (cust.type.includes("sell")) {
        cashRecieved += cash;
        goldSold += weight;
      }

      if (cust.type.includes("buyRawa")) {
        rawaGoldBought += weight;
        rawaCashPaid += cash;
      } else if (cust.type.includes("buyPCS")) {
        pcsCashPaid += cash;
        pcsGoldBought += weight;
      } else if (cust.type.includes("buyGrami")) {
        gramiGoldBought += weight;
        gramiCashPaid += cash;
      } else if (cust.type.includes("sellRawa")) {
        rawaGoldSold += weight;
        rawaCashRecieved += cash;
      } else if (cust.type.includes("sellPCS")) {
        pcsGoldSold += weight;
        pcsCashRecieved += cash;
      } else if (cust.type.includes("sellGrami")) {
        gramiGoldSold += weight;
        gramiCashRecieved += cash;
      }
    });

    console.log("goldBought", goldBought);
    console.log("cashPaid", cashPaid);
    console.log("goldSold", goldSold);
    console.log("cashRecieved", cashRecieved);
    console.log("pcsGoldBought", pcsGoldBought);
    console.log("pcsCashPaid", pcsCashPaid);
    console.log("pcsGoldSold", pcsGoldSold);
    console.log("pcsCashRecieved", pcsCashRecieved);
    console.log("rawaGoldBought", rawaGoldBought);
    console.log("rawaCashPaid", rawaCashPaid);
    console.log("rawaGoldSold", rawaGoldSold);
    console.log("rawaCashRecieved", rawaCashRecieved);
    console.log("gramiGoldBought", gramiGoldBought);
    console.log("gramiCashPaid", gramiCashPaid);
    console.log("gramiGoldSold", gramiGoldSold);
    console.log("gramiCashRecieved", gramiCashRecieved);
  };
  const handleSearchTypeChange = async (value) => {
    console.log(value);
    console.log(selectedOption);
    console.log(selectedOption === "Deleted Records");
    setSearchRawaGramiPcs(value);
    if (!isPurchaseReport && selectedOption) {
      setDuration("");
      const data = await getTradeTypeWiseData(
        value,
        selectedOption === "Deleted Records" ? true : false
      );
      console.log(data);
      totalValuesForTrade(data.data);
      setFormDataArray(data.data);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "85%" }}>
        <h1>{isPurchaseReport ? "Purchase Report" : "Trade Report"} </h1>

        <div className="centerDiv">
          <div>
            {!loading ? (
              permission ? (
                <div>
                  <div className={style.searchBar}>
                    {/* <div className={style.reportSearch}>
                <TextField
                  label="ID / Text"
                  variant="outlined"
                  value={data.reportID}
                  onChange={handleChange}
                  name="reportID"
                  size="small"
                  className={style.pureWeight}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onFocus={() => {
                    // setSendDate((prev) => !prev);
                  }}
                />

                {isPurchaseReport && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      hanldeReportID(data.reportID);
                    }}
                  >
                    Search
                  </Button>
                )}
              </div> */}
                    <div className={style.dateSearch}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(date) => {
                            pickStartDate(date);
                          }}
                          renderInput={(params) => {
                            return (
                              <TextField
                                size="small"
                                variant="outlined"
                                {...params}
                              />
                            );
                          }}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        className={style.datePicker}
                        label="End Date"
                      >
                        <DatePicker
                          label="End Date"
                          value={endDate}
                          size="small"
                          onChange={(date) => {
                            pickEndDate(date);
                          }}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              variant="outlined"
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          {
                            !isPurchaseReport && hanldeReportID(data.reportID);
                          }
                          setSendDate((prev) => !prev);
                        }}
                        className={style.dateSearchBtn}
                        sx={{ width: "400px" }}
                      >
                        {isPurchaseReport ? "Search Date" : "Search"}
                      </Button>
                    </div>

                    <Box sx={{ width: "200px" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Duration
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={duration}
                          label="Duration"
                          onChange={(e) => {
                            handleDurationChange(e.target.value);
                          }}
                        >
                          <MenuItem value={"all"}>All</MenuItem>
                          <MenuItem value={"today"}>Today</MenuItem>
                          <MenuItem value={"thisWeek"}>This Week</MenuItem>
                          <MenuItem value={"thisMonth"}>This Month</MenuItem>
                          <MenuItem value={"thisYear"}>This Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {!isPurchaseReport && (
                      <Box sx={{ width: "200px" }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchRawaGramiPcs}
                            label="Type"
                            onChange={(e) => {
                              handleSearchTypeChange(e.target.value);
                            }}
                          >
                            <MenuItem value={"pcs"}>PCS</MenuItem>
                            <MenuItem value={"rawa"}>Rawa</MenuItem>
                            <MenuItem value={"grami"}>Grami</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                    <div>
                      <RadioGroup
                        name="userOptions"
                        value={selectedOption}
                        onChange={handleSwitchChange}
                        row
                      >
                        <FormControlLabel
                          value="Active Records"
                          control={<Radio />}
                          label="Active Records"
                          sx={{ color: "blue" }}
                        />
                        <FormControlLabel
                          value="Deleted Records"
                          control={<Radio />}
                          label="Deleted Records"
                          sx={{ color: "red" }}
                        />
                      </RadioGroup>
                    </div>
                    {/* <FormControlLabel
                control={
                  <Switch onChange={handleSwitchChange} checked={checked} />
                }
                label="Deleted Records"
              /> */}
                    <Button
                      variant="contained"
                      size=""
                      onClick={() => {
                        setSendDate((prev) => !prev);
                        setData({
                          reportID: "",
                        });
                        hanldeReportID("undefined");
                        setStartDate(null);
                        setEndDate(null);
                        setDuration("");
                        setSearchRawaGramiPcs("");
                      }}
                      className={style.resetBtn}
                    >
                      Reset
                    </Button>
                  </div>
                  <Box sx={{ width: "100%", margin: "0 auto" }}>
                    {isPurchaseReport ? (
                      <TableComponent
                        props={{
                          data: formdataArray,
                          columns: columnsForPurchaseReport,
                          action: actionsForPurchaseReport,
                          label: "Purchase Report",
                          checked: checkedforActions,
                          handleChildButtonClick:
                            handleChildButtonClickForPurchaseReport,
                          handlePrint: handlePrintPurchase,
                        }}
                      />
                    ) : (
                      <TableComponent
                        props={{
                          data: formdataArray,
                          columns: columnsForTradeReport,
                          action: actionsForTradeReport,
                          handleChildButtonClick:
                            handleChildButtonClickForTradeReport,
                          handlePrint: handlePrintTrade,
                        }}
                      />
                    )}
                  </Box>
                </div>
              ) : (
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Not allowed By Admin
                </h1>
              )
            ) : (
              <div className={style.spinner}>
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
              </div>
            )}
          </div>
          <Calculations
            pageNumber={pageNumber}
            startDate={startDate}
            endDate={endDate}
            reportID={reportID}
            date={date}
            checked={checked}
            props={{
              // for purchase
              cash,
              pureWeight,
              originalPond,
              finalPond,
              mail,

              // for Trade
              goldBought,
              cashPaid,
              goldSold,
              cashRecieved,
              pcsGoldBought,
              pcsCashPaid,
              pcsGoldSold,
              pcsCashRecieved,
              rawaGoldBought,
              rawaCashPaid,
              rawaGoldSold,
              rawaCashRecieved,
              gramiGoldBought,
              gramiCashPaid,
              gramiGoldSold,
              gramiCashRecieved,
            }}
          />
        </div>
      </Box>
      {/* <Box
        sx={{
          position: "absolute",
          width: "85%",
          margin: "0 auto",
          bottom: "10px",
        }}
      ></Box> */}
    </Box>
  );
};

export default Reports;
