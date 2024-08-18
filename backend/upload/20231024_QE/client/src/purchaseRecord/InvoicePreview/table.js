import React, { useContext, useEffect } from "react";
import { State } from "../context/ContextSales";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getPurchaseDetail, getStorage } from "../../Api";
import { useCustomState } from "../../Variables/stateVariables";
import "../../stylee/tableStyling.css";
import PrintTableComponent from "../../Components/tableComponent/printTableComponent";
import TableComponentId from "../../Components/tableComponent/tableComponentId";
import PrintLaserTable from "../../Components/tableComponent/printLaserTable";
import { getPurchaseDetailForPreview } from "../../actions/purchaseAction";
export default function Tablee({ selectedPrinter }) {
  const { salesId, setSalesId, salesRef } = useContext(State);
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
    let result = await getPurchaseDetailForPreview(salesId);
    // console.log(result)
    setInvoicedata(result?.data);
    setProducts(result?.data?.products);
    setLoading(true);
  };

  const backHandle = () => {
    navigate("/purchaseRecord");
  };

  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "purchasePrice", label: "Price" },
    { field: "PurchaseQuantity", label: "Quantity" },
    { field: "purchaseQuantityPrice", label: "Total Price" },
    { field: "purchaseTotalTax", label: "Tax Amount" },
    { field: "purchaseTotalDiscount", label: "Discount" },
    { field: "purchaseTotalAmount", label: "Total Amount" },
  ];
  return (
    <>
      <div>
        {selectedPrinter === "thermal" ? (
          <PrintTableComponent data={Products} columns={columns} />
        ) : (
          <PrintLaserTable data={Products} columns={columns} />
        )}
      </div>

      <div>
        <h2
          className="flex items-end justify-end text-gray-800 font-bold"
          style={{ fontSize: "16px" }}
        >
          Grand Total. {invoicedata.total}
        </h2>
      </div>
    </>
  );
}
