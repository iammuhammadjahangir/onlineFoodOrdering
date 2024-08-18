import React, { Fragment, useEffect, useState } from "react";
import GoldLiveRate from "./GoldLiveRate.js";
import CurrencyLiveRates from "./CurrencyLiveRate.js";
import {
  getGlobalRatesDetails,
  updateGlobalRatesDetails,
} from "../../actions/globalRatesActions.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./GlobalRates.css";

let globalDataFetch;

const GlobalRates = () => {
  const dispatch = useDispatch();
  const [loadData, setLoadData] = useState(false);
  // const [date, setDate] = useState("");
  // const [gold, setGold] = useState("0");
  // const [goldHigh, setGoldHigh] = useState("H");
  // const [goldLow, setGoldLow] = useState("L");
  // const [silver, setSilver] = useState("0");
  // const [silverHigh, setSilverHigh] = useState("H");
  // const [silverLow, setSilverLow] = useState("L");
  const { loading, globalRates } = useSelector((state) => state.GlobalRates);

  useEffect(() => {
    setLoadData(false);
    getMetalRates();
    setInterval(() => {
      getMetalRates();
    }, 1805000);
  }, []);

  const getMetalRates = async () => {
    globalDataFetch = await getGlobalRatesDetails();

    console.log(globalDataFetch);
    setLoadData(true);
  };

  return (
    <Fragment>
      {loadData && (
        <Fragment>
          <div className="GlobalRates">
            <div className="GlobalHeaderheading">بین الاقوامی مارکیٹس</div>

            <div className="cardBox">
              <GoldLiveRate
                props={{
                  cardHeading: "دھات",
                  metalName1: "سونا",
                  metalValue1: `${globalDataFetch?.gold}`,
                  metalHigh1: `${globalDataFetch?.goldHigh}`,
                  metalLow1: `${globalDataFetch?.goldLow}`,
                  metalName2: "چاندی",
                  metalValue2: `${globalDataFetch?.silver}`,
                  metalHigh2: `${globalDataFetch?.silverHigh}`,
                  metalLow2: `${globalDataFetch?.silverLow}`,
                  metalName3: "پیلیڈیم",
                  metalValue3: `${globalDataFetch?.XPD}`,
                  metalHigh3: `${globalDataFetch?.XPDHigh}`,
                  metalLow3: `${globalDataFetch?.XPDLow}`,
                  metalName4: "پیلاٹینم",
                  metalValue4: `${globalDataFetch?.XPT}`,
                  metalHigh4: `${globalDataFetch?.XPTHigh}`,
                  metalLow4: `${globalDataFetch?.XPTLow}`,
                  metalName5: "ترک لیرا",
                  metalValue5: `${globalDataFetch?.TRY}`,
                  metalHigh5: `${globalDataFetch?.TRYHigh}`,
                  metalLow5: `${globalDataFetch?.TRYLow}`,
                }}
              />
              <CurrencyLiveRates
                props={{
                  cardHeading: "کرنسی",

                  name1: "ڈالر",
                  value1: `${globalDataFetch?.USD}`,
                  high1: `${globalDataFetch?.USDHigh}`,
                  low1: `${globalDataFetch?.USDLow}`,

                  name2: "برطانوی پاؤنڈ",
                  value2: `${globalDataFetch?.GBP}`,
                  high2: `${globalDataFetch?.GBPHigh}`,
                  low2: `${globalDataFetch?.GBPLow}`,

                  name3: "کینیڈین ڈالر",
                  value3: `${globalDataFetch?.CAD}`,
                  high3: `${globalDataFetch?.CADHigh}`,
                  low3: `${globalDataFetch?.CADLow}`,

                  name4: "چینی یوآن",
                  value4: `${globalDataFetch?.CNY}`,
                  high4: `${globalDataFetch?.CNYHigh}`,
                  low4: `${globalDataFetch?.CNYLow}`,

                  name5: "یورو",
                  value5: `${globalDataFetch?.EUR}`,
                  high5: `${globalDataFetch?.EURHigh}`,
                  low5: `${globalDataFetch?.EURLow}`,
                }}
              />
            </div>
            <div className="LocalUpdate">
              <div className="time">{globalDataFetch?.updatedAt}</div>
              <div className="heading">اپڈیٹ</div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default GlobalRates;

let data = {
  success: true,
  base: "PKR",
  timestamp: 1698835070,
  rates: {
    AED: 0.01306417,
    AFN: 0.26679652,
    ALL: 0.35350649,
    AMD: 1.43053612,
    ANG: 0.00640971,
    AOA: 2.95611454,
    ARS: 1.24497733,
    AUD: 0.00561271,
    AZN: 0.006044,
    BAM: 0.0065278,
    BBD: 0.00718098,
    BDT: 0.39210874,
    BGN: 0.0065897,
    BHD: 0.00134155,
    BIF: 10.1022215,
    BIH: 0.00658278,
    BND: 0.00485859,
    BOB: 0.02457545,
    BRL: 0.01792202,
    BSD: 0.00355662,
    BTC: 1e-7,
    BTN: 0.296061,
    BYN: 0.01171553,
    BZD: 0.00716897,
    CAD: 0.00494015,
    CDF: 9.33790889,
    CHF: 0.00323432,
    CLF: 0.00011552,
    CLP: 3.18744788,
    CNY: 0.02603621,
    COP: 14.64397599,
    CRC: 1.88846788,
    CVE: 0.37298284,
    CZK: 0.08306222,
    DJF: 0.63220414,
    DKK: 0.02517288,
    DOP: 0.20244681,
    DZD: 0.48421245,
    EGP: 0.1099248,
    ERN: 0.05335948,
    ETB: 0.19725281,
    EUR: 0.00337233,
    FJD: 0.00814229,
    FKP: 0.00293189,
    GBP: 0.00293066,
    GEL: 0.0096225,
    GHS: 0.04229455,
    GIP: 0.00293189,
    GMD: 0.23193416,
    GNF: 30.77063375,
    GTQ: 0.0278831,
    GYD: 0.74407935,
    HKD: 0.02782572,
    HNL: 0.08804291,
    HRK: 0.02550212,
    HTG: 0.47227942,
    HUF: 1.29109307,
    IDR: 56.74069354,
    ILS: 0.01434968,
    INR: 0.29641459,
    IQD: 4.66006135,
    IRR: 150.25140704,
    ISK: 0.49947998,
    JMD: 0.54948474,
    JOD: 0.00252321,
    JPY: 0.53788931,
    KES: 0.53679446,
    KGS: 0.31773866,
    KHR: 14.72721581,
    KMF: 1.65076537,
    KRW: 4.83299934,
    KWD: 0.00109974,
    KYD: 0.00296385,
    KZT: 1.66806422,
    LAK: 73.77837678,
    LBP: 53.47510594,
    LKR: 1.16658024,
    LRD: 0.66699072,
    LSL: 0.06701906,
    LYD: 0.01739464,
    MAD: 0.03657973,
    MDL: 0.06455102,
    MGA: 16.07898945,
    MKD: 0.20780659,
    MMK: 7.46869023,
    MNT: 12.30806241,
    MOP: 0.02865872,
    MRO: 1.26995504,
    MUR: 0.15740989,
    MVR: 0.05471117,
    MWK: 4.06421178,
    MXN: 0.06411142,
    MYR: 0.01697189,
    MZN: 0.22499906,
    NAD: 0.06701837,
    NGN: 2.79603765,
    NIO: 0.13037369,
    NOK: 0.03989557,
    NPR: 0.47369236,
    NZD: 0.00611215,
    OMR: 0.00136944,
    PAB: 0.00355665,
    PEN: 0.01359066,
    PHP: 0.20215777,
    PKR: 1,
    PLN: 0.01504435,
    PYG: 26.57806601,
    QAR: 0.01295211,
    RON: 0.016757,
    RSD: 0.39520529,
    RUB: 0.33038116,
    RWF: 4.3736988,
    SAR: 0.01334491,
    SCR: 0.04704008,
    SDG: 2.13615996,
    SEK: 0.03980897,
    SGD: 0.00487515,
    SLL: 70.25664836,
    SOS: 2.02054578,
    SRD: 0.13646689,
    STN: 0.08269903,
    SVC: 0.03112459,
    SZL: 0.06701896,
    THB: 0.12885781,
    TJS: 0.03896195,
    TMT: 0.01245055,
    TND: 0.01129619,
    TOP: 0.0085569,
    TRY: 0.10077649,
    TTD: 0.0241282,
    TWD: 0.11557487,
    TZS: 8.90392033,
    UAH: 0.12891793,
    UGX: 13.460798,
    USD: 0.0035573,
    UYU: 0.14205097,
    UZS: 43.53243839,
    VES: 0.12480326,
    VND: 87.48286925,
    VUV: 0.43625299,
    XAF: 2.18934338,
    XAG: 0.00015713,
    XAU: 0.00000179,
    XCD: 0.00961378,
    XOF: 2.2090648,
    XPD: 0.00000316,
    XPF: 0.40170786,
    XPT: 0.00000383,
    YER: 0.89012509,
    ZAR: 0.0666001,
    ZMK: 32.01995862,
    ZMW: 0.07833237,
  },
};
