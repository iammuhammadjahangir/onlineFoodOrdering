import { useContext } from "react";
import { Statee } from "./context/stateContext";
import QRCode from "react-qr-code";

export default function QRCodee() {
  const { invoiceNumber, invoiceDate, dueDate, fbrInvoiceNumber } = useContext(Statee);

  return (
    <>
      <article style={{display:"flex",  height: "75px", width: "75px" , marginLeft:"20px", margin:"0px"}}>
    { fbrInvoiceNumber === "" ? (
       <h1></h1>
       ): (
        <QRCode value={fbrInvoiceNumber}/>
       )
}
      </article>
    </>
  );
}
