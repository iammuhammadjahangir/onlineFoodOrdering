import { useContext, useEffect } from "react";
import { useCustomState } from "../../Variables/stateVariables";
import { getPurchaseDetail } from "../../Api";
import { State } from "../context/ContextSales";
import "../../purchaseRecipt/PurchaseCss/purchase.css";
import { getPurchaseDetailForPreview } from "../../actions/purchaseAction";
export default function Dates({ selectedPrinter }) {
  const { invoicedata, setInvoicedata, setProducts, loading, setLoading } =
    useCustomState();
  const { salesId, setSalesId, salesRef } = useContext(State);
  const currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString("en-GB");
  useEffect(() => {
    // call();
    getspecificDataforInvoice();
  }, []);
  const getspecificDataforInvoice = async () => {
    // let result = await getPurchaseDetail(salesId);
    let result = await getPurchaseDetailForPreview(salesId);
    console.log(result.data);
    setInvoicedata(result.data);
    setLoading(true);
  };

  return (
    <>
      {selectedPrinter === "thermal" ? (
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
                  {invoicedata?.clientName}
                </td>
              </tr>
              <tr style={{ marginTop: "-30px", marginBottom: "0px" }}>
                <td
                  className="font-bold td1"
                  style={{ marginTop: "-30px", marginBottom: "0px" }}
                >
                  <span className="font-bold td1">Invoicer number:</span> &nbsp;{" "}
                  {invoicedata?.id}
                </td>
              </tr>
              <tr style={{ marginTop: "-10px", marginBottom: "0px" }}>
                <td className="font-bold td1">
                  <span className="font-bold td1">Purchase Rcpt Number:</span>{" "}
                  &nbsp; {invoicedata?.purchaseReceiptNumber}
                </td>
              </tr>
              <tr style={{ marginTop: "-10px", marginBottom: "0px" }}>
                <td>
                  <span className="font-bold td1">Invoice date:</span> &nbsp;{" "}
                  {new Date(invoicedata?.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
              <tr style={{ marginTop: "0px", marginBottom: "0px" }}>
                <td>
                  {" "}
                  <span className="font-bold td1">Company:</span> &nbsp;
                  {invoicedata?.purchaseCompany}
                </td>
              </tr>
              <tr style={{ marginTop: "0px", marginBottom: "0px" }}>
                <td className="td1">
                  {invoicedata?.purchaseDate ? (
                    <li style={{ listStyle: "none" }}>
                      <span className="font-bold">Purchase Rcpt date:</span>{" "}
                      &nbsp;{" "}
                      {new Date(invoicedata?.purchaseDate).toLocaleDateString(
                        "en-GB"
                      )}
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
                  {invoicedata?.purchasedBy}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Purchase From:</h5>
              <p>{invoicedata?.clientName}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Invoicer number:</h5>
              <p>{invoicedata?.id}</p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Purchase Rcpt Number:</h5>
              <p> {invoicedata?.purchaseReceiptNumber}</p>
            </div>
            <div className="consolidateLaserProductCode">
              <h5>Invoice date:</h5>
              <p>
                {new Date(invoicedata?.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Company:</h5>
              <p> {invoicedata?.purchaseCompany}</p>
            </div>
            {invoicedata?.purchaseDate ? (
              <>
                <div className="consolidateLaserProductCode">
                  <h5>Purchase Rcpt date:</h5>
                  <p>
                    {" "}
                    {new Date(invoicedata?.purchaseDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            {invoicedata?.purchasedBy ? (
              <>
                <div className="consolidateLaserQuantity">
                  <h5>Generated By:</h5>
                  <p> {invoicedata?.purchasedBy}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="InvoiceLaserFirstRecordDiv">
            <div className="consolidateLaserQuantity">
              <h5>Store In:</h5>
              <p> {invoicedata?.storeIn}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
