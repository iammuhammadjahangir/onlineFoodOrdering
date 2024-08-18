import { useContext } from "react";
// import { State } from "./context/stateContext";
import { getStorage } from "../../../Api";
import { useEffect, useState } from "react";
let StorageAddress
export default function Footer() {
//   const { storageAddress, storagePhoneNo } = useContext(State);
    // const [storageAddress, setStorageAddress] = useState('')
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
          const newDate = new Date();
          if (newDate.toDateString() !== currentDate.toDateString()) {
            setCurrentDate(newDate);
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [currentDate]);
       ///////==========================================////
  //========== set time =========/////////
  /////========================================/////////
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup when the component unmounts
  });

  return (
    <>
 <table style={{whiteSpace:"nowrap",justifyContent: "center", marginTop: "20px", marginLeft: "100px"}}  >
        <tbody>
          <tr >
           <td>
            Printed On {currentDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })} at {currentTime.toLocaleTimeString()}
           </td>
            
          </tr>
        </tbody>
      </table>
    </>
  )
}