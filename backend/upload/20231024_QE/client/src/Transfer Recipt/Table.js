import React, { useContext } from "react";
// import { State } from "./context/stateContext";
import { Statte } from "./context/stateContext";
import TableComponentId from "../Components/tableComponent/tableComponentId";
import PrintTableComponent from "../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../Components/tableComponent/printLaserTable"
import { useSelector } from "react-redux";
export default function Table({ selectedPrinter }) {
  const { list, total } = useContext(Statte);
  const {user} = useSelector((state)=> state.user)
  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "Company", label: "Company" },
    { field: "Color", label: "Color" },
    { field: "PurchaseQuantity", label: "Quantity" },
  ];
  return (
    <>
     {user?.user?.printerId?.printerType === "Laser" ? (
      <PrintLaserTable data={list} columns={columns} />
      ) : (
      <PrintTableComponent data={list} columns={columns} />
      )}
    </>
  );
}
