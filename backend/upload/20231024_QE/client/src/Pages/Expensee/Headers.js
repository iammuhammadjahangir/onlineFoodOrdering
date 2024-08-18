import { useContext } from "react";
import { Statee } from "./context/stateContext";

export default function Header({ selectedPrinter }) {
  const { storageAddress, storagePhoneNo } = useContext(Statee);

  return (
    <>
    {selectedPrinter === "laser" ?(
      <header style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1
            className="font-bold uppercase tracking-wide text-4xl mb-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Qureshi Electronics
          </h1>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "0px",
            }}
          >
            {storageAddress}
          </p>
          <p style={{ display: "flex", justifyContent: "center" }}>
            {storagePhoneNo && (
              <span style={{ fontWeight: "bold" }}>Phone No: &nbsp;</span>
            )}
            {storagePhoneNo}
          </p>
        </div>
      </header>
      ):(
        <header style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1
             className="font-bold uppercase tracking-wide text-4xl mb-3"
             style={{
               display: 'flex',
               justifyContent: 'center',
               fontSize: '14px', // Decrease the font size to 16px
               marginTop: "60px",
               marginBottom: "-5px",
             }}
          >
            Qureshi Electronics
          </h1>
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '10px', // Decrease the font size to 16px
              marginTop: "0px",
              marginTop: "0px",
            }}
          >
            {storageAddress}
          </p>
          <p style={{ display: "flex", justifyContent: "center", fontSize: '10px', // Decrease the font size to 16px
              marginTop: "0px",
              marginBottom: "0px" }}>
            {storagePhoneNo && (
              <span style={{ fontWeight: "bold",display: 'flex',
              justifyContent: 'center',
              fontSize: '10px', // Decrease the font size to 16px
              marginTop: "0px",
              marginBottom: "0px"
             }}>Phone No: &nbsp;</span>
            )}
            {storagePhoneNo}
          </p>
        </div>
      </header>
      )}
    </>
  );
}
