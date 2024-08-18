import React, { useContext, useEffect, useState } from "react";
import { State } from "../context/ContextSales";
import "../../stylee/tableStyling.css";
import QRCode from "react-qr-code";
import logo from "./pos.png";
import PrintTableComponent from "../../Components/tableComponent/printTableComponent";
import PrintLaserTable from "../../Components/tableComponent/printLaserTable"
import { getSpecificSaleProduct } from "../../actions/saleProductAction";

let quantity = [];
let discount = [];
let totalAmount = [];
let taxAmount = [];
let amount = [];
export default function Tablee({ selectedPrinter }) {
  let action4 = "salesRecipt";
  const { salesId } = useContext(State);
  let productsforlisting = [];
  const [invoicedata, setInvoicedata] = useState([]);
  const [productss, setProductss] = useState([""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getspecificDataforInvoice();
  }, []);
  
  const getspecificDataforInvoice = async () => {
    let result = await getSpecificSaleProduct(salesId);
    console.log(result)
    setInvoicedata(result?.data);
    productsforlisting = result?.data?.products;

    quantity = productsforlisting?.reduce((sum, product) => sum + parseInt(product.PurchaseQuantity, 10), 0)
      .toString();
    discount = productsforlisting?.reduce((sum, product) => sum + parseFloat(product.Discount), 0)
      .toString();
    totalAmount = productsforlisting?.reduce((sum, product) => sum + parseFloat(product.totalAmounnt), 0)
      .toString();
    taxAmount = productsforlisting?.reduce((sum, product) => sum + parseFloat(product.taxAmount), 0)
      ?.toString();
    amount = productsforlisting?.reduce((sum, product) => sum + parseFloat(product.amount), 0)
      .toString();
    taxAmount = Number(taxAmount);
    taxAmount = taxAmount.toFixed(2);
    setProductss(result?.data?.products);
    setLoading(true);
  };

  const columns = [
    { field: "Code", label: "Code" },
    { field: "Namee", label: "Name" },
    { field: "color", label: "Color" },
    { field: "Company", label: "Company" },
    { field: "PurchaseQuantity", label: "Quantity" },
    { field: "excludeTaxPrice", label: "Price" },
    { field: "Discount", label: "Discount" },
    { field: "totalAmounnt", label: "Total Price" },
    { field: "taxAmount", label: "Tax Amount" },
    { field: "amount", label: "Total Amount" },
  ];
  const column2 = [
    { field: "PurchaseQuantity", label: "Qty" },
    { field: "purchaseTotalDiscount", label: "Discount" },
    { field: "purchaseQuantityPrice", label: "Ttl_Price" },
    { field: "purchaseTotalTax", label: "Tax_Amount" },
    { field: "purchaseTotalAmount", label: "Total_Amount" },
  ];
  return (
    <>
      {loading ? (
        <>
          <div>
            {selectedPrinter === "thermal" ? (
              <PrintTableComponent
                data={productss}
                columns={columns}
                column2={column2}
                action4={action4}
                ConsolidatedInvoiceTotalquantity={quantity}
                ConsolidatedInvoiceTotaldiscount={discount}
                ConsolidatedInvoiceTotaltotalPriceExculdingTax={totalAmount}
                ConsolidatedInvoiceTotaltotalTaxAmount={taxAmount}
                ConsolidatedInvoiceTotalIncludingAllPrices={amount}
              />
            ) : (
              <PrintLaserTable
                data={productss}
                columns={columns}
                action4={action4}
                ConsolidatedInvoiceTotalquantity={quantity}
                ConsolidatedInvoiceTotaldiscount={discount}
                ConsolidatedInvoiceTotaltotalPriceExculdingTax={totalAmount}
                ConsolidatedInvoiceTotaltotalTaxAmount={taxAmount}
                ConsolidatedInvoiceTotalIncludingAllPrices={amount}
              />
            )}
          </div>

          {invoicedata?.invoiceNumber === "" ? (
            <h1></h1>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
              }}
            >
              <img src={logo} alt="Logo" style={{ height: "80px" }} />
              {invoicedata?.invoiceNumber && (
                <QRCode
                  style={{
                    height: "77px",
                    width: "77px",
                    marginLeft: "10px",
                  }}
                  value={invoicedata?.invoiceNumber}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <h1></h1>
      )}

      {/* <div>
        <h2
          className="flex items-end justify-end text-gray-800 font-bold"
          style={{ fontSize: "16px" }}
        >
          Grand Total. {invoicedata.total}
        </h2>
      </div>   */}
    </>
  );
}
