import React, { useContext, useEffect } from "react";
import { State } from "../context/ContextSales"
import ReactToPrint from "react-to-print";
import { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getPurchaseDetail, getStorage } from "../../Api";
import { useCustomState } from "../../Variables/stateVariables";
import PrinterSelectionDropdown from "../../purchaseRecipt/PrinterSelectionDropdown";
import "../../stylee/tableStyling.css";
import Header from "./headers";
import Tablee from "./table";
import Dates from "./dates";
export default function Table() {
  const [storageAddress, setStorageAddress] = useState("");
  const [storagePhoneNo, setStoragePhoneNo] = useState("");
  const { salesId, setSalesId, salesRef } = useContext(State);
  const [selected, setselected] = useState(false)
  const {
    invoicedata,
    setInvoicedata,
    Products,
    setProducts,
    loading,
    setLoading,
  } = useCustomState();
  const navigate = useNavigate();


  const [selectedPrinter, setSelectedPrinter] = useState();

  const handleSelectPrinter = (printer) => {
    setSelectedPrinter(printer);
    setselected(true)
  };

  const backHandle = () => {
    navigate("/purchaseRecord");
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
          <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "0px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
            <Header  selectedPrinter={selectedPrinter}/>
            <Dates selectedPrinter={selectedPrinter}/>
            <Tablee selectedPrinter={selectedPrinter}/>
            
          </div>
            {/* <Footer /> */}
          </div>
        </div>
      
    </>
  );
}
