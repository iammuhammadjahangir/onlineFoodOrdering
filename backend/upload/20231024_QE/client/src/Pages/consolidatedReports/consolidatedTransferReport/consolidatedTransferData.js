import React from "react";

const ConsolidatedTransferData = ({ props }) => {
  return (
    <>
      <div>
        {props.tableData?.length > 0 ? (
          <>
            {props.selectedPrinter === "thermal" ? (
              <>
                <div className="consolidateLaserFirstRecordDiv">
                  <div className="consolidateLaserQuantity">
                    <h5>Record Of:</h5>
                    <p>{props.selectedRadioOption}</p>
                  </div>
                  <div className="consolidateLaserProductCode">
                    <h5>Transfer To:</h5>
                    <p>{props.transferProductTrasferToDropDown}</p>
                  </div>
                </div>
                <div className="consolidateLaserFirstRecordDiv">
                  <div className="consolidateLaserQuantity">
                    <h5>Total Quantity</h5>
                    <p> {props.totalQuantity}</p>
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
                  {props.transferProductCodeDropDown ? (
                    <>
                      <div className="consolidateLaserProductCode">
                        <h5>Product Code:</h5>
                        <p> {props.transferProductCodeDropDown}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="consolidateLaserFirstRecordDiv">
                  {props.transferProductCompanyDropDown ? (
                    <>
                      <div className="consolidateLaserQuantity">
                        <h5>Product Company:</h5>
                        <p> {props.transferProductCompanyDropDown}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.purchaseProductShopNoDropDown ? (
                    <>
                      <div className="consolidateLaserProductCode">
                        <h5>Shop No::</h5>
                        <p>{props.purchaseProductShopNoDropDown}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="consolidateLaserFirstRecordDiv">
                  <div className="consolidateLaserQuantity">
                    {props.transferStartingDateDropDown && (
                      <>
                        <h5>Starting Date::</h5>
                        <p>
                          {" "}
                          {props.transferStartingDateDropDown.toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="consolidateLaserProductCode">
                    {props.transferProductEndingDateDropDown && (
                      <>
                        <h5>Ending Date:</h5>
                        <p>
                          {" "}
                          {props.transferProductEndingDateDropDown.toLocaleDateString(
                            "en-GB"
                          )}
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
                    <h5>Record Of:</h5>
                    <p>{props.selectedRadioOption}</p>
                  </div>
                  <div className="consolidateLaserProductCode">
                    <h5>Transfer To:</h5>
                    <p>{props.transferProductTrasferToDropDown}</p>
                  </div>
                </div>
                <div className="consolidateLaserFirstRecordDiv">
                  <div className="consolidateLaserQuantity">
                    <h5>Total Quantity</h5>
                    <p> {props.totalQuantity}</p>
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
                  {props.transferProductCodeDropDown ? (
                    <>
                      <div className="consolidateLaserProductCode">
                        <h5>Product Code:</h5>
                        <p> {props.transferProductCodeDropDown}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="consolidateLaserFirstRecordDiv">
                  {props.transferProductCompanyDropDown ? (
                    <>
                      <div className="consolidateLaserQuantity">
                        <h5>Product Company:</h5>
                        <p> {props.transferProductCompanyDropDown}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.purchaseProductShopNoDropDown ? (
                    <>
                      <div className="consolidateLaserProductCode">
                        <h5>Shop No::</h5>
                        <p>{props.purchaseProductShopNoDropDown}</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="consolidateLaserFirstRecordDiv">
                  <div className="consolidateLaserQuantity">
                    {props.transferStartingDateDropDown && (
                      <>
                        <h5>Starting Date::</h5>
                        <p>
                          {" "}
                          {props.transferStartingDateDropDown.toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="consolidateLaserProductCode">
                    {props.transferProductEndingDateDropDown && (
                      <>
                        <h5>Ending Date:</h5>
                        <p>
                          {" "}
                          {props.transferProductEndingDateDropDown.toLocaleDateString(
                            "en-GB"
                          )}
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
      {/* {tableData?.length > 0 && (
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
                            <span className="font-bold td1">
                              Record Of:
                            </span>{" "}
                            {selectedRadioOption}
                          </td>
                      </tr>
                      <tr
                        style={{
                          marginTop: "-10px",
                          gap: "50px",
                          padding: "0px",
                          marginBottom: "-10px",
                        }}
                      >
                        {transferProductCodeDropDown ? (
                          <td
                            className="td1"
                            style={{
                              marginTop: "-30px",
                              marginBottom: "0px",
                              marginRight: "10px",
                            }}
                          >
                            {" "}
                            <span className="font-bold td1">
                              Product Code:
                            </span>{" "}
                            {transferProductCodeDropDown}
                          </td>
                        ) : (
                          <td></td>
                        )}
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
                            Total Quantity:
                          </span>{" "}
                          {totalQuantity}
                        </td>
                      </tr>
                      <tr
                        style={{
                          marginTop: "-10px",
                          gap: "50px",
                          padding: "0px",
                          marginBottom: "-10px",
                        }}
                      >
                        {transferProductCompanyDropDown && (
                          <td
                            className="td1"
                            style={{
                              marginTop: "-30px",
                              marginBottom: "0px",
                              marginRight: "10px",
                            }}
                          >
                            {" "}
                            <span className="font-bold td1">
                              Product Company:
                            </span>{" "}
                            {transferProductCompanyDropDown}
                          </td>
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
                        {transferProductTrasferToDropDown && (
                          <td
                            className="td1"
                            style={{
                              marginTop: "-30px",
                              marginBottom: "0px",
                              marginRight: "10px",
                            }}
                          >
                            {" "}
                            <span className="font-bold td1">
                              Transfer To:
                            </span>{" "}
                            {transferProductTrasferToDropDown}
                          </td>
                        )}
                      </tr>
                      <tr className="tr1">
                        {transferStartingDateDropDown && (
                          <td
                            className="td1"
                            style={{
                              marginTop: "-30px",
                              marginBottom: "0px",
                              marginRight: "10px",
                            }}
                          >
                            {" "}
                            <span className="font-bold td1">
                              Starting Date:
                            </span>{" "}
                            {transferStartingDateDropDown.toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        )}
                        {transferProductEndingDateDropDown && (
                          <td
                            className="td1"
                            style={{
                              marginTop: "-30px",
                              marginBottom: "0px",
                              marginRight: "10px",
                            }}
                          >
                            {" "}
                            <span className="font-bold td1">
                              Ending Date:
                            </span>{" "}
                            {transferProductEndingDateDropDown.toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        )}
                      </tr>
                    </table>
                  </>
                ) : (
                  <>
                    <table className="table1" style={{ margin: 0 }}>
                    {
                      !JSON.parse(localStorage.getItem("isAdministrator")) && (
                        <tr className="tr1">
                        <td>
                          {" "}
                          <span className="font-bold td1">
                            Record Of:
                          </span>{" "}
                          {selectedRadioOption?.length > 0 ? (selectedRadioOption) : (JSON.parse(localStorage.getItem("shopId")))}
                        </td>
                        <td></td>
                      </tr>
                      )
                    }
                   
                      <tr className="tr1">
                        <td>
                          {" "}
                          <span className="font-bold td1">
                            Total Quantity:
                          </span>{" "}
                          {totalQuantity}
                        </td>
                        {transferProductCodeDropDown ? (
                          <td>
                            {" "}
                            <span className="font-bold td1">
                              Product Code:
                            </span>{" "}
                            {transferProductCodeDropDown}
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                      <tr>
                        {transferProductCompanyDropDown && (
                          <td>
                            {" "}
                            <span className="font-bold td1">
                              Product Company:
                            </span>{" "}
                            {transferProductCompanyDropDown}
                          </td>
                        )}
                      </tr>
                      <tr>
                        {transferProductTrasferToDropDown && (
                          <td>
                            {" "}
                            <span className="font-bold td1">
                              Transfer To:
                            </span>{" "}
                            {transferProductTrasferToDropDown}
                          </td>
                        )}
                      </tr>
                      <tr className="tr1">
                        {transferStartingDateDropDown && (
                          <td>
                            {" "}
                            <span className="font-bold td1">
                              Starting Date:
                            </span>{" "}
                            {transferStartingDateDropDown.toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        )}
                        {transferProductEndingDateDropDown && (
                          <td>
                            {" "}
                            <span className="font-bold td1">
                              Ending Date:
                            </span>{" "}
                            {transferProductEndingDateDropDown.toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        )}
                      </tr>
                    </table>
                  </>
                )}
              </>
            )} */}
    </>
  );
};

export default ConsolidatedTransferData;
