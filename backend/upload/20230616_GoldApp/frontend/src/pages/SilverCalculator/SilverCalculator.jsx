import React, { Fragment, useState, useEffect } from "react";
import "./SilverCalculator.css";
import { getGlobalRatesDetails } from "../../actions/ratesMetalAction.jsx";

import MetalsConvertor from "../GoldCalculator/MetalsConvertor.jsx";
import PageLoader from "../../component/PageLoader/PageLoader.jsx";

let silverInOunce;
let silverInTola;
let silverInGram;
const SilverCalculator = () => {
  //useStates for other Gold Calculaton
  const [metalsData, setMetalsData] = useState([]);
  const [currencyPKR, setCurrencyPKR] = useState();
  const [silverInOuncePKR, setSilverInOuncePKR] = useState(0);
  const [silverInTolaPKR, setSilverInTolaPKR] = useState(0);
  const [silverInGramPKR, setSilverInGramPKR] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    getGlobalRates();
  }, []);

  const getGlobalRates = async () => {
    let data = await getGlobalRatesDetails();

    // console.log("====================================");
    // console.log(data);
    // console.log("====================================");
    const currencyData = Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => key === "PakistaniRupee_Currency_PKR"
      )
    );
    // console.log("====================================");
    // console.log(currencyData.PakistaniRupee_Currency_PKR);
    // console.log("====================================");
    setCurrencyPKR(currencyData.PakistaniRupee_Currency_PKR);

    const metalData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key === "Silver_Ask_Metals_XAG")
    );
    // console.log("====================================");
    // console.log(metalData.Silver_Ask_Metals_XAG);
    // console.log("====================================");
    setMetalsData(metalData.Silver_Ask_Metals_XAG);
    silverInOunce = 1 / metalData.Silver_Ask_Metals_XAG;
    silverInTola = silverInOunce / 2.26796185;
    silverInGram = silverInOunce / 28.3495;
    setSilverInOuncePKR(
      silverInOunce * currencyData.PakistaniRupee_Currency_PKR
    );
    setSilverInTolaPKR(silverInTola * currencyData.PakistaniRupee_Currency_PKR);
    setSilverInGramPKR(silverInGram * currencyData.PakistaniRupee_Currency_PKR);
    setLoading(true);

    // console.log("====================================");
    // console.log(silverInOunce * currencyData.PakistaniRupee_Currency_PKR);
    // console.log(silverInTola * currencyData.PakistaniRupee_Currency_PKR);
    // console.log(silverInGram * currencyData.PakistaniRupee_Currency_PKR);
    // console.log("====================================");
  };
  return (
    <Fragment>
      {!loading ? (
        <PageLoader />
      ) : (
        <div>
          <MetalsConvertor
            heading="Silver Calculate in Gram"
            metal="Gram"
            pkr={currencyPKR}
            metalValue={silverInGramPKR}
            heading2="Silver"
          />
          <MetalsConvertor
            heading="Silver Calculate in Tola"
            metal="Tola"
            pkr={currencyPKR}
            metalValue={silverInTolaPKR}
            heading2="Silver"
          />
          <MetalsConvertor
            heading="Silver Calculate in Ounce"
            metal="Ounce"
            pkr={currencyPKR}
            metalValue={silverInOuncePKR}
            heading2="Silver"
          />
        </div>
      )}
    </Fragment>
  );
};

export default SilverCalculator;
