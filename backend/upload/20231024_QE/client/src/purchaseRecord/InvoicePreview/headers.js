import { useContext, useState, useEffect } from "react";
import { State } from "../context/ContextSales";
import { getStorage } from "../../Api";
import { getPurchaseDetailForPreview } from "../../actions/purchaseAction";
import "../../purchaseRecipt/PurchaseCss/purchase.css";
export default function Header({ selectedPrinter }) {
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const { salesId, setSalesId, salesRef } = useContext(State);
  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  const getspecificDataforInvoice = async () => {
    let result = await getPurchaseDetailForPreview(salesId);
    // console.log(result)
    setStorageAddress(result?.data?.address);
    setStoragePhoneNo(result?.data?.phoneNo);
  };
  return (
    <>
      {selectedPrinter === "thermal" ? (
        <>
          <div className="headerHeading">
            <h1>Qureshi Electronics</h1>
            <p>{storageAddress}</p>
            <p>
              <h4>Phone No: </h4>
              {storagePhoneNo}
            </p>
          </div>
        </>
      ) : (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress"> {storageAddress}</p>
          <p className="invoicePhoneNo">
            <p>
              Phone No:
              {storagePhoneNo}
            </p>
          </p>
        </div>
      )}
    </>
  );
}
