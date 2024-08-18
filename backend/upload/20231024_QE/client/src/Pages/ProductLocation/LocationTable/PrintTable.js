import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, Tab } from "semantic-ui-react";
// import { Table, Button, Tab } from "semantic-ui-react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./printDiv.css"

import { useTranslation, initReactI18next } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";


// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Button,
// } from "@mui/material";
let totalPages=[];
let pageNo=1;
const useStyles = makeStyles({
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 10px", // Adjust the spacing between rows
  },
  cell: {
    border: "1px solid #707070", // Adjust the color as needed// Adjust the padding as needed
  },
  row: {
    borderBottom: "none", // Remove the bottom border
  },
  oddRow: {
    backgroundColor: "#FBF4F4", // Set the background color for odd rows
  },
  evenRow: {
    backgroundColor: "white", // Set the background color for even rows
  },
  tableHead: {
    fontSize: "12px",
    fontFamily: "Poppins, sans-serif", // Set the font size for the table header
    fontWeight: "400", // Set the font weight (500 for medium)
    color: "#393939", // Set the text color for the table header
  },
  tableRow: {
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif", // Set the font size for the table header     // Set the font weight (500 for medium)
    color: "#393939", // Set the text color for the table header
  },
});
const PrintTable = ({
  data,
  columns,
  actions,
  pageNumber

}) => {
  let lengthOfData = columns?.length;
  if (actions) {
    // let lengthOfAction = actions.length;
    // lengthOfData = lengthOfData + lengthOfAction;
    lengthOfData = lengthOfData;
  }
  // console.log(lengthOfData);
  // console.warn(action3);
  // console.warn(actionUpdate);

  // console.log(data);
  if(data?.length > 25){
  let itemsPerPage = 25; 
 totalPages = Math.ceil(data?.length / itemsPerPage);
  } else{
    let itemsPerPage = 22; 
    totalPages = Math.ceil(data?.length / itemsPerPage);
  }
  const { t, i18n } = useTranslation();


  // State variables for sorting
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  // console.log(locationsetid);
  // console.log(data);
  let currentIndex = 0;


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
  const renderCellValue = (item, field) => {
    const fieldKeys = field.split(".");

    return fieldKeys?.reduce((obj, key) => (obj ? obj[key] : ""), item);
  };
  console.log(data);
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

  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        marginTop: "10px",
        zIndex: "2",
        // height: "40vh",
      }}
    >
      {sortedData && sortedData?.length > 0 ? (
        <Table
          celled
          columns={lengthOfData}
          striped
          sortable
          selectable
          className="my-table"
          // className="bg-gray-100"
          style={{ margin: "0", zIndex: "2",width:"100%",  }}
        >
          <Table.Header className="HeaderStyle"   style={{ backgroundColor: "lightgray", }} >
            <Table.Row
              // className="font-bold text-center HeaderStyle"
              style={{   backgroundColor: "lightgray",
              border: '1px solid black',
              textAlign: 'center',
            padding: "0px",
          textSize:  "14px"}}
              // style={styles.tableHeader}
            >
              <Table.HeaderCell className="Hello" style={{ backgroundColor: "lightgray", width: "15px", fontSize: "12px",  border: '1px solid black' }}>
                {t("sNo")}
              </Table.HeaderCell>
              {columns?.map((column) => (
                <Table.HeaderCell
                  key={column.field}
                  className="HeaderStyle"
                  style={{backgroundColor: "lightgray", whiteSpace: "nowrap", fontSize: "12px",  border: '1px solid black' }}
                  onClick={() => handleSort(column.field)} // Attach the click event
                >
                  {/* Display sorting indicator based on the current sorting state */}
                  {column.label}
                  {sortedColumn === column.field && (
                    <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </Table.HeaderCell>
              ))}
              {actions && (
                <Table.HeaderCell className="HeaderStyle">
                  {t("actions")}
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body className=" text-center">
            {sortedData?.map((item, index) => (
              <Table.Row key={index} className="h-10">
                <Table.Cell className="Hello" style={{ width: "15px", fontSize: "12px",  border: '1px solid black'  }}>
                  {++currentIndex}
                </Table.Cell>
                {columns?.map((column) => (
                  <Table.Cell
                    key={column.Code}
                    className="Hello"
                    // style={{ textAlign: "left" }}
                    style={{ width: "15px", fontSize: "12px",  border: '1px solid black'  }}
                  >
                    {column.format === "date" ||
                    column.format === "time" ||
                    column.format === "bool"
                      ? renderDateValue(item, column.field, column.format)
                      : renderCellValue(item, column.field, column.format)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
          <tfoot className="table-footer">

            <tr >
                <td style={{padding: "-100px"}}></td>
                <td>Printed on</td>
                  <td>{`${new Date().toLocaleDateString()},`}</td>
                   <td style={{whiteSpace: "nowrap", marginLeft: "-10px"}}>{`${new Date().toLocaleTimeString()}`}</td>
                   {/* <td>page NO</td>
                   <td>{totalPages}</td> */}
            </tr>

                {/* <tr>
                  <td></td>
                  <td>Printed on</td>
                  <td>{`${new Date().toLocaleDateString()},`}</td>
                   <td style={{whiteSpace: "nowrap", marginLeft: "-10px"}}>{`${new Date().toLocaleTimeString()}`}</td>
                   <td>page NO</td>
                   <td>{pageNumber}</td>
               
              
                </tr> */}
            </tfoot>
          {/* //Footer For SalesConsolidated Invoice// */}

         
        </Table>
      ) : (
        <div>No record found.</div>
      )}
      {/* <PageFooter /> */}
    </div>
  );
};

export default PrintTable;
