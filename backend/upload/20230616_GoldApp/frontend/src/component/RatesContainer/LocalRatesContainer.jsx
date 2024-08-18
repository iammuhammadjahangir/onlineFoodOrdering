import React, { useState, useEffect } from "react";

//for material ui DropDown
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import TableComponentId from "../tableComponent/tableComponentId";
import { getLocalRatesDetails } from "../../actions/ratesMetalLocalAction";
import socketIO from "socket.io-client";
import { ENDPOINT } from "../../api/index";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//for importing css files
import "./RatesContainer.css";
let page = "localRates";
let decimalPoints = 2;
let resp;
const LocalRatesContainer = () => {
  const [data, setData] = useState([]);
  const [updated, setUpdated] = useState();
  const [open, setOpen] = useState(false);
  //   console.log(data);
  useEffect(() => {
    setOpen(false);
    getData();

    // console.log("www");
    // Subscribe to the "recordUpdate" event from the server
    socket.on("updateRecord", (data) => {
      // Handle record update here
      // console.log("Record updated:", data);
      // You can trigger a fetch or update your local state accordingly
      getData();
      setOpen(true);
    });

    // Unsubscribe on component unmount
    return () => {
      socket.off("recordUpdate");
    };
  }, []);

  const getData = async () => {
    // console.log("Hello");

    resp = await getLocalRatesDetails();
    setUpdated(resp.updatedAt);

    //delete extra elemnt from the response
    delete resp.updatedAt;
    delete resp.success;
    // console.log(resp);
    const localDataArray = [];
    for (var key in resp) {
      // Check if the key ends with "_High" or "_Low"
      const isHigh = key.endsWith("High");
      const isLow = key.endsWith("Low");
      const isPurchase = key.endsWith("Purchase");
      const isSale = key.endsWith("Sale");

      // Extract the metal name without the suffix
      const metalName = isHigh
        ? key.slice(0, -4)
        : isLow
        ? key.slice(0, -3)
        : isPurchase
        ? key.slice(0, -8)
        : isSale
        ? key.slice(0, -4)
        : key;

      // Find or create an entry for the metal in the array
      let metalEntry = localDataArray.find((entry) => entry.name === metalName);

      if (!metalEntry) {
        metalEntry = {
          name: metalName,
          data: {},
        };
        localDataArray.push(metalEntry);
      }

      // Add the value to the corresponding property (normal, high, or low)
      if (isHigh) {
        metalEntry.data.high = resp[key];
      } else if (isLow) {
        metalEntry.data.low = resp[key];
      } else if (isPurchase) {
        metalEntry.data.purchase = resp[key];
      } else if (isSale) {
        metalEntry.data.sale = resp[key];
      } else {
        metalEntry.normal = resp[key];
      }
    }

    // console.log(resp);
    // console.log(localDataArray);
    setData(localDataArray);
  };

  const columns = [
    { field: "name", label: "Instrument" },
    { field: "data.sale", label: "Sale" },
    { field: "data.purchase", label: "Purchase" },
    {
      field: "data",
      label: "Low/High",
      format: "lowHigh",
      render: (item) => `${item.data.low} </br> ${item.data.high}`,
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="ratesMainContainerLocal">
        <div>
          <h1 className="headingContainers">Local Gold Rates</h1>
        </div>
        <div className="outerContainerLocal">
          <div className="containerHeaderLocal">
            <div>
              <h3 style={{ display: "none" }}>{updated}</h3>
            </div>
            <div>
              <h3>{updated}</h3>
            </div>
          </div>
          <div className="mainContainerBoxLocal">
            <TableComponentId
              data={data}
              columns={columns}
              pages={page}
              fixedPoints={decimalPoints}
            />
          </div>
        </div>
      </div>

      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Local Rates Updated
        </Alert>
      </Snackbar>
    </>
  );
};

export default LocalRatesContainer;
