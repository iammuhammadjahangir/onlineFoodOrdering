import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Statee } from "../../context/stateContext"
// import { getExpenseDetail } from "../../../../Api";
import PrintTableComponent from "../../../../Components/tableComponent/printTableComponent"
import TableComponentId from "../../../../Components/tableComponent/tableComponentId"
import PrintLaserTable from "../../../../Components/tableComponent/printLaserTable"
import { getExpenseDetail, getExpenseDetailsForPreview } from "../../../../actions/expenseAction";
export default function Tablee({selectedPrinter}) {
    const { salesId, setSalesId, storageAddress, storagePhoneNo } =
    useContext(Statee);
    
    const [products, setProducts]=useState();
  const [expenseResult, setExpenseResult] = useState("");
  const [loading, setLoading]=useState(false)
  
  // const [selectedPrinter, setSelectedPrinter] = useState('thermal');
  const navigate = useNavigate();


  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  const getspecificDataforInvoice = async () => {
    let result = await getExpenseDetail(salesId);
    setProducts(result?.data?.expenses);
    setExpenseResult(result?.data);
    setLoading(true);
  };

  const backHandle = () => {
    navigate("/purchaseRecord");
  };

  const columns=[
    {field: 'expenseType', label: 'Expense Type'},
    {field: 'expenseDescription', label: 'Expense Description'},
    {field: 'expenseAmount', label: 'Amount'},
  ]
  return (
    <>
      <div>
      {selectedPrinter === "thermal" ? (
        <PrintTableComponent data={products} columns={columns} />
      ) : (
        <PrintLaserTable data={products} columns={columns} />
      )}
      </div>

      <div>
        <h2
          className="flex items-end justify-end text-gray-800 font-bold"
          style={{ fontSize: "16px" }}
        >
          Grand Total. {expenseResult.expenseTotal}
        </h2>
      </div>  
    </>
  );
}
