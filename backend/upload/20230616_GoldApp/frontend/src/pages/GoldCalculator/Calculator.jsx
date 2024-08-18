import React, { Fragment, useState, useEffect } from "react";
import "./Calculator.css";
import { getLocalRatesDetails } from "../../actions/ratesMetalLocalAction";
import { getGlobalRatesDetails } from "../../actions/ratesMetalAction.jsx";
import PageLoader from "../../component/PageLoader/PageLoader.jsx";

import MetalsConvertor from "./MetalsConvertor.jsx";
let goldInOunce;
let goldInTola;
let goldInGram;
const Calculator = () => {
  const [localratesData, setLocalratesData] = useState({});
  const [offer, setOffer] = useState("1");
  const [gold, setGold] = useState("3");
  const [rate, setRate] = useState("");
  const [isRawa, setIsRawa] = useState(true);
  const [weightRawa, setWeightRawa] = useState(0);
  const [weightNotRawa, setWeightNotRawa] = useState(10);
  const [totalAmount, setTotalAmount] = useState("");
  const [loading, setLoading] = useState(false);

  //useStates for other Gold Calculaton
  const [metalsData, setMetalsData] = useState([]);
  const [currencyPKR, setCurrencyPKR] = useState();
  const [goldInOuncePKR, setGoldInOuncePKR] = useState(0);
  const [goldInTolaPKR, setGoldInTolaPKR] = useState(0);
  const [goldInGramPKR, setGoldInGramPKR] = useState(0);
  useEffect(() => {
    setIsRawa(true);
    setLoading(false);
    setOffer("1");
    setGold("3");
    setRate("");
    setWeightNotRawa(10);
    setWeightRawa(0);
    setTotalAmount("");
    getLocalRates();
    getGlobalRates();
  }, []);

  const getLocalRates = async () => {
    const data = await getLocalRatesDetails();
    setLocalratesData(data);
    setRate(data.RawaPurchase);
    console.log(data);
  };

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
      Object.entries(data).filter(([key]) => key === "Gold_Ask_Metals_XAU")
    );
    // console.log("====================================");
    // console.log(metalData.Gold_Ask_Metals_XAU);
    // console.log("====================================");
    setMetalsData(metalData.Gold_Ask_Metals_XAU);
    goldInOunce = 1 / metalData.Gold_Ask_Metals_XAU;
    goldInTola = goldInOunce / 2.26796185;
    goldInGram = goldInOunce / 28.3495;
    setGoldInOuncePKR(goldInOunce * currencyData.PakistaniRupee_Currency_PKR);
    setGoldInTolaPKR(goldInTola * currencyData.PakistaniRupee_Currency_PKR);
    setGoldInGramPKR(goldInGram * currencyData.PakistaniRupee_Currency_PKR);

    setLoading(true);

    // console.log("====================================");
    // console.log(goldInOunce * currencyData.PakistaniRupee_Currency_PKR);
    // console.log(goldInTola * currencyData.PakistaniRupee_Currency_PKR);
    // console.log(goldInGram * currencyData.PakistaniRupee_Currency_PKR);
    // console.log("====================================");
  };

  const setValues = (selectedOffer, selectedGold) => {
    if (selectedOffer === "1" && selectedGold === "3") {
      setRate(localratesData.RawaPurchase);
    } else if (selectedOffer === "1" && selectedGold === "4") {
      setRate(localratesData.PiecePurchase);
    } else if (selectedOffer === "2" && selectedGold === "3") {
      setRate(localratesData.RawaSale);
    } else if (selectedOffer === "2" && selectedGold === "4") {
      setRate(localratesData.PieceSale);
    }
  };

  const handleOfferChange = (e) => {
    console.log(e.target.value);

    setOffer(e.target.value);
    setValues(e.target.value, gold);
  };

  const handleCalculation = (e) => {
    console.log(rate);
    console.log(weightNotRawa);
    console.log(weightRawa);
    if (!isRawa) {
      setTotalAmount((rate * weightNotRawa).toFixed(3));
    } else {
      setTotalAmount(((rate * weightRawa) / 11.664).toFixed(3));
    }
  };

  const handleGoldChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "3" || e.target.value === 3) {
      setIsRawa(true);
    } else {
      setIsRawa(false);
    }
    setGold(e.target.value);
    setValues(offer, e.target.value);
  };
  return (
    <Fragment>
      {!loading ? (
        <PageLoader />
      ) : (
        <div>
          <div className="calculatorContainerMain">
            <h1 className="calculatorMainHeader">Gold Calculator</h1>
            <p className="calculatorsubHeading">
              This calculator is for estimation only and does not guarantee any
              value.
            </p>
            <div className="calculatorContainer">
              <div className="offer">
                <div>
                  <p className="englishDirection"> Offer</p>
                </div>
                <div>
                  <select
                    className="dropdown"
                    name="offer"
                    id="offer"
                    onChange={(e) => {
                      handleOfferChange(e);
                    }}
                  >
                    <option value="1">Want to Sell</option>
                    <option value="2">Want to Purchase</option>
                  </select>
                </div>
              </div>
              <div className="gold">
                <div>
                  <p className="englishDirection">Gold</p>
                </div>
                <div>
                  <select
                    name="gold"
                    className="dropdown"
                    id="gold"
                    onChange={(e) => {
                      handleGoldChange(e);
                    }}
                  >
                    <option value="3">Rawa 'Pathor'</option>
                    <option value="4">Piece 'bar'</option>
                  </select>
                </div>
              </div>
              <div className="value">
                <div>
                  <p className="englishDirection">Rate</p>
                </div>
                <input className="dropdown" type="text" value={rate} readOnly />
              </div>
              <div className="weight">
                <div>
                  <p className="englishDirection">Weight</p>
                </div>
                {!isRawa ? (
                  <div>
                    <select
                      name="weight"
                      id="weight"
                      className="dropdown"
                      onChange={(e) => {
                        setWeightNotRawa(e.target.value);
                      }}
                    >
                      <option value="10">10 Tola </option>
                      <option value="20">20 Tola </option>
                      <option value="30">30 Tola </option>
                      <option value="40">40 Tola </option>
                      <option value="50">50 Tola </option>
                      <option value="60">60 Tola </option>
                      <option value="70">70 Tola </option>
                      <option value="80">80 Tola </option>
                      <option value="90">90 Tola </option>
                      <option value="100">100 Tola </option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <input
                      type="number"
                      className="dropdown"
                      style={{ direction: "ltr" }}
                      value={weightRawa}
                      placeholder="00.00"
                      onChange={(e) => {
                        console.log(e);
                        console.log(e.target.value);
                        setWeightRawa(e.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="totalAmount">
                <div>
                  {" "}
                  <p className="englishDirection">Total Amount</p>
                </div>
                <input
                  className="dropdown"
                  type="number"
                  style={{ direction: "ltr" }}
                  placeholder="0.00"
                  value={totalAmount}
                  readOnly
                />
              </div>
              <button
                className="buttonCal"
                role="button"
                onClick={handleCalculation}
              >
                Calculate
              </button>
            </div>
          </div>
          <MetalsConvertor
            heading="Gold Calculate in Gram"
            metal="Gram"
            pkr={currencyPKR}
            metalValue={goldInGramPKR}
            heading2="Gold"
          />
          <MetalsConvertor
            heading="Gold Calculate in Tola"
            metal="Tola"
            pkr={currencyPKR}
            metalValue={goldInTolaPKR}
            heading2="Gold"
          />
          <MetalsConvertor
            heading="Gold Calculate in Ounce"
            metal="Ounce"
            pkr={currencyPKR}
            metalValue={goldInOuncePKR}
            heading2="Gold"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Calculator;
