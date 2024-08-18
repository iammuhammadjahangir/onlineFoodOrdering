import React from "react";

const ConsolidatedSaleData = ({ props }) => {
  return (
    <div>
      {props.tableData?.length > 0 ? (
        <>
          {props.selectedPrinter === "thermal" ? (
            <>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  <h5>Total Quantity:</h5>
                  <p>{props.quantity}</p>
                </div>
                <div className="consolidateLaserProductCode">
                  <h5>Total Discount:</h5>
                  <p>{props.discount}</p>
                </div>
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  <h5>Total Price:</h5>
                  <p> {props.totalPriceExculdingTax}</p>
                </div>
                <div className="consolidateLaserProductCode">
                  <h5>Tax Amount:</h5>
                  <p>{props.totalTaxAmount}</p>
                </div>
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  <h5>Grand Total:</h5>
                  <p> {props.totalAmountIncludingAllPrices}</p>
                </div>
                {props.salesProductCodeDropDown ? (
                  <>
                    <div className="consolidateLaserProductCode">
                      <h5>Product Code:</h5>
                      <p> {props.salesProductCodeDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                {props.salesProductCompanyDropDown ? (
                  <>
                    <div className="consolidateLaserQuantity">
                      <h5>Product Company:</h5>
                      <p> {props.salesProductCompanyDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {props.salesProductShopNoDropDown ? (
                  <>
                    <div className="consolidateLaserProductCode">
                      <h5>Shop No::</h5>
                      <p>{props.salesProductShopNoDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  {props.salesStartDateDropDown && (
                    <>
                      <h5>Starting Date::</h5>
                      <p>
                        {" "}
                        {props.salesStartDateDropDown.toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </>
                  )}
                </div>
                <div className="consolidateLaserProductCode">
                  {props.salesEndDateDropDown && (
                    <>
                      <h5>Ending Date:</h5>
                      <p>
                        {" "}
                        {props.salesEndDateDropDown.toLocaleDateString("en-GB")}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  <h5>Total Quantity:</h5>
                  <p>{props.quantity}</p>
                </div>
                <div className="consolidateLaserProductCode">
                  <h5>Total Discount:</h5>
                  <p>{props.discount}</p>
                </div>
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  <h5>Total Price:</h5>
                  <p> {props.totalPriceExculdingTax}</p>
                </div>
                <div className="consolidateLaserProductCode">
                  <h5>Tax Amount:</h5>
                  <p>{props.totalTaxAmount}</p>
                </div>
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  <h5>Grand Total:</h5>
                  <p> {props.totalAmountIncludingAllPrices}</p>
                </div>
                {props.salesProductCodeDropDown ? (
                  <>
                    <div className="consolidateLaserProductCode">
                      <h5>Product Code:</h5>
                      <p> {props.salesProductCodeDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                {props.salesProductCompanyDropDown ? (
                  <>
                    <div className="consolidateLaserQuantity">
                      <h5>Product Company:</h5>
                      <p> {props.salesProductCompanyDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {props.salesProductShopNoDropDown ? (
                  <>
                    <div className="consolidateLaserProductCode">
                      <h5>Shop No::</h5>
                      <p>{props.salesProductShopNoDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                <div className="consolidateLaserQuantity">
                  {props.salesStartDateDropDown && (
                    <>
                      <h5>Starting Date::</h5>
                      <p>
                        {" "}
                        {props.salesStartDateDropDown.toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </>
                  )}
                </div>
                <div className="consolidateLaserProductCode">
                  {props.salesEndDateDropDown && (
                    <>
                      <h5>Ending Date:</h5>
                      <p>
                        {" "}
                        {props.salesEndDateDropDown.toLocaleDateString("en-GB")}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default ConsolidatedSaleData;
{
  /* {tableData?.length > 0 && (
        <>
          {selectedPrinter === "thermal" ? (
            <>
              <table
                className="mt-10 table1"
                style={{ fontSize: "10px", whiteSpace: "nowrap" }}
              >
                <tr
                  style={{
                    marginTop: "-10px",
                    gap: "50px",
                    padding: "0px",
                    marginBottom: "-10px",
                  }}
                >
                  <td
                    className="td1"
                    style={{
                      marginTop: "-30px",
                      marginBottom: "0px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    <span className="font-bold td1">Total Quantity:</span>{" "}
                    {quantity}
                  </td>
                  {salesProductCodeDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">Product Code:</span>{" "}
                      {salesProductCodeDropDown}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr
                  style={{
                    marginTop: "-10px",
                    gap: "50px",
                    padding: "0px",
                    marginBottom: "-10px",
                  }}
                >
                  <td
                    className="td1"
                    style={{
                      marginTop: "-30px",
                      marginBottom: "0px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    <span className="font-bold td1">Total Discount:</span>{" "}
                    {discount}
                  </td>
                  {salesProductCompanyDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">
                        Product Company:
                      </span>{" "}
                      {salesProductCompanyDropDown}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr
                  style={{
                    marginTop: "-10px",
                    gap: "50px",
                    padding: "0px",
                    marginBottom: "-10px",
                  }}
                >
                  <td
                    className="td1"
                    style={{
                      marginTop: "-30px",
                      marginBottom: "0px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    <span className="font-bold td1">Total Price:</span>{" "}
                    {totalPriceExculdingTax}
                  </td>
                  {salesProductShopNoDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">Shop No:</span>{" "}
                      {salesProductShopNoDropDown}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr
                  style={{
                    marginTop: "-10px",
                    gap: "50px",
                    padding: "0px",
                    marginBottom: "-10px",
                  }}
                >
                  <td
                    className="td1"
                    style={{
                      marginTop: "-30px",
                      marginBottom: "0px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    <span className="font-bold td1">Tax Amount:</span>{" "}
                    {totalTaxAmount}
                  </td>
                  {salesStartDateDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">Starting Date:</span>{" "}
                      {salesStartDateDropDown.toLocaleDateString("en-GB")}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr
                  style={{
                    marginTop: "-10px",
                    gap: "50px",
                    padding: "0px",
                    marginBottom: "-10px",
                  }}
                >
                  <td
                    className="td1"
                    style={{
                      marginTop: "-30px",
                      marginBottom: "0px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    <span className="font-bold td1">Grand Total:</span>{" "}
                    {totalAmountIncludingAllPrices}
                  </td>
                  {salesEndDateDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">Ending Date:</span>{" "}
                      {salesEndDateDropDown.toLocaleDateString("en-GB")}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              </table>
            </>
          ) : (
            <>
              <table className="table1" style={{ margin: 0 }}>
                <tr className="tr1">
                  <td>
                    {" "}
                    <span className="font-bold td1">Total Quantity:</span>{" "}
                    {quantity}
                  </td>
                  {salesProductCodeDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">Product Code:</span>{" "}
                      {salesProductCodeDropDown}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr>
                  <td>
                    {" "}
                    <span className="font-bold td1">Total Discount:</span>{" "}
                    {discount}
                  </td>
                  {salesProductCompanyDropDown ? (
                    <td
                      className="td1"
                      style={{
                        marginTop: "-30px",
                        marginBottom: "0px",
                        marginLeft: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      {" "}
                      <span className="font-bold td1">
                        Product Company:
                      </span>{" "}
                      {salesProductCompanyDropDown}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr>
                  <td>
                    {" "}
                    <span className="font-bold td1">Total Price:</span>{" "}
                    {totalPriceExculdingTax}
                  </td>
                  {salesProductShopNoDropDown ? (
                    <td>
                      {" "}
                      <span className="font-bold td1">Shop No:</span>{" "}
                      {salesProductShopNoDropDown}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr className="tr1">
                  <td>
                    {" "}
                    <span className="font-bold td1">Tax Amount:</span>{" "}
                    {totalTaxAmount}
                  </td>
                  {salesStartDateDropDown ? (
                    <td>
                      {" "}
                      <span className="font-bold td1">Starting Date:</span>{" "}
                      {salesStartDateDropDown.toLocaleDateString("en-GB")}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
                <tr>
                  <td>
                    {" "}
                    <span className="font-bold td1">Grand Total:</span>{" "}
                    {totalAmountIncludingAllPrices}
                  </td>
                  {salesEndDateDropDown ? (
                    <td>
                      {" "}
                      <span className="font-bold td1">Ending Date:</span>{" "}
                      {salesEndDateDropDown.toLocaleDateString("en-GB")}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              </table>
            </>
          )}
        </>
      )} */
}
