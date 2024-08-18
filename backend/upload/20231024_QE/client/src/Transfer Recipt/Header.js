import { Statte } from "./context/stateContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import "./transferReciptCss/transfer.css";
export default function Header({ selectedPrinter }) {
  const {
    storageAddress,
    storagePhoneNo,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
  } = useContext(Statte);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user?.user?.printerId?.printerType === "Laser" ? (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{shopAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{shopPhoneNo}</h4>
          </p>
        </div>
      ) : (
        // <header
        //   style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid black" }}
        // >
        //   <div>
        //     <h1
        //       className="font-bold uppercase tracking-wide text-4xl mb-3"
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         fontSize: "20px", // Decrease the font size to 16px
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
        //         fontSize: "16px", // Decrease the font size to 16px
        //         marginTop: "0px",
        //         marginTop: "0px",
        //       }}
        //     >
        //       {shopAddress}
        //     </p>
        //     <p
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         fontSize: "16px", // Decrease the font size to 16px
        //         marginTop: "0px",
        //         marginBottom: "0px",
        //       }}
        //     >
        //       {shopPhoneNo && (
        //         <span
        //           style={{
        //             fontWeight: "bold",
        //             display: "flex",
        //             justifyContent: "center",
        //             fontSize: "16px", // Decrease the font size to 16px
        //             marginTop: "0px",
        //             marginBottom: "0px",
        //           }}
        //         >
        //           Phone No: &nbsp;
        //         </span>
        //       )}
        //       {shopPhoneNo}
        //     </p>
        //   </div>
        // </header>
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{shopAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{shopPhoneNo}</h4>
          </p>
        </div>
        //   <header
        //   style={{
        //     display: "flex",
        //     justifyContent: "center",
        //     marginBottom: "0px",
        //   }}
        // >
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
        //       {shopAddress}
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
        //       {shopPhoneNo && (
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
        //       {shopPhoneNo}
        //     </p>
        //   </div>
        // </header>
      )}
    </>
  );
}
