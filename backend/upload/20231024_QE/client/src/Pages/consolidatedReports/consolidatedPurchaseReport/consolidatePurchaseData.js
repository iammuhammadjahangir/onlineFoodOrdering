import React from "react";

const ConsolidatePurchaseData = ({ props }) => {
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
                {props.purchaseProductCodeDropDown ? (
                  <>
                    <div className="consolidateLaserProductCode">
                      <h5>Product Code:</h5>
                      <p> {props.purchaseProductCodeDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                {props.purchaseProductCompanyDropDown ? (
                  <>
                    <div className="consolidateLaserQuantity">
                      <h5>Product Company:</h5>
                      <p> {props.purchaseProductCompanyDropDown}</p>
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
                  {props.purchaseStartDateDropDown && (
                    <>
                      <h5>Starting Date::</h5>
                      <p>
                        {" "}
                        {props.purchaseStartDateDropDown.toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </>
                  )}
                </div>
                <div className="consolidateLaserProductCode">
                  {props.purchaseEndDateDropDown && (
                    <>
                      <h5>Ending Date:</h5>
                      <p>
                        {" "}
                        {props.purchaseEndDateDropDown.toLocaleDateString(
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
                {props.purchaseProductCodeDropDown ? (
                  <>
                    <div className="consolidateLaserProductCode">
                      <h5>Product Code:</h5>
                      <p> {props.purchaseProductCodeDropDown}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="consolidateLaserFirstRecordDiv">
                {props.purchaseProductCompanyDropDown ? (
                  <>
                    <div className="consolidateLaserQuantity">
                      <h5>Product Company:</h5>
                      <p> {props.purchaseProductCompanyDropDown}</p>
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
                  {props.purchaseStartDateDropDown && (
                    <>
                      <h5>Starting Date::</h5>
                      <p>
                        {" "}
                        {props.purchaseStartDateDropDown.toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </>
                  )}
                </div>
                <div className="consolidateLaserProductCode">
                  {props.purchaseEndDateDropDown && (
                    <>
                      <h5>Ending Date:</h5>
                      <p>
                        {" "}
                        {props.purchaseEndDateDropDown.toLocaleDateString(
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
  );
};

export default ConsolidatePurchaseData;
