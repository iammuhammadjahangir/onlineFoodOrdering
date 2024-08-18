import { useContext } from "react";
import { useEffect } from "react";
import { Statee } from "./context/stateContext";
import "./SaleReciptCss/sale.css";

import { useSelector } from "react-redux";
export default function Dates({ selectedPrinter }) {
  const {
    invoiceNumber,
    invoiceDate,
    dueDate,
    fbrInvoiceNumber,
    clientName,
    clientAddress,
    saleBy,
  } = useContext(Statee);
  const { newSalesProduct } = (state) => state.newSalesProduct;
  const { user } = useSelector((state) => state.user);
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [])

  return (
    <>
      {user?.user?.printerId?.printerType === "Laser" ? (
        <>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Customer Name:</h5>
              <p>{clientName}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Cell No:</h5>
              <p>{clientAddress}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Invoice number:</h5>
              <p> {invoiceNumber}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Invoice date:</h5>
              <p>{invoiceDate}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Generated By:</h5>
              <p> {saleBy}</p>
            </div>
            {fbrInvoiceNumber ? (
              <>
                <div className="consolidateLaserProductCode">
                  <h5>FBR Invoice number:</h5>
                  <p> {fbrInvoiceNumber}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Customer Name:</h5>
              <p>{clientName}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Cell No:</h5>
              <p>{clientAddress}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Invoice number:</h5>
              <p> {invoiceNumber}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Invoice date:</h5>
              <p>{invoiceDate}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Generated By:</h5>
              <p> {saleBy}</p>
            </div>
            {fbrInvoiceNumber ? (
              <>
                <div className="consolidateLaserProductCode">
                  <h5>FBR Invoice number:</h5>
                  <p> {fbrInvoiceNumber}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}