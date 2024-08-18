import React, { useContext } from "react";
import { Statee } from "./context/stateContext";
import logo from "./pos.png";
// import QRCodee from "./QRCode";
import QRCode from "react-qr-code";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import PrintTableComponent from "../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../Components/tableComponent/printLaserTable"
import { useSelector } from "react-redux";
export default function Table({ selectedPrinter }) {
  const action4 = "salePage";
  const {
    list,
    total,
    GrandQuantityTotal,
    GrandTotalExludeTex,
    GrandTotalTax,
    GrandDiscount,
    setGrandQuantityTotal,
    GrandPriceTotal,
    setGrandPriceTotal,
    setGrandTotalExludeTex,
    setGrandTotalTax,
    setGrandDiscount,
    fbrInvoiceNumber,
  } = useContext(Statee);
  const {user} = useSelector((state)=> state.user)
  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "color", label: "Color" },
    { field: "Company", label: "Company" },
    { field: "PurchaseQuantity", label: "Qty" },
    { field: "excludeTaxPrice", label: "Price" },
    { field: "Discount", label: "Disc" },
    { field: "totalAmounnt", label: "Total" },
    { field: "taxAmount", label: "Tax" },
    { field: "amount", label: "Due Amount" },
  ];
  const column2 = [
    { field: "PurchaseQuantity", label: "Qty" },
    { field: "purchaseTotalDiscount", label: "Disc" },
    { field: "purchaseQuantityPrice", label: "Ttl_Price" },
    { field: "purchaseTotalTax", label: "Tax" },
    { field: "purchaseTotalAmount", label: "Total_Amount" },
  ];
  return (
    <>
      {user?.user?.printerId?.printerType === "Laser" ? (
        <PrintLaserTable data={list} columns={columns} action4={action4} />
      ) : (
        <PrintTableComponent
          data={list}
          columns={columns}
          column2={column2}
          action4={action4}
        />
      )}

      {fbrInvoiceNumber === "" ? (
        <h1></h1>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
        >
          <img src={logo} alt="Logo" style={{ height: "80px" }} />
          <QRCode
            style={{ height: "77px", width: "77px", marginLeft: "10px" }}
            value={fbrInvoiceNumber}
          />
        </div>
      )}
    </>
  );
}
