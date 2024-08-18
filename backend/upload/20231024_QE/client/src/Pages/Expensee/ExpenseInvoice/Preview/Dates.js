import { useContext, useEffect, useState } from "react";
// import { getExpenseDetail } from "../../../../Api";
import { Statee } from "../../context/stateContext";
import { getExpenseDetail, getExpenseDetailsForPreview } from "../../../../actions/expenseAction";
export default function Dates({ selectedPrinter }) {
  const { salesId, setSalesId, storageAddress, storagePhoneNo } =
    useContext(Statee);

  const [expenseResult, setExpenseResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  const getspecificDataforInvoice = async () => {
    let result = await getExpenseDetail(salesId);
    console.log(result)
    setExpenseResult(result?.data);
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
          <table className="mt-10 table1" style={{ whiteSpace: "nowrap" }}>
            <tr style={{ fontSize: "6px" }}>
              <td className="font-bold td1">
                <span className="font-bold">Invoice Date:</span>{" "}
                {new Date(expenseResult.createdAt).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr style={{ fontSize: "6px" }}>
              <td className="font-bold td1">
                <span className="font-bold td1">Invoice Number:</span>{" "}
                {expenseResult.invoiceNumber}
              </td>
            </tr>
          </table>
        </div>
      ) : (
          <table style={{whiteSpace:"nowrap",justifyContent: "center", marginTop: "20px", marginLeft: "100px", borderBottom: "2px solid black"}}>
            <tr>
              <td>
                <span className="font-bold">Invoice Date: &nbsp;&nbsp;</span>
                {new Date(expenseResult.createdAt).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-bold td1">Invoice Number:&nbsp;&nbsp;</span>
                {expenseResult.invoiceNumber}
              </td>
            </tr>
          </table>
      )}
    </>
  );
}
