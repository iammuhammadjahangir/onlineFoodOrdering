import { useState } from "react";
import "../../salesRecipt/SaleReciptCss/sale.css";
export default function Header({ selectedPrinter }) {
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");

  return (
    <>
      {selectedPrinter === "Laser" ? (
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
