import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./Table.css";
const TableComponentId = ({
  data,
  columns,
  baseCurrency,
  pages,
  fixedPoints,
}) => {
  // console.log("====================================");
  // console.log(data);
  // console.log("====================================");
  // State variables for sorting
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  // State variable to track the update count
  const [updateCount, setUpdateCount] = useState(0);
  const navigate = useNavigate();

  // Function to handle the dynamic update every five seconds
  const dynamicUpdate = () => {
    setUpdateCount((prevCount) => prevCount + 1);

    // Logic to alternate between incrementing and decrementing
    // const updateValue = updateCount % 2 === 0 ? 0.05 : -0.05;
    const randomIndex = Math.floor(Math.random() * 148); // Generates a random integer between 0 and 147 (inclusive)

    // console.log("====================================");
    // console.log(randomIndex);
    // console.log(data[randomIndex]);
    // console.log("====================================");
    let addedValue;
    data[randomIndex]?.addedValue === 0.000005
      ? (addedValue = -0.000005)
      : (addedValue = 0.000005);
    data[randomIndex].normal += addedValue;
    data[randomIndex] = { ...data[randomIndex], addedValue };

    // console.log("====================================");
    // console.log(typeof data[randomIndex]);
    // console.log("====================================");

    // // Update the data with the new values
    // const updatedData = data.map((item) => {
    //   // Assuming you have a field named "value" that needs to be updated
    //   if (item.normal) {
    //     item.normal += updateValue;
    //   }
    //   return item;
    // });

    // Update the state with the new data
    // This will trigger a re-render with the updated values
    // setData(updatedData);
    // data = updatedData;
  };
  const dynamicUpdateLocal = () => {
    setUpdateCount((prevCount) => prevCount + 1);
    const randomIndex = Math.floor(Math.random() * 2); // Generates either 0 or 1
    const randomIndex2 = Math.floor(Math.random() * 2); // Generates either 0 or 1

    // console.log("====================================");
    // console.log(randomIndex);
    // console.log(randomIndex2);
    // console.log(data[randomIndex]);
    // console.log("====================================");
    if (randomIndex2 === 0) {
      let addedSale;
      data[randomIndex]?.addedSale === 5 ? (addedSale = -5) : (addedSale = 5);
      data[randomIndex].data.sale += addedSale;
      data[randomIndex] = { ...data[randomIndex], addedSale };
    } else {
      let addedPurchase;
      data[randomIndex]?.addedPurchase === 5
        ? (addedPurchase = -5)
        : (addedPurchase = 5);
      data[randomIndex].data.purchase += addedPurchase;
      data[randomIndex] = { ...data[randomIndex], addedPurchase };
    }

    // console.log("====================================");
    // console.log(typeof data[randomIndex]);
    // console.log("====================================");
  };
  const dynamicUpdateMetal = () => {
    setUpdateCount((prevCount) => prevCount + 1);

    // Logic to alternate between incrementing and decrementing
    // const updateValue = updateCount % 2 === 0 ? 0.05 : -0.05;
    const randomIndex = Math.floor(Math.random() * 6); // Generates a random integer between 0 and 147 (inclusive)
    const randomIndex2 = Math.floor(Math.random() * 2); // Generates either 0 or 1

    console.log("====================================");
    console.log(randomIndex);
    console.log(randomIndex2);
    console.log(data[randomIndex]);
    console.log("====================================");
    if (randomIndex2 === 0) {
      console.log("====================================");
      console.log(typeof data[randomIndex].data.ask);
      console.log("====================================");
      let addedASK;
      data[randomIndex]?.addedASK === 0.00000005
        ? (addedASK = -0.00000005)
        : (addedASK = 0.00000005);
      data[randomIndex].data.ask =
        parseFloat(data[randomIndex].data.ask) + addedASK;
      data[randomIndex] = { ...data[randomIndex], addedASK };
    } else {
      console.log("====================================");
      console.log(typeof data[randomIndex].data.bid);
      console.log("====================================");
      let addedBID;
      data[randomIndex]?.addedBID === 0.00000005
        ? (addedBID = -0.00000005)
        : (addedBID = 0.00000005);
      data[randomIndex].data.bid =
        parseFloat(data[randomIndex].data.bid) + addedBID;
      data[randomIndex] = { ...data[randomIndex], addedBID };
    }

    console.log("====================================");
    console.log(data[randomIndex]);
    console.log("====================================");
  };

  // Set up the interval to call dynamicUpdate every 5 seconds
  useEffect(() => {
    let intervalId;
    pages === "Currency" && (intervalId = setInterval(dynamicUpdate, 5000));
    pages === "Metal" && (intervalId = setInterval(dynamicUpdateMetal, 5000));
    pages === "localRates" &&
      (intervalId = setInterval(dynamicUpdateLocal, 5000));

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [updateCount]); // Depend on updateCount to re-run the effect when it changes

  // Function to handle sorting
  const handleSort = (field) => {
    if (field === sortedColumn) {
      // If the clicked column is already sorted, toggle the direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the sorted column with ascending direction
      setSortedColumn(field);
      setSortDirection("asc");
    }
  };

  let currentIndex = 0;

  const renderCellValue = (item, field) => {
    const fieldKeys = field.split(".");

    return fieldKeys?.reduce((obj, key) => (obj ? obj[key] : ""), item);
  };
  // Sorting logic
  const sortedData = data?.slice().sort((a, b) => {
    if (!sortedColumn) return 0;

    const sortOrder = sortDirection === "asc" ? 1 : -1;
    const aField = renderCellValue(a, sortedColumn);
    const bField = renderCellValue(b, sortedColumn);

    if (aField < bField) return -1 * sortOrder;
    if (aField > bField) return 1 * sortOrder;
    return 0;
  });

  const getColumnValue = (item, field, format, render, baseCurrency, label) => {
    if (field === "data") {
      // Handle the "data" field with "lowHigh" format
      const low = baseCurrency
        ? (baseCurrency / item.data.low)?.toFixed(fixedPoints)
        : item.data.low?.toFixed(fixedPoints);
      const high = baseCurrency
        ? (baseCurrency / item.data.high)?.toFixed(fixedPoints)
        : item.data.high?.toFixed(fixedPoints);
      // return `${low} \n ${high}`;
      return (
        <div>
          {low}
          <br /> {high}
        </div>
      );
    } else if (format === "date" || format === "time" || format === "bool") {
      return renderDateValue(item, field, format);
    } else if (field.includes(".")) {
      // Handle nested fields
      const nestedFields = field.split(".");
      let value = item;
      for (const nestedField of nestedFields) {
        if (value && value.hasOwnProperty(nestedField)) {
          value = value[nestedField];
        } else {
          value = ""; // Handle the case where a nested field is missing
          break;
        }
      }
      return baseCurrency
        ? (baseCurrency / value)?.toFixed(fixedPoints)
        : value;
    } else if (field === "normal" && label != "ASK") {
      // Divide the "normal" value by the baseCurrency
      return baseCurrency
        ? (baseCurrency / item[field])?.toFixed(fixedPoints)
        : item[field]?.toFixed(fixedPoints);
    } else if (label === "ASK" && pages === "Currency") {
      // console.log(field);
      // Adjust the "ASK" value for the "currency" page
      const adjustedAsk = baseCurrency
        ? (baseCurrency / item[field] + 0.05)?.toFixed(fixedPoints)
        : (item[field] + 0.05)?.toFixed(fixedPoints);
      return adjustedAsk;
    } else {
      return item[field];
    }
  };

  // Function to render date values using moment.js
  const renderDateValue = (item, field, format) => {
    const value = renderCellValue(item, field);
    // console.log(value);

    //for converting bool value into string ..just for dispalying into table
    if (format === "bool") {
      return value && value.toLocaleString();
    }

    if (format === "time") {
      // console.log("time");
      return value ? new Date(value).toLocaleTimeString() : "";
    }
    if (format === "date") {
      // console.log("date");
      return value ? new Date(value).toLocaleDateString("en-GB") : "";
    }

    return value;
  };

  // const classes = useStyles();

  return (
    <>
      {/* <div className="tableComponent"> */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%", zIndex: "1" }}
        id="style-13"
      >
        {sortedData && sortedData?.length > 0 ? (
          <Table
            sx={{ height: "100%", zIndex: "1" }}
            size="small"
            ariel-label="a dense table"
            // className={classes.cell}
            className={`customTable`}
            stickyHeader
          >
            <TableHead>
              <TableRow className="tableHead" align={"center"}>
                {/* <TableCell className="tableHead" align={"center"}>
                  {"sNo"}
                </TableCell> */}
                {columns?.map((column, index) => (
                  <TableCell
                    className="tableHead "
                    align={"center"}
                    key={index}
                    // style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.label}
                    {sortedColumn === column.field && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData?.map((item, index) => (
                <TableRow
                  key={index}
                  className={` ${index % 2 === 0 ? "evenRow" : "oddRow"} `}
                >
                  {/* <TableCell
                    align={"center"}
                    className={index % 2 === 0 ? "evenRow" : "oddRow"}
                  >
                    {++currentIndex}
                  </TableCell> */}
                  {columns?.map((column, index) => (
                    <TableCell
                      align="center"
                      className={` border-Right ${
                        ["BID", "ASK", "Sale", "Purchase"].includes(
                          column.label
                        )
                          ? "bidAskColumn"
                          : ""
                      }`}
                      key={index}
                    >
                      <div className="textClip tableCellContent">
                        {["BID", "ASK", "Sale", "Purchase"].includes(
                          column.label
                        ) &&
                        ((["BID", "ASK"].includes(column.label) &&
                          item.addedValue === -0.000005) ||
                          (item.addedPurchase === -5 &&
                            column.label === "Purchase") ||
                          (item.addedSale === -5 && column.label === "Sale") ||
                          (item.addedASK === -0.00000005 &&
                            column.label === "ASK") ||
                          (item.addedBID === -0.00000005 &&
                            column.label === "BID")) ? (
                          <ArrowDownwardIcon style={{ fill: "red" }} />
                        ) : (["BID", "ASK"].includes(column.label) &&
                            item.addedValue === 0.000005) ||
                          (item.addedPurchase === 5 &&
                            column.label === "Purchase") ||
                          (item.addedSale === 5 && column.label === "Sale") ||
                          (item.addedASK === 0.00000005 &&
                            column.label === "ASK") ||
                          (item.addedBID === 0.00000005 &&
                            column.label === "BID") ? (
                          <ArrowUpwardIcon style={{ fill: "green" }} />
                        ) : (
                          ["BID", "ASK", "Sale", "Purchase"].includes(
                            column.label
                          ) && (
                            <ArrowUpwardIcon style={{ fill: "transparent" }} />
                          )
                        )}
                        {getColumnValue(
                          item,
                          column.field,
                          column.format,
                          column.render,
                          baseCurrency,
                          column.label
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>No record found.</div>
        )}
      </TableContainer>
    </>
  );
};

export default TableComponentId;
