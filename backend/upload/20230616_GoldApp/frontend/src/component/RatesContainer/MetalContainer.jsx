import React, { useState, useEffect } from "react";

//for material ui DropDown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TableComponentId from "../tableComponent/tableComponentId";

//for importing css files
import "./RatesContainer.css";

let page = "Metal";
let decimalPoints = 2;

const MetalContainer = ({ data, update }) => {
  // console.log(data);
  const [baseCurrency, setBaseCurrency] = useState(1);
  const [currenciesForMap, setCurrenciesForMap] = useState([]);

  useEffect(() => {
    // Extracting symbols and values into a single array
    const symbolValuePairs = data.map((item, index) => ({
      symbol: item.symbol,
      value: item.normal,
    }));
    setCurrenciesForMap(symbolValuePairs);
  }, [data]);

  const columns = [
    { field: "displayName", label: "Instrument" },
    { field: "data.bid", label: "BID" },
    { field: "data.ask", label: "ASK" },
    {
      field: "data",
      label: "Low/High",
      format: "lowHigh",
      render: (item) => `${item.data.low} </br> ${item.data.high}`,
    },
  ];

  // const handleChange = (event) => {
  //   // console.log(event.target.value);
  //   setBaseCurrency(event.target.value);
  // };

  return (
    <div className="ratesMainContainer">
      <div>
        <h1 className="headingContainers">Metals</h1>
      </div>
      <div className="outerContainer">
        <div className="containerHeaderMetal">
          <div></div>
          <div>
            <h3>{update}</h3>
          </div>
        </div>
        <div className="mainContainerBoxMetal">
          <TableComponentId
            data={data}
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

export default MetalContainer;
