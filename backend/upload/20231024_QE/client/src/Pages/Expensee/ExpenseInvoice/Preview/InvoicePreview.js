import React, { useContext, useEffect, useRef } from "react";
// import { State } from "../context/ContextSales";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { getPurchaseDetail } from "../../Api";
import { useCustomState } from "../../../../Variables/stateVariables";
// import "../../stylee/tableStyling.css";
import { Statee } from "../../context/stateContext";
// import { getExpenseDetail } from "../../../../Api";
import PrinterSelectionDropdown from "../../../../purchaseRecipt/PrinterSelectionDropdown";
import Tablee from "./table";
import Header from "./headers";
import Dates from "./Dates";
import { getExpenseDetail, getExpenseDetailsForPreview } from "../../../../actions/expenseAction";
export default function Table() {
  const { salesId, setSalesId, storageAddress, storagePhoneNo } =
    useContext(Statee);
  const [expenseResult, setExpenseResult] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [selected, setSelected] = useState(false)

  const handleSelectPrinter = (printer) => {
    setSelectedPrinter(printer);
    setSelected(true)
  };

  const salesRef = useRef();
  const {
    invoicedata,
    setInvoicedata,
    Products,
    setProducts,
    loading,
    setLoading,
  } = useCustomState();
  const navigate = useNavigate();

  useEffect(() => {
    getspecificDataforInvoice();
  }, []);

  const getspecificDataforInvoice = async () => {
    // let result = await getPurchaseDetail(salesId);
    // setInvoicedata(result);

    let result = await getExpenseDetail(salesId);
    // console.log(result);
    // console.log(result.expenses);

    setProducts(result.expenses);
    setExpenseResult(result);

    // console.log(salesId);
    setLoading(true);
  };

  const backHandle = () => {
    navigate("/expenseInvoice");
  };

  return (
    <>
      <Button
        positive
        style={{ marginTop: "40px", marginLeft: "40px" }}
        onClick={backHandle}
      >
        Back
      </Button>
      {loading && (
        <div
          className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200 "
          style={{ marginTop: "30px", margin: "100px" }}
        >
          <PrinterSelectionDropdown
            selectedPrinter={selectedPrinter}
            onSelectPrinter={handleSelectPrinter}
          />
          <ReactToPrint
            trigger={() => (
              selected ?(
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Downloads
              </button>):(<h1></h1>)
            )}
            content={() => salesRef.current}
          />
          <div ref={salesRef} className="p-5">
          <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "0px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
            <Header selectedPrinter={selectedPrinter}/>
            <Dates selectedPrinter={selectedPrinter}/>
            <Tablee selectedPrinter={selectedPrinter}/> 
            </div>
          </div>
        </div>
      )}
    </>
  );
}
