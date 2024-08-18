import { useContext, useState, useEffect } from "react";
import { State } from "../context/ContextSales";
import { getStorage } from "../../Api";
import { getShopDetails } from "../../actions/shopAction";
import { getTransferDetailsForPreview } from "../../actions/transferAction";
import "../../Transfer Recipt/transferReciptCss/transfer.css";
export default function Header({ selectedPrinter }) {
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const { salesId, setSalesId, salesRef } = useContext(State);
  //   const { storageAddress, storagePhoneNo } = useContext(State);

  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  const getspecificDataforInvoice = async () => {
    console.log(salesId);
    const result = await getTransferDetailsForPreview(salesId);
    console.log(result);
    setStorageAddress(result?.data?.address);
    setStoragePhoneNo(result?.data?.phoneNo);
  };

  return (
    <>
      {selectedPrinter === "laser" ? (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{storageAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{storagePhoneNo}</h4>
          </p>
        </div>
      ) : (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{storageAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{storagePhoneNo}</h4>
          </p>
        </div>
        // <header style={{ display: "flex", justifyContent: "center" }}>
        //   <div>
        //     <h1
        //       className="font-bold uppercase tracking-wide text-4xl mb-3"
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         fontSize: "14px", // Decrease the font size to 16px
        //         marginTop: "-15px",
        //         marginBottom: "-5px",
        //       }}
        //     >
        //       Qureshi Electronics
        //     </h1>
        //     <p
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         fontSize: "10px", // Decrease the font size to 16px
        //         marginTop: "0px",
        //         marginTop: "0px",
        //       }}
        //     >
        //       {storageAddress}
        //     </p>
        //     <p
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         fontSize: "10px", // Decrease the font size to 16px
        //         marginTop: "0px",
        //         marginBottom: "0px",
        //       }}
        //     >
        //       {storagePhoneNo && (
        //         <span
        //           style={{
        //             fontWeight: "bold",
        //             display: "flex",
        //             justifyContent: "center",
        //             fontSize: "10px", // Decrease the font size to 16px
        //             marginTop: "0px",
        //             marginBottom: "0px",
        //           }}
        //         >
        //           Phone No: &nbsp;
        //         </span>
        //       )}
        //       {storagePhoneNo}
        //     </p>
        //   </div>
        // </header>
      )}
    </>
  );
}
