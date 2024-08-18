import React, { useState, useEffect, Fragment } from "react";
import { getGlobalRatesDetails } from "../../actions/ratesMetalAction";

//importing Component
import RatesContainer from "../../component/RatesContainer/RatesContainer.jsx";

//importing css file
import "./Home.css";
import LocalRatesContainer from "../../component/RatesContainer/LocalRatesContainer.jsx";
import MetalContainer from "../../component/RatesContainer/MetalContainer.jsx";
import PageLoader from "../../component/PageLoader/PageLoader.jsx";

let globalDataFetch;
const Home = () => {
  const [loadData, setLoadData] = useState(false);
  const [globalCurrency, setGlobalCurrency] = useState([]);
  const [globalMetal, setGlobalMetal] = useState([]);
  const [updatedAt, setUpdatedAt] = useState();
  useEffect(() => {
    setLoadData(false);
    getMetalRates();
    setInterval(() => {
      getMetalRates();
    }, 1805000);
  }, []);

  const getMetalRates = async () => {
    globalDataFetch = await getGlobalRatesDetails();
    // console.log(globalDataFetch);

    // Separate currency and metals data
    const currencyData = Object.fromEntries(
      Object.entries(globalDataFetch).filter(([key]) =>
        key.includes("Currency")
      )
    );

    //Converting Object Into array for Table
    const arrayCurrency = convertDataIntoArray(currencyData);
    let metalEntry = {
      name: "USDDollar_Currency_USD",
      metalSplitedName: "USDDollar",
      displayName: `USD (USDDollar)`,
      symbol: "USD",
      normal: 1,
      data: {
        low: 1,
        high: 1,
      },
    };
    arrayCurrency.push(metalEntry);

    const metalsData = Object.fromEntries(
      Object.entries(globalDataFetch).filter(([key]) => key.includes("Metals"))
    );
    //Converting Object Into array for Table
    const arrayMetal = convertMetalsIntoArray(metalsData);
    const arrayWithBidAsk = addASKBID(arrayMetal);

    setUpdatedAt(globalDataFetch.updatedAt);
    setGlobalCurrency(arrayCurrency);
    setGlobalMetal(arrayWithBidAsk);
    setLoadData(true);
  };

  const convertDataIntoArray = (dataObject) => {
    const metalArray = [];

    // Iterate through each metal in the original data
    for (const key in dataObject) {
      // Check if the key ends with "_High" or "_Low"
      const isHigh = key.endsWith("_High");
      const isLow = key.endsWith("_Low");

      // Extract the metal name without the suffix
      const metalName = isHigh
        ? key.slice(0, -5)
        : isLow
        ? key.slice(0, -4)
        : key;
      // Extract the metal Symbol without the suffix
      const metalSymbol = isHigh
        ? key.slice(-8, -5)
        : isLow
        ? key.slice(-7, -4)
        : key.slice(-3); // Assuming the normal case

      // console.log(metalSymbol);
      const metalSplitedName = key.split("_")[0];
      // console.log(metalSplitedName);

      // Find or create an entry for the metal in the array
      let metalEntry = metalArray.find((entry) => entry.name === metalName);

      if (!metalEntry) {
        metalEntry = {
          name: metalName,
          metalSplitedName: metalSplitedName,
          displayName: `${metalSymbol} (${metalSplitedName})`,
          symbol: metalSymbol,
          data: {},
        };
        metalArray.push(metalEntry);
      }

      // Add the value to the corresponding property (normal, high, or low)
      if (isHigh) {
        metalEntry.data.high = dataObject[key];
      } else if (isLow) {
        metalEntry.data.low = dataObject[key];
      } else {
        metalEntry.normal = dataObject[key];
      }
    }
    metalArray.push;
    // console.log(metalArray);
    return metalArray;
  };
  const convertMetalsIntoArray = (dataObject) => {
    // console.log(dataObject);
    const metalArray = [];

    // Iterate through each metal in the original data
    for (const key in dataObject) {
      // Check if the key ends with "_High" or "_Low"
      const isHigh = key.endsWith("_High");
      const isLow = key.endsWith("_Low");
      const isBID = key.includes("Bid");
      const isASK = key.includes("Ask");

      // Extract the metal name without the suffix
      const metalName = isHigh
        ? key.slice(0, -5)
        : isLow
        ? key.slice(0, -4)
        : key;
      // Extract the metal Symbol without the suffix
      const metalSymbol = isHigh
        ? key.slice(-8, -5)
        : isLow
        ? key.slice(-7, -4)
        : key.slice(-3); // Assuming the normal case

      // console.log(metalName);
      // console.log(metalSymbol);
      const metalSplitedName = key.split("_")[0];
      // console.log(metalSplitedName);

      // Find or create an entry for the metal in the array
      let metalEntry = metalArray.find(
        (entry) => entry.metalSplitedName === metalSplitedName
      );

      if (!metalEntry) {
        metalEntry = {
          name: metalName,
          metalSplitedName: metalSplitedName,
          displayName: `${metalSymbol} (${metalSplitedName})`,
          symbol: metalSymbol,
          data: {},
        };
        metalArray.push(metalEntry);
      }

      // Add the value to the corresponding property (normal, high, or low)
      if (isHigh && (isASK || isBID)) {
        // console.log(metalName, "High", metalEntry.data.high);
        metalEntry.data.high < dataObject[key] ||
        metalEntry.data.high === undefined
          ? (metalEntry.data.high = dataObject[key])
          : metalEntry.data.high;
      } else if (
        isHigh &&
        (metalName === "Copper_Metals_XCU" || metalName === "Zinc_Metals_ZNC")
      ) {
        // console.log(metalName, "High", metalEntry.data.high);
        metalEntry.data.high < dataObject[key] ||
        metalEntry.data.high === undefined
          ? (metalEntry.data.high = dataObject[key])
          : metalEntry.data.high;
      } else if (isLow && (isASK || isBID)) {
        metalEntry.data.low > dataObject[key] ||
        metalEntry.data.low === undefined
          ? (metalEntry.data.low = dataObject[key])
          : metalEntry.data.low;
      } else if (
        isLow &&
        (metalName === "Copper_Metals_XCU" || metalName === "Zinc_Metals_ZNC")
      ) {
        metalEntry.data.low > dataObject[key] ||
        metalEntry.data.low === undefined
          ? (metalEntry.data.low = dataObject[key])
          : metalEntry.data.low;
      } else if (isASK && !isHigh && !isLow) {
        metalEntry.data.ask = dataObject[key];
      } else if (isBID && !isHigh && !isLow) {
        metalEntry.data.bid = dataObject[key];
      } else {
        metalEntry.normal = dataObject[key];
      }
    }
    metalArray.push;
    // console.log(metalArray);

    return metalArray;
  };

  const addASKBID = (metalsArray) => {
    // console.log();
    //To check if there is any element which has not a BID and ASK value
    metalsArray.map((element) => {
      const isBid = element.data.bid;
      const isAsk = element.data.ask;

      if (isAsk) {
        // console.log(element.name, " ", isAsk);
      } else if (isBid) {
        // console.log(element.name, " ", isBid);
      } else {
        // console.log(element.name);
        const ask = element.normal;
        const bid = element.normal;
        element.data = { ...element.data, ask, bid };
      }
    });
    // console.log(metalsArray);
    return metalsArray;
  };

  return (
    <Fragment>
      {!loadData ? (
        <PageLoader />
      ) : (
        <div className="homeContainer">
          <div id="local">
            <LocalRatesContainer />
          </div>
          <div id="Currencies">
            <RatesContainer data={globalCurrency} update={updatedAt} />
          </div>
          <div id="metal">
            <MetalContainer data={globalMetal} update={updatedAt} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
