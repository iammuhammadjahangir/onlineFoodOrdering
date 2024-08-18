import React, { useContext, useState, useEffect } from "react";
import { State } from "./context/stateContext";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import PrintTableComponent from "../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../Components/tableComponent/printLaserTable";
import { useSelector } from "react-redux";
export default function Table({ selectedPrinter }) {
  const [colorTheme, setColorTheme] = useState("theme-white");
  const { listpurchase, total } = useContext(State);
  const { user } = useSelector((state) => state.user);
  console.log(listpurchase);

  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);
  const columns = [
    { field: "Code", label: "Code" },
    // {field: 'Namee', label: 'Name'},
    // {field: 'Company', label: 'Company'},
    { field: "Color", label: "Color" },
    { field: "purchasePrice", label: "Price" },
    { field: "PurchaseQuantity", label: "Qty" },
    { field: "purchaseQuantityPrice", label: "Total" },
    { field: "purchaseTotalTax", label: "Tax" },
    // { field: "expeseTotal", label: "Expenses" },
    { field: "purchaseTotalDiscount", label: "Disc." },
    // {field: 'purchaseProductTotalAmount', label: 'Actual Price'},
    { field: "purchaseTotalAmount", label: "Due Amount" },

    // {field: 'Amount', label: ''},
  ];

  return (
    <>
      {/* <div className={`App ${colorTheme}`}> */}
      <div>
        {user?.user?.printerId?.printerType === "Laser" ? (
          <PrintLaserTable data={listpurchase} columns={columns} />
        ) : (
          <PrintTableComponent data={listpurchase} columns={columns} />
        )}
      </div>

      <div>
        {selectedPrinter === "laser" ? (
          <h2
            className="flex items-end justify-end text-gray-800 font-bold"
            style={{ marginTop: "0px", fontSize: "16px" }}
          >
            Grand Total. {total.toLocaleString()}
          </h2>
        ) : (
          <h2
            className="flex items-end justify-end text-gray-800 font-bold"
            style={{ marginTop: "0px", fontSize: "16px" }}
          >
            Grand Total. {total.toLocaleString()}
          </h2>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
