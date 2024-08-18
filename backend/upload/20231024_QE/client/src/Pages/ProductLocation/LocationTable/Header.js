import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { State } from "./context/stateContext";
// import { getStorage } from "../../../Api";

import { useEffect, useState } from "react";
// let StorageAddress;
export default function Header({ selectedPrinter }) {
//   const { storageAddress, storagePhoneNo } = useContext(State);
    // const [storageAddress, setStorageAddress] = useState('')
    const [storagePhoneNo, setStoragePhoneNo] = useState('')
    const [storageAddress, setStorageAddress] = useState('')
    const { storage } = useSelector((state)=> state.storage)
  // useEffect(() => {
  //   call();
  // }, []);

  useEffect(()=> {
    if(storage === "Something went wrong"){
      console.log(storage)
    }
    else{
      if(storage?.length > 0){
      console.log(storage)
      let Filtered = storage?.filter((data) => {
        // console.log(data.storageCode);
        // console.log(JSON.parse(localStorage.getItem("shopId")));
        if (
          JSON.parse(localStorage.getItem("shopId")) &&
          !data.storageCode
            .toString()
            .toLowerCase()
            .includes(
              JSON.parse(localStorage.getItem("shopId"))
                .toString()
                .toLowerCase()
            )
        ) {
          return false;
        }

        return true;
      });
      console.log(Filtered)
      // setStorageAddress(Filtered[0].storageAddress);
      setStorageAddress(Filtered[0]?.storageAddress);
      setStoragePhoneNo(Filtered[0]?.storagePhoneNo);
    }}
  }, [storage])

//   async function call() {
//     let resp = await getStorage().then((resp) => {
//       // console.warn(resp);
//       if (resp) {
//         let Filtered = resp?.filter((data) => {
//           // console.log(data.storageCode);
//           // console.log(JSON.parse(localStorage.getItem("shopId")));
//           if (
//             JSON.parse(localStorage.getItem("shopId")) &&
//             !data.storageCode
//               .toString()
//               .toLowerCase()
//               .includes(
//                 JSON.parse(localStorage.getItem("shopId"))
//                   .toString()
//                   .toLowerCase()
//               )
//           ) {
//             return false;
//           }

//           return true;
//         });
//         console.log(Filtered[0].storageAddress)
       
//         // setStorageAddress(Filtered[0].storageAddress);
//         setStoragePhoneNo(Filtered[0].storagePhoneNo);
//       }
//     });
// }
  return (
    <>
    <header
      style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid black" }}
      >
        <div>
          <h1
            className="font-bold uppercase tracking-wide text-4xl mb-3"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px", // Decrease the font size to 16px
              marginTop: "-15px",
              marginBottom: "-5px",
            }}
          >
            Qureshi Electronics
          </h1>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "16px", // Decrease the font size to 16px
              marginTop: "0px",
              marginTop: "0px",
            }}
          >
            {storageAddress}
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "16px", // Decrease the font size to 16px
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            {storagePhoneNo && (
              <span
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "16px", // Decrease the font size to 16px
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              >
                Phone No: &nbsp;
              </span>
            )}
            {storagePhoneNo}
          </p>
        </div>
      </header>
    </>
  )
}