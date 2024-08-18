//For Material Ui Table
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import { makeStyles } from "@material-ui/styles";

import "./TableComponent.css";

import { useParams, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 10px", // Adjust the spacing between rows
  },
  cell: {
    borderRight: "1px solid #707070", // Adjust the color as needed
    padding: "-10px", // Adjust the padding as needed
    margin: "auto auto",
  },
  // row: {
  //   borderBottom: "none", // Remove the bottom border
  // },
  oddRow: {
    backgroundColor: "#FBF4F4", // Set the background color for odd rows
  },
  evenRow: {
    backgroundColor: "white", // Set the background color for even rows
  },
  tableHead: {
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif", // Set the font size for the table header
    fontWeight: "550", // Set the font weight (500 for medium)
    color: "#393939", // Set the text color for the table header
  },
  tableRow: {
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif", // Set the font size for the table header     // Set the font weight (500 for medium)
    color: "#393939", // Set the text color for the table header
  },
});
const TableComponent = ({ props }) => {
  // console.log(props.data);
  const navigate = useNavigate();

  //For Setting Properties of Material Ui Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //handle page No inCase of Changing to ne Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //HandleChangeRows of Per Page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //for converting bool value into string ..just for dispalying into table
  const renderDateValue = (item, field, format) => {
    //for setting the bool status of the customer
    if (format === "bool") {
      // console.log(item.value);
      // console.log(item);
      // console.log(item.deletedStatus);
      return item.deletedStatus === true ? "In-Active" : "Active";
    }

    //for setting Date to Localate String
    if (format === "date") {
      // console.log("date");
      return item.createdAt
        ? new Date(item.createdAt).toLocaleString("en-GB")
        : "";
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
      padding: "5px 0px",
      margin: "0px",
      width: "auto",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "3px",
      margin: "0px",
      width: "auto",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#d3d3d3",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const StyledFooterCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.footer}`]: {
      fontSize: 14,
      color: theme.palette.common.white,
      fontWeight: "bold",
      padding: "5px 10px",

      margin: "0px",
      width: "auto",
    },
  }));

  const StyledFooterRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "#ececec",
  }));

  // Add a new function to your TableComponent to generate the full name
  const generateFullName = (row) => {
    return `${row.customer.firstName} ${row.customer.lastName}`;
  };

  const renderCellValue = (item, field) => {
    const fieldKeys = field.split(".");

    if (field === "customer.firstName + customer.lastName") {
      return generateFullName(item);
    }
    return fieldKeys.reduce((obj, key) => (obj ? obj[key] : ""), item);
  };
  const classes = useStyles();

  return (
    <Paper
      sx={{
        margin: "0 auto",
        width: "100%",
        overflowX: "auto",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;",
      }}
    >
      <TableContainer sx={{ maxHeight: "400px", zIndex: "1" }}>
        <Table
          stickyHeader
          size="small"
          ariel-label="a dense table"
          sx={{ minWidth: 650, zIndex: "1" }}
        >
          <TableHead
            className={`${classes.tableHead} customTableHead`}
            style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
          >
            <TableRow>
              {props.columns?.map((column, index) => (
                <TableCell
                  key={index}
                  className={` ${classes.row} ${classes.tableHead} customTableHead`}
                  style={{
                    backgroundColor: "#ECECEC",
                    zIndex: "1",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                  // align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {props.action && (
                <TableCell
                  key={props.action.id}
                  // align={props.action.align}
                  // style={{ minWidth: props.action.minWidth }}
                  // className="HeaderStyle"
                  className={` ${classes.row} ${classes.tableHead} customTableHead`}
                  style={{
                    backgroundColor: "#ECECEC",
                    zIndex: "1",
                    whiteSpace: "nowrap",
                    width: "75px",
                    textAlign: "center",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props?.data.length > 0 ? (
                props.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        className={
                          index % 2 === 0 ? classes.evenRow : classes.oddRow
                        }
                      >
                        {props.columns.map((column, index) => {
                          // console.log(column.id);
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={index}
                              // align={column.align}
                              className={`${classes.cell} ${classes.row} column-borde`}
                              style={{ padding: "10px" }}
                              sx={{
                                padding: "8px",
                                textAlign: "left",
                                textAlign: "left",
                              }}
                            >
                              {/* //For checking each column value has date or Bool for
                          conversion */}
                              {column?.format === "date" ||
                              column?.format === "bool"
                                ? renderDateValue(
                                    row,
                                    column.field,
                                    column.format
                                  )
                                : column.format && typeof value === "number"
                                ? column.format(value)
                                : renderCellValue(row, column.id)}
                            </TableCell>
                          );
                        })}
                        {/* //For Setting Action Button */}
                        {props.action && (
                          <TableCell
                            align={"center"}
                            style={{
                              whiteSpace: "nowrap",
                              // width: "100px",
                              // paddingTop: "20px",
                            }}
                            className={`${classes.cell} ${classes.row} ${classes.tableRow} column-borde`}
                          >
                            {props.action?.map((actionData, index) => {
                              //for handling customer Data on button click
                              if (actionData.label === "Customer") {
                                return (
                                  <Button
                                    key={index}
                                    sx={{
                                      color: actionData.color,
                                      backgroundColor:
                                        actionData.backgroundColor,
                                      "&:hover": {
                                        backgroundColor: "#42a5f5", // Change the background color on hover
                                      },
                                      marginBottom: "5px",
                                    }}
                                    onClick={() => {
                                      props.handleChildButtonClick(row._id);
                                    }}
                                  >
                                    {actionData.id}
                                  </Button>
                                );
                              }

                              //For handling Purchase Report on Button Click
                              if (actionData.label === "Purchase Report") {
                                return (
                                  <Button
                                    className="buttonContainer"
                                    key={index}
                                    sx={{
                                      color: actionData.color,
                                      backgroundColor:
                                        actionData.backgroundColor,
                                      "&:hover": {
                                        backgroundColor: "#42a5f5", // Change the background color on hover
                                      },
                                      marginRight: "5px",
                                    }}
                                    onClick={() => {
                                      if (actionData.id === "Print") {
                                        props.handlePrint(row);
                                      } else {
                                        props.handleChildButtonClick(row._id);
                                      }
                                    }}
                                  >
                                    {actionData.id}
                                  </Button>
                                );
                              }

                              //For handling Trade Report on Button Click
                              if (actionData.label === "Trade Report") {
                                return (
                                  <Button
                                    key={index}
                                    sx={{
                                      color: actionData.color,
                                      backgroundColor:
                                        actionData.backgroundColor,
                                      "&:hover": {
                                        backgroundColor: "#42a5f5", // Change the background color on hover
                                      },
                                      marginRight: "5px",
                                    }}
                                    onClick={() => {
                                      if (actionData.id === "Print") {
                                        props.handlePrint(row);
                                      } else {
                                        props.handleChildButtonClick(row._id);
                                      }
                                    }}
                                  >
                                    {actionData.id}
                                  </Button>
                                );
                              }

                              //For handling User List on Button Click
                              if (actionData.label === "User List") {
                                // console.log("row._id");
                                // console.log(props.action);

                                return (
                                  <Button
                                    key={index}
                                    sx={{
                                      color: actionData.color,
                                      backgroundColor:
                                        actionData.backgroundColor,
                                      "&:hover": {
                                        backgroundColor: "#42a5f5", // Change the background color on hover
                                      },
                                      marginRight: "20px",
                                    }}
                                    onClick={() => {
                                      // console.log(actionData.id);
                                      // console.log(row.uniqueKey);
                                      if (actionData.id === "Allow") {
                                        props.allowButton(row.uniqueKey);
                                      }
                                      if (actionData.id === "Deny") {
                                        props.denyButton(row.uniqueKey);
                                      }
                                      if (actionData.id === "Change Role") {
                                        props.handleRoleChange(row);
                                      }
                                    }}
                                  >
                                    {actionData.id}
                                  </Button>
                                );
                              }

                              //For handling User List on Button Click
                              if (actionData.label === "DailyEntry") {
                                return (
                                  <Button
                                    key={index}
                                    sx={{
                                      color: actionData.color,
                                      backgroundColor:
                                        actionData.backgroundColor,
                                      "&:hover": {
                                        backgroundColor: "#42a5f5", // Change the background color on hover
                                      },
                                    }}
                                    onClick={() => {
                                      console.log("hello");
                                      props.updateButton(
                                        row._id,
                                        row.customer._id,
                                        row.customer,
                                        row
                                      );
                                    }}
                                  >
                                    {actionData.id}
                                  </Button>
                                );
                              }

                              //For handling change Permissions on Button Click
                              if (actionData.label === "Change Permission") {
                                return (
                                  <Button
                                    key={index}
                                    sx={{
                                      color: actionData.color,
                                      backgroundColor:
                                        actionData.backgroundColor,
                                      "&:hover": {
                                        backgroundColor: "#42a5f5", // Change the background color on hover
                                      },
                                    }}
                                    onClick={() => {
                                      console.log("hello");
                                      props.handleChangePermission(row);
                                    }}
                                  >
                                    {actionData.id}
                                  </Button>
                                );
                              }
                            })}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={props.columns.length + (props.action ? 1 : 0)}
                  >
                    No record Found
                  </StyledTableCell>
                </StyledTableRow>
              )

              // <Typography
              //   variant="h3"
              //   sx={{
              //     textAlign: "left",
              //     margin: "30px 0 0 0 ",
              //     height: "1000px",
              //   }}
              // >
              //   Unverified Users List
              // </Typography>
            }
          </TableBody>
          <TableFooter>
            {props?.footer?.length > 0 && props.footer === "totalDailyEntry" ? (
              <StyledFooterRow>
                <StyledFooterCell>Total</StyledFooterCell>
                <StyledFooterCell></StyledFooterCell>
                <StyledFooterCell></StyledFooterCell>
                <StyledFooterCell>{props.goldInSum}</StyledFooterCell>
                <StyledFooterCell>{props.goldOutSum}</StyledFooterCell>
                <StyledFooterCell>{props.cashInSum}</StyledFooterCell>
                <StyledFooterCell>{props.cashOutSum}</StyledFooterCell>
                <StyledFooterCell></StyledFooterCell>
                <StyledFooterCell></StyledFooterCell>
                <StyledFooterCell></StyledFooterCell>
              </StyledFooterRow>
            ) : null}
          </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props?.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
