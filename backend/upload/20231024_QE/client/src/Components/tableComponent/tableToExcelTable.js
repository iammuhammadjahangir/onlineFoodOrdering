import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// import { Table, Button, Tab } from "semantic-ui-react";
import "../../stylee/tableComponent.css";
import { useTranslation, initReactI18next } from "react-i18next";
import { tableState } from "./tableContext";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
let sortedData = [];
const useStyles = makeStyles({
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 10px", // Adjust the spacing between rows
  },
  cell: {
    borderRight: "1px solid #707070", // Adjust the color as needed
    padding: "-10px", // Adjust the padding as needed
  },
  row: {
    borderBottom: "none", // Remove the bottom border
  },
  oddRow: {
    backgroundColor: "#FBF4F4",
    // Set the background color for odd rows
  },
  evenRow: {
    backgroundColor: "white",
    // Set the background color for even rows
  },
  tableHead: {
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif", // Set the font size for the table header
    fontWeight: "550", // Set the font weight (500 for medium)
    color: "#393939", // Set the text color for the table header\
    whiteSpace: "nowrap",
  },
  tableRow: {
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif", // Set the font size for the table header     // Set the font weight (500 for medium)
    color: "#393939", // Set the text color for the table header
  },
  lastRowCell: {
    // Define the styles for cells in the last row here
    // For example, you can change the border or background color
    borderBottom: "2px solid red",
    borderRight: "1px solid #707070", // Adjust the border style and color
    // Add any other styles you want to apply to cells in the last row
  },
});
const TableToExcel = ({ data, columns, actions }) => {
  let lengthOfData = columns?.length;
  if (actions) {
    lengthOfData = lengthOfData;
  }
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);

  // State variables for sorting
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    user?.user?.tableRows?.noOfRows
  );

  useEffect(() => {
    setRowsPerPage(user?.user?.tableRows?.noOfRows);
  }, [user, loading, isAuthenticated]);

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
  useEffect(() => {
    setRowCount(data?.length);
  }, [data]);

  const renderCellValue = (item, field) => {
    // const fieldKeys = field.split(".");
    // return fieldKeys?.reduce((obj, key) => (obj ? obj[key] : ""), item);
  };
  console.log(data);
  // Sorting logic
  if (data?.length > 0) {
    if (data === "No Record Found") {
      console.log("No Record Found");
    } else {
      console.log(data);
      sortedData = data?.slice().sort((a, b) => {
        if (!sortedColumn) return 0;
        const sortOrder = sortDirection === "asc" ? 1 : -1;
        const aField = renderCellValue(a, sortedColumn);
        const bField = renderCellValue(b, sortedColumn);

        if (aField < bField) return -1 * sortOrder;
        if (aField > bField) return 1 * sortOrder;
        return 0;
      });
    }
  }

  const getColumnValue = (user, field, format, render) => {
    if (format === "date" || format === "time" || format === "bool") {
      return renderDateValue(user, field, format);
    } else if (field.includes(".")) {
      // Handle nested fields
      const nestedFields = field.split(".");
      let value = user;
      for (const nestedField of nestedFields) {
        if (value && value.hasOwnProperty(nestedField)) {
          value = value[nestedField];
        } else {
          value = ""; // Handle the case where a nested field is missing
          break;
        }
      }
      return value;
    } else {
      return user[field];
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

  const classes = useStyles();

  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="TablesRecord"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <div className="print-only-container">
        <div className="print-container">
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "600px", zIndex: "1" }}
          >
            {sortedData && sortedData?.length > 0 ? (
              <Table
                id="table-to-xls"
                sx={{ minWidth: 650, zIndex: "1" }}
                size="small"
                ariel-label="a dense table"
                className={classes.cell}
                stickyHeader
              >
                <TableHead
                  className={`${classes.tableHead} customTableHead`}
                  style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
                >
                  <TableRow>
                    {/* <TableCell
                  align={"center"}
                  className={` ${classes.row} ${classes.tableHead} customTableHead`}
                  style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
                >
                  {t("sNo")}
                </TableCell> */}
                    {columns?.map((column) => (
                      <TableCell
                        align={"center"}
                        className={` ${classes.row} ${classes.tableHead} customTableHead`}
                        style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
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
                  {data.map((item, index) => (
                    <TableRow
                      key={index}
                      className={` ${
                        index % 2 === 0 ? classes.evenRow : classes.oddRow
                      } ${classes.cell} ${classes.row}`}
                    >
                      {/* <TableCell
                      align={"center"}
                      className={index%2===0 ? (classes.cell): (classes.cell)}
                      style={{ padding: "10px" }}
                      sx={{ padding: "8px" }}
                    >
                      {++currentIndex}
                    </TableCell> */}
                      {columns?.map((column) => (
                        <TableCell
                          align="center"
                          className={`${classes.cell} ${classes.row} ${classes.tableRow} column-border`}
                          key={column.field}
                        >
                          {column.render
                            ? column.render(item)
                            : getColumnValue(
                                item,
                                column.field,
                                column.format,
                                column.render
                              )}
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
        </div>
      </div>
    </>
  );
};

export default TableToExcel;
