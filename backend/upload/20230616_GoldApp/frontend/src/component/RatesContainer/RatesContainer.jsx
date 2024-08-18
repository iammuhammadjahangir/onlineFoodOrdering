import React, { useState, useEffect } from "react";

//for material ui DropDown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TableComponentId from "../tableComponent/tableComponentId";

//for importing css files
import "./RatesContainer.css";

let page = "Currency";
let decimalPoints = 5;
const RatesContainer = ({ data, update }) => {
  console.log(data);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseCurrencyName, setBaseCurrencyName] = useState("USD");
  const [filteredDropDown, setFilteredDropDown] = useState(1);
  const [currenciesForMap, setCurrenciesForMap] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Extracting symbols and values into a single array
    setFilteredData(data);
    const symbolValuePairs = data.map((item, index) => ({
      symbol: item.symbol,
      value: item.normal,
    }));
    // const usd = {
    //   symbol: "USD",
    //   value: 1,
    // };
    // symbolValuePairs.push(usd);
    setCurrenciesForMap(symbolValuePairs);
  }, [data]);

  const columns = [
    { field: "displayName", label: "Instrument" },
    { field: "normal", label: "BID" },
    { field: "normal", label: "ASK" },
    {
      field: "data",
      label: "Low/High",
      format: "lowHigh",
      render: (item) => `${item.data.low} </br> ${item.data.high}`,
    },
  ];

  const handleChange = (event) => {
    console.log(event.target.value.value);
    console.log(event.target.value.symbol);
    setBaseCurrency(event.target.value.value);
    setBaseCurrencyName(event.target.value.symbol);
    // if (event.target.value.symbol != "USD") {
    // }
  };
  const handleChangeFiltered = (event) => {
    // console.log(event.target.value);
    setFilteredDropDown(event.target.value);
    if (event.target.value === 1) {
      setFilteredData(data);
    } else if (event.target.value === 2) {
      const filtered = data.filter(
        (values) =>
          values.displayName === "USD (USDDollar)" ||
          values.displayName === "PKR (PakistaniRupee)" ||
          values.displayName === "GBP (PoundSterling)" ||
          values.displayName === "EUR (EuropeanEuro)" ||
          values.displayName === "MYR (MalaysianRinggit)" ||
          values.displayName === "SAR (SaudiArabianRiyal)" ||
          values.displayName === "AED (UAEDirham)"
      );
      console.log("====================================");
      console.log(filtered);
      console.log("====================================");
      setFilteredData(filtered);
    }
  };

  return (
    <div className="ratesMainContainer">
      <div>
        <h1 className="headingContainers">
          currency {`(${baseCurrencyName})`}
        </h1>
      </div>
      <div className="outerContainer">
        <div className="containerHeader">
          <FormControl
            variant="standard"
            sx={{
              m: 1,
              color: "white",
              borderBottom: "2px solid white",
            }}
            className="dropDownWidth"
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
              value={filteredDropDown}
              label="USD"
              onChange={handleChangeFiltered}
              style={{ color: "white", fontFamily: "Roboto" }}
            >
              <MenuItem value={1}>All</MenuItem>
              <MenuItem value={2}>Top 7 Currencies</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{
              m: 1,
              color: "white",
              borderBottom: "2px solid white",
            }}
            className="dropDownWidth"
            size="small"
          >
            <InputLabel
              id="demo-select-small-label"
              style={{ color: "white", fontFamily: "Roboto" }}
            >
              Base Currency
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={baseCurrency}
              label="USD"
              onChange={handleChange}
              name="baseCurrency"
              style={{ color: "white", fontFamily: "Roboto" }}
            >
              {currenciesForMap.map((data, index) => (
                <MenuItem key={index} value={data}>
                  {data.symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <h3>{update}</h3>
          </div>
        </div>
        <div className="mainContainerBox">
          <TableComponentId
            data={filteredData}
            columns={columns}
            baseCurrency={baseCurrency}
            pages={page}
            fixedPoints={decimalPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default RatesContainer;
