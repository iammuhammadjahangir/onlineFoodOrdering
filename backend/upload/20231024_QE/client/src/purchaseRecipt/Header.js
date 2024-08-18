import { useContext } from "react";
import { State } from "./context/stateContext";
import { useSelector } from "react-redux";
import "./PurchaseCss/purchase.css";
export default function Header({ selectedPrinter }) {
  const {
    storageAddress,
    storagePhoneNo,
    shopAddress,
    setShopAddress,
    shopPhoneNo,
    setShopPhoneNo,
  } = useContext(State);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user?.user?.printerId?.printerType === "thermal" ? (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{shopAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{shopPhoneNo}</h4>
          </p>
        </div>
      ) : (
        <div className="headerHeading">
          <h1 className="invoiceTitle">Qureshi Electronics</h1>
          <p className="invoiceAddress">{shopAddress}</p>
          <p className="invoicePhoneNo">
            <h4>Phone No: &nbsp;{shopPhoneNo}</h4>
          </p>
        </div>
      )}
    </>
  );
}
