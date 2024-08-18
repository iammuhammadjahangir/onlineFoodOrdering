import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, Tab } from "semantic-ui-react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { State } from "../../purchaseRecipt/context/stateContext";
import { Statee } from "../../salesRecipt/context/stateContext";
import { Statte } from "./../../Transfer Recipt/context/stateContext";
import { Select, Modal, Message } from "semantic-ui-react";
import "../../stylee/tableComponent.css";
import { useTranslation, initReactI18next } from "react-i18next";
import { tableState } from "./tableContext";

const TableComponentId = ({
  data,
  columns,
  actions,
  linkk,
  link2,
  actionUpdate,
  action1,
  action3,
  action2,
  action4,
  quantityy,
  Price,
  Discount,
  totalAmounnt,
  taxAmount,
  amount,
  totalProfit,
  ConsolidatedInvoiceTotalquantity,
  ConsolidatedInvoiceTotaldiscount,
  ConsolidatedInvoiceTotaltotalPriceExculdingTax,
  ConsolidatedInvoiceTotaltotalTaxAmount,
  ConsolidatedInvoiceTotalIncludingAllPrices,
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
  const { showModal, setShowModal, locationsetid, listpurchase } =
    useContext(State);
  const { showModall, setShowModall } = useContext(Statte);
  const { t, i18n } = useTranslation();
  const { rowCount, setRowCount } = useContext(tableState);

  // State variables for sorting
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

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

  const {
    showModaal,
    setShowModaal,
    list,
    total,
    GrandQuantityTotal,
    GrandTotalExludeTex,
    GrandTotalTax,
    GrandDiscount,
  } = useContext(Statee);
  // console.log(locationsetid);
  // console.log(data);
  let currentIndex = 0;
  useEffect(() => {
    setRowCount(data?.length);
  }, [data]);

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
      return value ? new Date(value).toLocaleDateString() : "";
    }

    return value;
  };
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

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        marginTop: "30px",
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
          // className="bg-gray-100"
          style={{ margin: "0", zIndex: "2", width: "100%" }}
        >
          <Table.Header
            className="HeaderStyle"
            style={{ backgroundColor: "lightgray" }}
          >
            <Table.Row
              // className="font-bold text-center HeaderStyle"
              style={{
                backgroundColor: "lightgray",
                border: "1px solid black",
                textAlign: "center",
                padding: "0px",
                textSize: "14px",
              }}
              // style={styles.tableHeader}
            >
              <Table.HeaderCell
                className="Hello"
                style={{
                  backgroundColor: "lightgray",
                  width: "15px",
                  fontSize: "12px",
                  border: "1px solid black",
                }}
              >
                {t("sNo")}
              </Table.HeaderCell>
              {columns?.map((column) => (
                <Table.HeaderCell
                  key={column.field}
                  className="HeaderStyle"
                  style={{
                    backgroundColor: "lightgray",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
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
                <Table.Cell
                  className="Hello"
                  style={{
                    width: "15px",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {++currentIndex}
                </Table.Cell>
                {columns?.map((column) => (
                  <Table.Cell
                    key={column.Code}
                    className="Hello"
                    // style={{ textAlign: "left" }}
                    style={{
                      width: "15px",
                      fontSize: "12px",
                      border: "1px solid black",
                    }}
                  >
                    {column.format === "date" ||
                    column.format === "time" ||
                    column.format === "bool"
                      ? renderDateValue(item, column.field, column.format)
                      : renderCellValue(item, column.field, column.format)}
                  </Table.Cell>
                ))}
                {actions && (
                  <Table.Cell
                    className="Hello"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {actions?.map((action) => {
                      if (action.label === action3) {
                        return (
                          <Button
                            key={action.label}
                            color={action.color}
                            onClick={() => actions[0].handler(item._id)}
                            className="Hello3"
                          >
                            {t("delete")}
                          </Button>
                        );
                      }
                      if (action.label === "Preview") {
                        return (
                          <Button
                            key={action.label}
                            color={action.color}
                            onClick={() => actions[0].handler(item.id)}
                            className="Hello3"
                          >
                            {action.label}
                          </Button>
                        );
                      }
                      if (action.label === "InvoicePreview") {
                        return (
                          <Button
                            key={action.label}
                            color={action.color}
                            onClick={() =>
                              actions[0].handler(item.invoiceNumber)
                            }
                            className="Hello3"
                          >
                            {action.label}
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
                              color={action.color}
                              onClick={() => actions[0].handler(item._id)}
                              className="Hello3"
                              disabled={true}

                              //  disabled={item.locationId !== locationsetid}
                              // disabled={item.locationId === locationsetid || !item.locationId || !locationsetid}
                            >
                              {action.labeladded}
                            </Button>
                          );
                        } else {
                          // console.log("\n\n\nfor else", isItemInList);
                          return (
                            <Button
                              key={action.label}
                              color={action.color}
                              onClick={() => actions[0].handler(item._id)}
                              className="Hello3"
                              disabled={false}

                              //  disabled={item.locationId !== locationsetid}
                              // disabled={item.locationId === locationsetid || !item.locationId || !locationsetid}
                            >
                              {action.label}
                            </Button>
                          );
                        }
                      }
                      if (action.label === "Sale") {
                        if (item.productQuantity > 0) {
                          return (
                            <Button
                              key={action.label}
                              color={action.color}
                              onClick={() => actions[0].handler(item._id)}
                              className="Hello3"
                              disabled={false}
                            >
                              {action.label}
                            </Button>
                          );
                        } else {
                          return (
                            <Button
                              key={action.labeladded}
                              color={action.color}
                              onClick={() => actions[0].handler(item._id)}
                              className="Hello3"
                              disabled={true}
                            >
                              {action.labeladded}
                            </Button>
                          );
                        }
                      }
                      if (action.label === "transfer") {
                        if (item.productQuantity > 0) {
                          return (
                            <Button
                              key={action.label}
                              color={action.color}
                              onClick={() => actions[0].handler(item._id)}
                              className="Hello3"
                              disabled={false}
                            >
                              {action.label}
                            </Button>
                          );
                        } else {
                          return (
                            <Button
                              key={action.labeladded}
                              color={action.color}
                              onClick={() => actions[0].handler(item._id)}
                              className="Hello3"
                              disabled={true}
                            >
                              {action.labeladded}
                            </Button>
                          );
                        }
                      }
                      if (action.label === action1) {
                        return (
                          <Button
                            key={action.label}
                            color={action.color}
                            onClick={() => {
                              navigate(`/${link2}/${item._id}`);
                            }}
                            className="Hello3"
                          >
                            {t("viewBarcode")}
                          </Button>
                        );
                      }
                      if (
                        action.label === actionUpdate &&
                        JSON.parse(localStorage.getItem("isAdministrator"))
                      ) {
                        return (
                          <Button
                            key={action.label}
                            color={action.color}
                            onClick={() => {
                              navigate(`/${linkk}/${item._id}`);
                            }}
                            className="Hello3"
                          >
                            {t("update")}
                          </Button>
                        );
                      }
                    })}
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>

          {list?.length > 0 && action4 == "salePage" ? (
            <Table.Footer className=" text-center">
              <Table.Row
                style={{
                  backgroundColor: "lightgray",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  border: "1px solid black",
                }}
              >
                <Table.HeaderCell
                  className="Hello"
                  // style={{ backgroundColor: "lightgray", fontWeight: "bold",  }}
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  <Table.Cell className="Hello"></Table.Cell>
                </Table.HeaderCell>
                {list?.length > 0 ? (
                  <Table.Cell
                    className="Hello"
                    style={{
                      backgroundColor: "lightgray",
                      fontWeight: "bold",
                      fontSize: "12px",
                      border: "1px solid black",
                    }}
                  >
                    Total:
                  </Table.Cell>
                ) : null}
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {list?.length > 0
                    ? GrandQuantityTotal.toLocaleString()
                    : null}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {list?.length > 0 ? GrandDiscount.toLocaleString() : null}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {list?.length > 0
                    ? GrandTotalExludeTex.toLocaleString()
                    : null}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {list?.length > 0 ? GrandTotalTax.toLocaleString() : null}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {list?.length > 0 ? total.toLocaleString() : null}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          ) : null}
          {/* //Footer For SalesConsolidated Invoice// */}

          {action4 == "ConsolReport" || action4 == "salesRecipt" ? (
            <Table.Footer className=" text-center">
              <Table.Row
                style={{
                  backgroundColor: "lightgray",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  border: "1px solid black",
                }}
              >
                <Table.HeaderCell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  <Table.Cell
                    className="Hello"
                    style={{
                      backgroundColor: "lightgray",
                      fontWeight: "bold",
                      fontSize: "12px",
                      border: "1px solid black",
                    }}
                  ></Table.Cell>
                </Table.HeaderCell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  Total:
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                {action4 == "salesRecipt" && (
                  <Table.Cell
                    className="Hello"
                    style={{
                      backgroundColor: "lightgray",
                      fontWeight: "bold",
                      fontSize: "12px",
                      border: "1px solid black",
                    }}
                  ></Table.Cell>
                )}
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {ConsolidatedInvoiceTotalquantity.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {ConsolidatedInvoiceTotaldiscount.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {" "}
                  {ConsolidatedInvoiceTotaltotalPriceExculdingTax.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {ConsolidatedInvoiceTotaltotalTaxAmount.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {ConsolidatedInvoiceTotalIncludingAllPrices.toLocaleString()}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          ) : null}

          {action4 == "ProfitEmployee" ? (
            <Table.Footer className=" text-center">
              <Table.Row
                style={{
                  backgroundColor: "lightgray",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  border: "1px solid black",
                }}
              >
                <Table.HeaderCell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  <Table.Cell
                    className="Hello"
                    style={{
                      backgroundColor: "lightgray",
                      fontWeight: "bold",
                      fontSize: "12px",
                      border: "1px solid black",
                    }}
                  ></Table.Cell>
                </Table.HeaderCell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  Total:
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                ></Table.Cell>
                {action4 == "ProfitEmployee" && (
                  <>
                    <Table.Cell
                      className="Hello"
                      style={{
                        backgroundColor: "lightgray",
                        fontWeight: "bold",
                        fontSize: "12px",
                        border: "1px solid black",
                      }}
                    ></Table.Cell>
                  </>
                )}
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {quantityy.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {Price.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {Discount.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {totalAmounnt.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {" "}
                  {taxAmount.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {amount.toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  className="Hello"
                  style={{
                    backgroundColor: "lightgray",
                    fontWeight: "bold",
                    fontSize: "12px",
                    border: "1px solid black",
                  }}
                >
                  {totalProfit.toLocaleString()}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          ) : null}
        </Table>
      ) : (
        <div>No record found.</div>
      )}
    </div>
  );
};

export default TableComponentId;
const styles = {
  printTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    border: "1px solid black",
    textAlign: "center",
  },
  tableCell: {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "center",
  },
};
