import React from "react";
import "./printTable.css";
import { Statee } from "../../salesRecipt/context/stateContext";
import { useContext } from "react";
let secondHalfColumns = [];
let firstHalfColumns = [];
const PrintTableComponent = ({
  data,
  columns,
  action4,
  column2,
  ConsolidatedInvoiceTotalquantity,
  ConsolidatedInvoiceTotaldiscount,
  ConsolidatedInvoiceTotaltotalPriceExculdingTax,
  ConsolidatedInvoiceTotaltotalTaxAmount,
  ConsolidatedInvoiceTotalIncludingAllPrices,
}) => {
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
  const renderDateValue = (item, field, format) => {
    const value = renderCellValue(item, field);
    if (format === "bool") {
      return value && value.toLocaleString();
    }
    if (format === "time") {
      return value ? new Date(value).toLocaleTimeString() : "";
    }
    if (format === "date") {
      return value ? new Date(value).toLocaleDateString() : "";
    }

    return value;
  };

  const renderCellValue = (item, field) => {
    const fieldKeys = field.split(".");

    return fieldKeys?.reduce((obj, key) => (obj ? obj[key] : ""), item);
  };
  if (columns?.length > 4) {
    const halfLength = Math.ceil(columns?.length / 2);
    firstHalfColumns = columns.slice(0, halfLength);
    secondHalfColumns = columns.slice(halfLength);
  } else {
    const halfLength = Math.ceil(columns?.length);
    firstHalfColumns = columns.slice(0, halfLength);
  }

  return (
    <div style={{ width: "100%", fontSize: "8px" }}>
      {data && data?.length > 0 ? (
        <table
          style={{
            marginTop: "0px",
            width: "100%",
            fontSize: "40px",
            marginRight: "0px",
          }}
          className="table1"
        >
          <thead>
            <tr>
              {firstHalfColumns?.map((column) => (
                <th
                  key={column.field}
                  style={{ padding: "0px", fontSize: "8px", textAlign: "left" }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
            <tr>
              {secondHalfColumns?.map((column) => (
                <th
                  key={column.field}
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "center",
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
            <tr>
              {firstHalfColumns?.map((column) => (
                <th
                  key={column.field}
                  style={{
                    border: "1px solid #ccc",
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                ></th>
              ))}
            </tr>
          </thead>
        </table>
      ) : (
        <div>No record found.</div>
      )}
      {data && data?.length > 0 ? (
        <table
          style={{ marginTop: "-30px", width: "100%", fontSize: "40px" }}
          className="table2"
        >
          <tbody>
            {data?.map((item, index) => (
              <>
                <tr key={index}>
                  {firstHalfColumns?.map((column) => (
                    <td
                      key={column.field}
                      style={{
                        padding: "0px",
                        textAlign: "left",
                        fontSize: "8px",
                      }}
                    >
                      {column.format === "date" ||
                      column.format === "time" ||
                      column.format === "bool"
                        ? renderDateValue(item, column.field, column.format)
                        : renderCellValue(item, column.field)}
                    </td>
                  ))}
                </tr>
                <tr key={index}>
                  {secondHalfColumns?.map((column) => (
                    <>
                      <td
                        key={column.field}
                        style={{
                          padding: "0px",
                          fontSize: "8px",
                          textAlign: "center",
                        }}
                      >
                        {column.format === "date" ||
                        column.format === "time" ||
                        column.format === "bool"
                          ? renderDateValue(item, column.field, column.format)
                          : renderCellValue(item, column.field)}
                      </td>
                    </>
                  ))}
                </tr>
                <tr>
                  {firstHalfColumns?.map((column) => (
                    <td
                      key={column.field}
                      style={{
                        border: "1px solid #ccc",
                        padding: "0px",
                        fontSize: "8px",
                        textAlign: "left",
                      }}
                    ></td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <h1></h1>
      )}
      {/* //Footer For SalesConsolidated Invoice// */}
      {(data && data?.length > 0 && action4 == "ConsolReport") ||
      action4 == "salesRecipt" ? (
        <table style={{ width: "20%", fontSize: "10px" }} className="table1">
          <thead>
            <tr>
              <th></th>
              {column2?.map((column) => (
                <>
                  {/* <th style={{ padding: '0px', fontSize: '8px', textAlign: 'left' }}></th> */}
                  <th
                    key={column.field}
                    style={{
                      padding: "0px",
                      fontSize: "8px",
                      textAlign: "left",
                    }}
                  >
                    {column.label}
                  </th>
                </>
              ))}
            </tr>
          </thead>
          {action4 == "ConsolReport" || action4 == "salesRecipt" ? (
            <tfoot>
              <tr>
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  Total:
                </td>
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {ConsolidatedInvoiceTotalquantity.toLocaleString()}
                </td>
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {ConsolidatedInvoiceTotaldiscount.toLocaleString()}
                </td>

                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {ConsolidatedInvoiceTotaltotalPriceExculdingTax.toLocaleString()}
                </td>
                {/* Add more footer cells as needed */}
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {ConsolidatedInvoiceTotaltotalTaxAmount.toLocaleString()}
                </td>

                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {ConsolidatedInvoiceTotalIncludingAllPrices.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          ) : (
            <h1></h1>
          )}
        </table>
      ) : (
        <h1></h1>
      )}

      {list && list?.length > 0 ? (
        <table style={{ width: "20%", fontSize: "10px" }} className="table1">
          <thead>
            <tr>
              <th></th>
              {column2?.map((column) => (
                <>
                  {/* <th style={{ padding: '0px', fontSize: '8px', textAlign: 'left' }}></th> */}
                  <th
                    key={column.field}
                    style={{
                      padding: "0px",
                      fontSize: "8px",
                      textAlign: "left",
                    }}
                  >
                    {column.label}
                  </th>
                </>
              ))}
            </tr>
          </thead>
          {action4 === "salePage" ? (
            <tfoot>
              <tr>
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  Total:
                </td>
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {list?.length > 0
                    ? GrandQuantityTotal.toLocaleString()
                    : null}
                </td>
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {list?.length > 0 ? GrandDiscount.toLocaleString() : null}
                </td>

                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {list?.length > 0
                    ? GrandTotalExludeTex.toLocaleString()
                    : null}
                </td>
                {/* Add more footer cells as needed */}
                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {list?.length > 0 ? GrandTotalTax.toLocaleString() : null}
                </td>

                <td
                  style={{
                    padding: "0px",
                    fontSize: "8px",
                    textAlign: "left",
                  }}
                >
                  {/* Your footer cell content */}
                  {list?.length > 0 ? total.toLocaleString() : null}
                </td>
              </tr>
            </tfoot>
          ) : (
            <h1></h1>
          )}
        </table>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default PrintTableComponent;
