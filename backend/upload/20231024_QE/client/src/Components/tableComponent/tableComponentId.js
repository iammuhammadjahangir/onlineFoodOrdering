import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// import { Table, Button, Tab } from "semantic-ui-react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { State } from "../../purchaseRecipt/context/stateContext";
import { Statee } from "../../salesRecipt/context/stateContext";
import { Statte } from "./../../Transfer Recipt/context/stateContext";
import { Select, Modal, Message } from "semantic-ui-react";
// import "../../stylee/tableComponent.css";
import { getPermissionForRoles } from "../../Pages/user/rolesAssigned/RolesPermissionValidation";
import { useTranslation, initReactI18next } from "react-i18next";
import { tableState } from "./tableContext";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
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
import QrCodeIcon from "@mui/icons-material/QrCode";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import InventoryIcon from "@mui/icons-material/Inventory";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import "./Table.css";
const TableComponentId = ({
  data,
  columns,
  actions,
  linkk,
  link2,
  actionUpdate,
  action1,
  action3,
  pendings,
}) => {
  let lengthOfData = columns?.length;
  if (actions) {
    lengthOfData = lengthOfData;
  }
  const { showModal, setShowModal, locationsetid, listpurchase } =
    useContext(State);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { showModall, setShowModall } = useContext(Statte);
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);

  // State variables for sorting
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = React.useState(
    user?.user?.tableRows?.noOfRows
  );
  const navigate = useNavigate();

  //pagination
  const [page, setPage] = React.useState(0);

  const [permissionForUpdateProduct, setPermissionForUpdateProduct] =
    useState(false);
  const [permissionForDelete, setPermissionForDelete] = useState(false);

  useEffect(() => {
    setRowsPerPage(user?.user?.tableRows?.noOfRows);
  }, [user, loading, isAuthenticated]);

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

  const { setShowModaal } = useContext(Statee);
  let currentIndex = 0;
  useEffect(() => {
    setRowCount(data?.length);
  }, [data]);

  useEffect(() => {
    setPermissionForUpdateProduct(false);
    setPermissionForDelete(false);
    getPermission();
  }, []);

  async function getPermission() {
    try {
      const permission = await getPermissionForRoles("Update Records");
      setPermissionForUpdateProduct(permission);
      const permissionDelete = await getPermissionForRoles("Delete Records");
      setPermissionForDelete(permissionDelete);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  // const classes = useStyles();

  return (
    <>
      {/* <div className="tableComponent"> */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "600px", zIndex: "1" }}
      >
        {sortedData && sortedData?.length > 0 ? (
          <Table
            sx={{ minWidth: 650, zIndex: "1" }}
            size="small"
            ariel-label="a dense table"
            // className={classes.cell}
            className={`customTable`}
            stickyHeader
          >
            <TableHead>
              <TableRow className="tableHead" align={"center"}>
                <TableCell
                  className="tableHead"
                  align={"center"}
                  // style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
                >
                  {t("sNo")}
                </TableCell>
                {columns?.map((column) => (
                  <TableCell
                    className="tableHead"
                    align={"center"}
                    // style={{ backgroundColor: "#ECECEC", zIndex: "1" }}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.label}
                    {sortedColumn === column.field && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell
                    className="tableHead"
                    align={"center"}
                    // style={{ backgroundColor: "#ECECEC" }}
                  >
                    {t("actions")}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow
                    key={index}
                    className={` ${index % 2 === 0 ? "evenRow" : "oddRow"} `}
                  >
                    <TableCell
                      align={"center"}
                      className={index % 2 === 0 ? "evenRow" : "oddRow"}
                    >
                      {++currentIndex}
                    </TableCell>
                    {columns?.map((column) => (
                      <TableCell
                        align="center"
                        className="border-Right"
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
                        {/* {columnn.render ? columnn.render(item) : item[columnn.field]} */}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell
                        align={"center"}
                        className={` column-borde`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {actions?.map((action) => {
                          if (action.label === action3 && permissionForDelete) {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{
                                  backgroundColor: "#07B235",
                                  marginRight: "5px",
                                }}
                                // color={action.color}
                                onClick={() => actions[0].handler(item._id)}
                                // className="Hello3"
                              >
                                {t("delete")}&nbsp;
                                <DeleteIcon />
                              </Button>
                            );
                          }
                          if (action.label === pendings) {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{
                                  backgroundColor: "#07B235",
                                  marginRight: "5px",
                                }}
                                // color={action.color}
                                onClick={() => actions[1].handler(item._id)}
                                // className="Hello3"
                              >
                                {t("pendings")}&nbsp;
                              </Button>
                            );
                          }
                          if (action.label === "Preview") {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{ backgroundColor: "#07B235" }}
                                // color={action.color}
                                onClick={() => actions[0].handler(item.id)}
                                // className="Hello3"
                              >
                                {action.label}&nbsp;
                                <PreviewIcon />
                              </Button>
                            );
                          }
                          if (action.label === "InvoicePreview") {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{ backgroundColor: "#07B235" }}
                                // color={action.color}
                                onClick={() =>
                                  actions[0].handler(item.invoiceNumber)
                                }
                                // className="Hello3"
                              >
                                {action.label}&nbsp;
                                <PreviewIcon />
                              </Button>
                            );
                          }
                          if (action.label === "delete") {
                            return (
                              <Button
                                key={action.label}
                                onClick={() => {
                                  setShowModal(true);
                                  actions[0].handler(item.id);
                                }}
                              >
                                <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                              </Button>
                            );
                          }
                          if (action.label === "deleteee") {
                            return (
                              <Button
                                key={action.label}
                                onClick={() => {
                                  setShowModal(true);
                                  actions[0].handler(index);
                                }}
                              >
                                <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                              </Button>
                            );
                          }
                          if (action.label === "dlete") {
                            return (
                              <Button
                                key={action.label}
                                onClick={() => {
                                  setShowModaal(true);
                                  actions[0].handler(item.id);
                                }}
                              >
                                <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                              </Button>
                            );
                          }
                          if (action.label === "dlette") {
                            return (
                              <Button
                                key={action.label}
                                onClick={() => {
                                  setShowModall(true);
                                  actions[0].handler(item.id);
                                }}
                              >
                                <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                              </Button>
                            );
                          }
                          if (action.label === "Purchase") {
                            // console.log("\n\n\n\n\n\n\nfor next iteration button");
                            let isItemInList = false;
                            listpurchase?.map((list) => {
                              // console.log(list.quantityidset);
                              // console.log(item._id);
                              if (list.quantityidset === item._id) {
                                isItemInList = true;
                              }
                            });

                            if (isItemInList) {
                              // console.log("\n\n\nfor if", isItemInList);
                              return (
                                <Button
                                  key={action.labeladded}
                                  variant="contained"
                                  style={{ backgroundColor: "#07B235" }}
                                  // color={action.color}
                                  onClick={() => actions[0].handler(item._id)}
                                  // className="Hello3"
                                  disabled={true}

                                  //  disabled={item.locationId !== locationsetid}
                                  // disabled={item.locationId === locationsetid || !item.locationId || !locationsetid}
                                >
                                  {action.labeladded}&nbsp;
                                  <InventoryIcon />
                                </Button>
                              );
                            } else {
                              // console.log("\n\n\nfor else", isItemInList);
                              return (
                                <Button
                                  key={action.label}
                                  variant="contained"
                                  style={{ backgroundColor: "#07B235" }}
                                  // color={action.color}
                                  onClick={() => actions[0].handler(item._id)}
                                  // className="Hello3"
                                  disabled={false}

                                  //  disabled={item.locationId !== locationsetid}
                                  // disabled={item.locationId === locationsetid || !item.locationId || !locationsetid}
                                >
                                  {action.label}&nbsp;
                                  <InventoryIcon />
                                </Button>
                              );
                            }
                          }
                          if (action.label === "Sale") {
                            if (item.productQuantity > 0) {
                              return (
                                <Button
                                  key={action.label}
                                  variant="contained"
                                  style={{ backgroundColor: "#07B235" }}
                                  // color={action.color}
                                  onClick={() => actions[0].handler(item._id)}
                                  // className="Hello3"
                                  disabled={false}
                                >
                                  {action.label}&nbsp;
                                  <LoyaltyIcon />
                                </Button>
                              );
                            } else {
                              return (
                                <Button
                                  key={action.labeladded}
                                  variant="contained"
                                  // color={action.color}
                                  onClick={() => actions[0].handler(item._id)}
                                  // className="Hello3"
                                  disabled={true}
                                >
                                  {action.labeladded}&nbsp;
                                  <ClosedCaptionDisabledIcon />
                                </Button>
                              );
                            }
                          }
                          if (action.label === "transfer") {
                            if (item.productQuantity > 0) {
                              return (
                                <Button
                                  key={action.label}
                                  variant="contained"
                                  style={{ backgroundColor: "#07B235" }}
                                  // color={action.color}
                                  onClick={() => actions[0].handler(item._id)}
                                  // className="Hello3"
                                  disabled={false}
                                >
                                  {action.label}&nbsp;
                                  <MoveDownIcon />
                                </Button>
                              );
                            } else {
                              return (
                                <Button
                                  key={action.labeladded}
                                  variant="contained"
                                  //  color="#ff9800"
                                  onClick={() => actions[0].handler(item._id)}
                                  // className="Hello3"
                                  disabled={true}
                                >
                                  {action.labeladded}&nbsp;
                                  <ClosedCaptionDisabledIcon />
                                </Button>
                              );
                            }
                          }
                          if (action.label === action1) {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{
                                  backgroundColor: "#07B235",
                                  marginLeft: "5px",
                                }}
                                //  color={"success"}
                                onClick={() => {
                                  navigate(`/${link2}/${item._id}`);
                                }}
                                // className="Hello3"
                              >
                                {t("viewBarcode")}&nbsp;
                                <QrCodeIcon />
                              </Button>
                            );
                          }
                          //Just For Change Permission for Super Admin
                          if (action.label === "change Permission") {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{
                                  backgroundColor: "#07B235",
                                  marginLeft: "5px",
                                }}
                                //  color={"success"}
                                onClick={() => {
                                  localStorage.setItem(
                                    "userpermission",
                                    JSON.stringify(item._id)
                                  );
                                  localStorage.setItem(
                                    "roleNameForPermissions",
                                    JSON.stringify(item.roleName)
                                  );
                                  navigate("/rolesAssign");
                                }}
                                // className="Hello3"
                              >
                                {t("changePermissions")}&nbsp;
                                <LockOpenIcon />
                              </Button>
                            );
                          }
                          if (
                            action.label === actionUpdate &&
                            permissionForUpdateProduct
                          ) {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{ backgroundColor: "#E5B000" }}
                                // color={"warning"}
                                onClick={() => {
                                  navigate(`/${linkk}/${item._id}`);
                                }}
                                // className="Hello3"
                              >
                                {t("update")}&nbsp;&nbsp;
                                <UpdateIcon />
                              </Button>
                            );
                          }
                          if (action.label === "PreviewPaidInvoice") {
                            return (
                              <Button
                                key={action.label}
                                variant="contained"
                                style={{ backgroundColor: "#E5B000" }}
                                // color={"warning"}
                                onClick={() => {
                                  navigate(`/${linkk}/${item._id}`);
                                }}
                                // className="Hello3"
                              >
                                {t("Prewiew")}&nbsp;&nbsp;
                                <UpdateIcon />
                              </Button>
                            );
                          }
                        })}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div>No record found.</div>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        className="custom-table-pagination"
      />
      {/* </div> */}
    </>
  );
};

export default TableComponentId;
