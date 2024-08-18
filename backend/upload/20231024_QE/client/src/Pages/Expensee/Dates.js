import { useContext } from "react";
import { Statee } from "./context/stateContext";
import { useSelector } from "react-redux";
let data = "";
export default function Dates({selectedPrinter}) {
  const { invoiceNumber } = useContext(Statee);
  const currentDate = new Date();
  const {user} = useSelector((state)=> state.user)
  const formattedDate = currentDate.toLocaleDateString();
  return (
    <>

        {user?.user?.printerId?.printerTyper == "Laser" ? (
           <table style={{whiteSpace:"nowrap",justifyContent: "center", marginTop: "20px", marginLeft: "100px", borderBottom: "2px solid black"}}>
             <tr>
                  <td>
                  <span className="font-bold td1" >Invoice date:&nbsp;&nbsp;</span>{formattedDate}
                  </td>
                </tr>
                <tr>
                  <td>
                  <span className="font-bold td1" >Invoice Number::&nbsp;&nbsp;</span>{invoiceNumber}
                  </td>
                </tr>
           </table>
    
        ) : (
          <ul style={{ fontSize: '10px' }}>
          <li style={{ marginTop: "10px", padding: "0px", marginBottom: "10px" }}>
            <span className="font-bold" >Invoice date: </span>
            {formattedDate}
          </li>
          <li>
            <span className="font-bold">Invoice Number: </span>
            {invoiceNumber}
          </li>
        </ul>
        )}
    </>
  );
}
