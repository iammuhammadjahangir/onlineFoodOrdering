import React, { useContext } from "react";
// import { State } from "./context/stateContext";
import { Statee } from "./context/stateContext";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import PrintTableComponent from "../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../Components/tableComponent/printLaserTable"
export default function Table({ selectedPrinter }) {
  const { expenses, total, expenseTotal, setExpenseTotal } = useContext(Statee);
  const columns=[
    {field: 'expenseType', label: 'Expense Type'},
    {field: 'expenseDescription', label: 'Expense Description'},
    {field: 'expenseAmount', label: 'Amount'},
  ]

  return (
    <>
      
        <div>
        {selectedPrinter === "laser" ? (
        <PrintLaserTable data={expenses} columns={columns} />
        ):(
          <PrintTableComponent data={expenses} columns={columns}/>
        )}
    </div>
    {
      expenses  && expenses?.length > 0 ? (
      <div>
        <h2
          className="flex items-end justify-end text-gray-800 font-bold"
          style={{ fontSize: "1.7rem" }}
        >
          Grand Total. {expenseTotal.toLocaleString()}
        </h2>
      </div>
      ):(
        <h1></h1>
      )
      }
    </>
  );
}
