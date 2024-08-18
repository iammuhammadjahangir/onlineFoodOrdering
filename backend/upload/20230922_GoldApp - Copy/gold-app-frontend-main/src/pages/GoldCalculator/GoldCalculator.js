import React, { Fragment, useState, useEffect } from "react";
import "./GoldCalculator.css";
import { getLocalRatesDetails } from "../../actions/localRatesActions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
const GoldCalculator = () => {
  const [localratesData, setLocalratesData] = useState({});
  const [offer, setOffer] = useState("1");
  const [gold, setGold] = useState("3");
  const [rate, setRate] = useState("");
  const [isRawa, setIsRawa] = useState(true);
  const [weightRawa, setWeightRawa] = useState(0);
  const [weightNotRawa, setWeightNotRawa] = useState(10);
  const [totalAmount, setTotalAmount] = useState("");
  useEffect(() => {
    setIsRawa(true);
    setOffer("1");
    setGold("3");
    setRate("");
    setWeightNotRawa(10);
    setWeightRawa(0);
    setTotalAmount("");
    getLocalRates();
  }, []);

  const getLocalRates = async () => {
    const data = await getLocalRatesDetails();
    setLocalratesData(data);
    setRate(data.RawaSale);
    console.log(data);
  };

  useEffect(() => {
    console.log(rate);
  }, [rate]);

  const setValues = (selectedOffer, selectedGold) => {
    if (selectedOffer === "1" && selectedGold === "3") {
      setRate(localratesData.RawaSale);
    } else if (selectedOffer === "1" && selectedGold === "4") {
      setRate(localratesData.PieceSale);
    } else if (selectedOffer === "2" && selectedGold === "3") {
      setRate(localratesData.RawaPurchase);
    } else if (selectedOffer === "2" && selectedGold === "4") {
      setRate(localratesData.PiecePurchase);
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
      <Header />

      <div className="guideContainerr">
        <h1 className="MainHeader">گولڈ کیلکولیٹر</h1>
        <p className="subHeading">
          یہ کیلکولیٹر صرف تخمینہ کے لیے ہے کسی قیمت کی ضمانت نہیں دیتا۔
        </p>
        <div className="calculatorContainer">
          <div className="offer">
            <div>
              <p> آفر:</p>
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
                <option value="1">بیچنا چاہتا ہوں </option>
                <option value="2">خریدنا چاہتا ہوں </option>
              </select>
            </div>
          </div>
          <div className="gold">
            <div>
              <p> سونا:</p>
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
                <option value="3">روا " پٹھور " </option>
                <option value="4">پیس " بار " </option>
              </select>
            </div>
          </div>
          <div className="value">
            <div>
              <p> ریٹ:</p>
            </div>
            <input type="text" className="dropdown" value={rate} readOnly />
          </div>
          <div className="weight">
            <div>
              <p> وزن:</p>
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
                  <option value="10">10 تولا </option>
                  <option value="20">20 تولا </option>
                  <option value="30">30 تولا </option>
                  <option value="40">40 تولا </option>
                  <option value="50">50 تولا </option>
                  <option value="60">60 تولا </option>
                  <option value="70">70 تولا </option>
                  <option value="80">80 تولا </option>
                  <option value="90">90 تولا </option>
                  <option value="100">100 تولا </option>
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
            <div> کل رقم:</div>
            <input
              type="number"
              className="dropdown"
              style={{ direction: "ltr" }}
              placeholder="0.00"
              value={totalAmount}
              readOnly
            />
          </div>
          <button class="buttonCal" role="button" onClick={handleCalculation}>
            کیلکولیٹ کریں
          </button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default GoldCalculator;
