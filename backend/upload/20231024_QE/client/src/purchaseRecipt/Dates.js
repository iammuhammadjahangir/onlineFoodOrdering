import { useContext } from "react";
import { State } from "./context/stateContext";
import "../stylee/tableStyling.css";
import { useSelector } from "react-redux";
export default function Dates({ selectedPrinter }) {
  const {
    invoiceNumber,
    invoiceDate,
    dueDate,
    purchaseDate,
    setPurchaseDate,
    clientName,
    purchaseReceiptNumber,
    purchaseCompany,
    purchasedBy,
  } = useContext(State);

  const currentDate = new Date();
  const { user } = useSelector((state) => state.user);
  let formattedDate = currentDate.toLocaleDateString();
  console.log(user);
  return (
    <>
      {user?.user?.printerId?.printerType === "Laser" ? (
        <>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Purchase From:</h5>
              <p>{clientName}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Invoicer number:</h5>
              <p>{invoiceNumber}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Purchase Rcpt Number:</h5>
              <p> {purchaseReceiptNumber}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Invoice date:</h5>
              <p>{formattedDate}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Company:</h5>
              <p> {purchaseCompany}</p>
            </div>
            {purchaseDate ? (
              <>
                <div className="consolidateLaserProductCode">
                  <h5>Purchase Rcpt date:</h5>
                  <p> {purchaseDate.toLocaleDateString()}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            {purchasedBy ? (
              <>
                <div className="consolidateLaserQuantity">
                  <h5>Generated By:</h5>
                  <p> {purchasedBy}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            marginTop: "-30px",
            marginBottom: "0px",
            whiteSpace: "nowrap",
          }}
        >
          <table
            className="mt-10 table1"
            style={{ fontSize: "10px", whiteSpace: "nowrap" }}
          >
            <tbody>
              <tr
                style={{
                  marginTop: "-10px",
                  padding: "0px",
                  marginBottom: "-10px",
                }}
              >
                <td>
                  <span className="font-bold td1">Purchase From:</span> &nbsp;
                  {clientName}
                </td>
              </tr>
              <tr style={{ marginTop: "-10px", marginBottom: "0px" }}>
                <td
                  className="font-bold td1"
                  style={{ marginTop: "-30px", marginBottom: "0px" }}
                >
                  <span className="font-bold td1">Invoicer number:</span> &nbsp;{" "}
                  {invoiceNumber}
                </td>
              </tr>
              <tr style={{ marginTop: "-10px", marginBottom: "0px" }}>
                <td className="font-bold td1">
                  <span className="font-bold td1">Purchase Rcpt Number:</span>{" "}
                  &nbsp; {purchaseReceiptNumber}
                </td>
              </tr>
              <tr style={{ marginTop: "-10px", marginBottom: "0px" }}>
                <td>
                  <span className="font-bold td1">Invoice date:</span> &nbsp;{" "}
                  {formattedDate}
                </td>
              </tr>
              <tr style={{ marginTop: "0px", marginBottom: "0px" }}>
                <td>
                  {" "}
                  <span className="font-bold td1">Company:</span> &nbsp;
                  {purchaseCompany}
                </td>
              </tr>
              <tr style={{ marginTop: "0px", marginBottom: "0px" }}>
                <td className="td1">
                  {purchaseDate ? (
                    <li style={{ listStyle: "none" }}>
                      <span className="font-bold">Purchase Rcpt date:</span>{" "}
                      &nbsp; {purchaseDate.toLocaleDateString()}
                    </li>
                  ) : (
                    <span className="font-bold">Purchase Rcpt date:</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <span className="font-bold td1">Generated By:</span> &nbsp;
                  {purchasedBy}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
