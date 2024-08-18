import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import PageLoader from "../../component/PageLoader/PageLoader.jsx";
import "./Graph.css";

//for material ui DropDown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { historyRates } from "../../actions/historyRates";
import { getGlobalRatesDetails } from "../../actions/ratesMetalAction.jsx";

// Updated data array
const dataa = {
  success: true,
  base: "USD",
  start_date: "2023-12-01",
  end_date: "2023-12-04",
  rates: {
    "2023-12-01": {
      XAU: 0.00048983,
    },
    "2023-12-02": {
      XAU: 0.00048269,
    },
    "2023-12-03": {
      XAU: 0.00048268,
    },
    "2023-12-04": {
      XAU: 0.00047949,
    },
    "2023-12-05": {
      XAU: 0.00047949,
    },
    "2023-12-06": {
      XAU: 0.00047949,
    },
    "2023-12-07": {
      XAU: 0.00047949,
    },
  },
};

const Graph = () => {
  const [filterGraphData, setFilterGraphData] = useState("thisYear");
  const [currencyDropDown, setCurrencyDropDown] = useState("USD");
  const [currencyPKR, setCurrencyPKR] = useState();
  const [metalDropDown, setMetalDropDown] = useState("XAU");
  const [historyDataRates, setHistoryDataRates] = useState();
  const [dates, setDates] = useState();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setFilterGraphData("thisYear");
    getGlobalRates();
    getHistoryData();
  }, []);
  const getHistoryData = async () => {
    const data = await historyRates("thisYear");
    setHistoryDataRates(data);
    setDates(`From:${data.start_date} To:${data.end_date}`);
    setRates(data.rates);
    setLoading(true);
    console.log("====================================");
    data.rates.map((value, key) => console.log(value.key, value.XAG)),
      console.log("====================================");
  };
  const getGlobalRates = async () => {
    let data = await getGlobalRatesDetails();
    const currencyData = Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => key === "PakistaniRupee_Currency_PKR"
      )
    );
    console.log("====================================");
    console.log(currencyData.PakistaniRupee_Currency_PKR);
    console.log("====================================");
    setCurrencyPKR(currencyData.PakistaniRupee_Currency_PKR);
  };

  const options = {
    animationEnabled: true,
    title: {
      text: `${metalDropDown === "XAU" ? "Gold" : "Silver"} Rates ( ${dates})`,
      fontSize: 17,
    },
    axisX: {
      valueFormatString: "DD MMM", // Format for daily
    },
    axisY: {
      title: `Rate (in ${currencyDropDown})`,
      prefix: currencyDropDown === "USD" ? "$" : "Rs.",
    },
    data: [
      {
        yValueFormatString: `${
          currencyDropDown === "USD" ? "$#####" : "Rs.#####"
        }`,
        xValueFormatString: "DD MMM",
        type: "spline",
        dataPoints: rates.map((value, key) => ({
          x: new Date(value.key),
          y:
            currencyPKR && currencyDropDown === "PKR"
              ? metalDropDown === "XAU"
                ? currencyPKR / value.XAU
                : currencyPKR / value.XAG
              : metalDropDown === "XAU"
              ? 1 / value.XAU
              : 1 / value.XAG,
        })),
        // dataPoints: Object.entries(dataa.rates).map(([date, rate]) => ({
        //   x: new Date(date),
        //   y: 1 / rate.XAU,
        // })),
      },
    ],
  };

  const handleChangeFiltered = async (event) => {
    console.log(event.target.value);
    setFilterGraphData(event.target.value);
    const data = await historyRates(event.target.value);
    setDates(`From:${data.start_date} To:${data.end_date}`);
    setHistoryDataRates(data);
    setRates(data.rates);
  };
  const handleCurrencyChange = async (event) => {
    console.log(event.target.value);
    setCurrencyDropDown(event.target.value);
  };
  const handleMetalChange = async (event) => {
    console.log(event.target.value);
    setMetalDropDown(event.target.value);
  };

  return (
    <>
      {loading ? (
        <div className="graphContainer">
          <div className="graph">
            <CanvasJSChart options={options} />
          </div>
          {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}

          {/* For Duration Filter */}
          <div className="dropDownsFilter">
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 150,
                color: "white",
                borderBottom: "2px solid white",
              }}
              size="small"
            >
              <InputLabel
                id="demo-select-small-label"
                style={{ color: "white", fontFamily: "Roboto" }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filterGraphData}
                label="USD"
                onChange={handleChangeFiltered}
                style={{ color: "Black", fontFamily: "Roboto" }}
              >
                <MenuItem value="thisMonth">This Month</MenuItem>
                <MenuItem value="lastMonth">Last Month</MenuItem>
                <MenuItem value="last3Months">Last 3 Month</MenuItem>
                <MenuItem value="last6Months">Last 6 Month</MenuItem>
                <MenuItem value="last9Months">Last 9 Months</MenuItem>
                <MenuItem value="thisYear">This Year</MenuItem>
              </Select>
            </FormControl>

            {/* For Currency Change */}
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 150,
                color: "white",
                borderBottom: "2px solid white",
              }}
              size="small"
            >
              <InputLabel
                id="demo-select-small-label"
                style={{ color: "white", fontFamily: "Roboto" }}
              >
                Currency
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currencyDropDown}
                onChange={handleCurrencyChange}
                style={{ color: "Black", fontFamily: "Roboto" }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="PKR">PKR</MenuItem>
              </Select>
            </FormControl>

            {/* For Metal Change */}
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 150,
                color: "white",
                borderBottom: "2px solid white",
              }}
              size="small"
            >
              <InputLabel
                id="demo-select-small-label"
                style={{ color: "white", fontFamily: "Roboto" }}
              >
                Metal
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={metalDropDown}
                label="USD"
                onChange={handleMetalChange}
                style={{ color: "Black", fontFamily: "Roboto" }}
              >
                <MenuItem value="XAU">Gold</MenuItem>
                <MenuItem value="XAG">Silver</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default Graph;
