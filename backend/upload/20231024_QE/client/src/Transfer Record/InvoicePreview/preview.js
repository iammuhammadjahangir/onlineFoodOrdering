import React, { useContext, useEffect } from "react";
import { State } from "../context/ContextSales";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { baseQuery } from "../../app/api/apiSlice";
import "../../stylee/tableStyling.css";
import { getStorage } from "../../Api";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import Header from "./Headers"
import Tablee from "./table";
import Dates from "./Dates";
import PrinterSelectionDropdown from "../../purchaseRecipt/PrinterSelectionDropdown";
export default function Table() {
  const { salesId, setSalesId, salesRef } = useContext(State);
  const [invoicedata, setInvoicedata] = useState([]);
  const [productss, setProductss] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [selected, setSelected] = useState(false)
  const navigate = useNavigate();





  const handleSelectPrinter = (printer) => {
    setSelectedPrinter(printer);
    setSelected(true)
  };

  const backHandle = () => {
    navigate("/TranferPreview");
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
              </button>
              ):(<h1></h1>)
            )}
            content={() => salesRef.current}
          />
          <div ref={salesRef} className="p-5">
          <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "10px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
            <Header selectedPrinter={selectedPrinter}/>
            <Dates selectedPrinter={selectedPrinter}/>
            <Tablee selectedPrinter={selectedPrinter}/>
          </div>
          </div>
        </div>
    
    </>
  );
}
