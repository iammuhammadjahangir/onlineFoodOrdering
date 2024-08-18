import React, { useContext, useEffect } from "react";
import { State } from "../context/ContextSales";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "../../stylee/tableStyling.css";
import Tablee from "./table";
import Header from './Header'
import Dates from './Dates'
import PrinterSelectionDropdown from "../../purchaseRecipt/PrinterSelectionDropdown";
import { getSpecificSaleProduct } from "../../actions/saleProductAction";
export default function Table() {
  const { salesId, salesRef } = useContext(State);
  const [productss, setProductss] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [selected, setselected] = useState(false)
  const navigate = useNavigate();

  const [selectedPrinter, setSelectedPrinter] = useState();

  const handleSelectPrinter = (printer) => {
    setSelectedPrinter(printer);
    setselected(true)
  };

  useEffect(()=>{
    getspecificDataforInvoice()
  }, [])

  const getspecificDataforInvoice = async () => {
    let result = await getSpecificSaleProduct(salesId);
    setProductss(result?.products);
    setLoading(true);
  };
  const backHandle = () => {
    navigate("/Salerecord");
  };

  return (
    <>
      <Button
        positive
        style={{ marginTop: "40px", marginLeft: "80px" }}
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
              selected ? (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Downloads
              </button>
              ):(<h1></h1>)
            )}
            content={() => salesRef.current}
          />
          <div ref={salesRef} className="p-5">
          <div style={{ border: "2px solid black", marginRight: "20px", padding: "15px", paddingBottom: "0px",  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
            <Header selectedPrinter={selectedPrinter}/>
            <Dates selectedPrinter={selectedPrinter}/>
             <Tablee selectedPrinter={selectedPrinter}/>
            {/* <Header selectedPrinter={selectedPrinter}/> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
