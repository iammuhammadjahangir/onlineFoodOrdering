import { useContext } from "react";
import { Statee } from "./context/stateContext";
import { useSelector } from "react-redux";
import "./SaleReciptCss/sale.css";
export default function Header({ selectedPrinter }) {
  const {
    storageAddress,
    storagePhoneNo,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
  } = useContext(Statee);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user?.user?.printerId?.printerType === "thermal" ? (
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "2px solid black",
          }}
        >
          <div>
            <h1
              className="font-bold uppercase tracking-wide text-4xl mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "14px", // Decrease the font size to 16px
                marginTop: "-15px",
                marginBottom: "-5px",
              }}
            >
              Qureshi Electronics
            </h1>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "10px", // Decrease the font size to 16px
                marginTop: "0px",
                marginTop: "0px",
              }}
            >
              {shopAddress}
            </p>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "10px", // Decrease the font size to 16px
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              {shopPhoneNo && (
                <span
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "10px", // Decrease the font size to 16px
                    marginTop: "0px",
                    marginBottom: "0px",
                  }}
                >
                  Phone No: &nbsp;
                </span>
              )}
              {shopPhoneNo}
            </p>
          </div>
          {/* </div> */}
        </header>
      ) : (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{shopAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{shopPhoneNo}</h4>
          </p>
        </div>
        //   <header style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid black" }}>
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
      )}
    </>
  );
}
