import React, { Fragment, useEffect, useState } from "react";
import logo from "../../Assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getLocalRatesDetails,
  getLocalRatesDetailsss,
} from "../../actions/localRatesActions";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LocalComponentCard from "./LocalComponentCard.js";
import "./LocalRates.css";
let resp;
let isCalledRawaSale = "false";
let isCalledRawaPurchase = "false";
let isCalledPieceSale = "false";
let isCalledPiecePurchase = "false";
const LocalRates = () => {
  const dispatch = useDispatch();
  // const { loading, localRates } = useSelector((state) => state.localRates);
  const [localRatesValue, setLocalRatesValue] = useState(0);
  const [loading, setLoading] = useState(false);

  //Variables
  const [rawaSalePreviousValue, setRawaSalePreviousValue] = useState(null);
  const [rawaPurchasePreviousValue, setRawaPurchasePreviousValue] =
    useState(null);
  const [pieceSalePreviousValue, setPieceSalePreviousValue] = useState(null);
  const [piecePurchasePreviousValue, setPiecePurchasePreviousValue] =
    useState(null);

  const [isAddingRawaSale, setIsAddingRawaSale] = useState(false);
  const [isAddingRawaPurchase, setIsAddingRawaPurchase] = useState(false);
  const [isAddingPieceSale, setIsAddingPieceSale] = useState(false);
  const [isAddingPiecePurchase, setIsAddingPiecePurchase] = useState(false);

  useEffect(() => {
    setLoading(false);
    isCalledRawaSale = "false";
    isCalledRawaPurchase = "false";
    isCalledPieceSale = "false";
    isCalledPiecePurchase = "false";
  }, []);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log("Hello");

    resp = await getLocalRatesDetails();
    console.log(resp);
    console.log(isAddingRawaSale);
    console.log(isCalledRawaSale);
    setInterval(() => {
      console.log(isCalledRawaSale);
      console.log(isAddingRawaSale);
      if (isCalledRawaSale === "true") {
        console.log("false");
        setRawaSalePreviousValue(parseFloat(resp?.RawaSale - 5));
        setIsAddingRawaSale(false);
        isCalledRawaSale = "false";
      } else {
        if (isCalledRawaSale === "false") {
          console.log("true");
          setRawaSalePreviousValue(parseFloat(resp?.RawaSale + 5));
          setIsAddingRawaSale(true);
          isCalledRawaSale = "true";
        }
      }
    }, 5000);

    setInterval(() => {
      console.log(isCalledRawaPurchase);
      console.log(isCalledRawaPurchase);
      if (isCalledRawaPurchase === "true") {
        console.log("false");
        setRawaPurchasePreviousValue(parseFloat(resp?.RawaPurchase - 5));
        setIsAddingRawaPurchase(false);
        isCalledRawaPurchase = "false";
      } else {
        if (isCalledRawaPurchase === "false") {
          console.log("true");
          setRawaPurchasePreviousValue(parseFloat(resp?.RawaPurchase + 5));
          setIsAddingRawaPurchase(true);
          isCalledRawaPurchase = "true";
        }
      }
    }, 5400);

    setInterval(() => {
      console.log(isCalledPieceSale);
      console.log(isAddingRawaSale);
      if (isCalledPieceSale === "true") {
        console.log("false");
        setPieceSalePreviousValue(parseFloat(resp?.PieceSale - 5));
        setIsAddingPieceSale(false);
        isCalledPieceSale = "false";
      } else {
        if (isCalledPieceSale === "false") {
          console.log("true");
          setPieceSalePreviousValue(parseFloat(resp?.PieceSale + 5));
          setIsAddingPieceSale(true);
          isCalledPieceSale = "true";
        }
      }
    }, 5800);

    setInterval(() => {
      console.log(isCalledPiecePurchase);
      console.log(isCalledPiecePurchase);
      if (isCalledPiecePurchase === "true") {
        console.log("false");
        setPiecePurchasePreviousValue(parseFloat(resp?.PiecePurchase - 5));
        setIsAddingPiecePurchase(false);
        isCalledPiecePurchase = "false";
      } else {
        if (isCalledPiecePurchase === "false") {
          console.log("true");
          setPiecePurchasePreviousValue(parseFloat(resp?.PiecePurchase + 5));
          setIsAddingPiecePurchase(true);
          isCalledPiecePurchase = "true";
        }
      }
    }, 6200);
    setLoading(true);
    console.log("hio");
  };

  return (
    <Fragment>
      {loading && (
        <Fragment>
          <div className="localRates">
            <div className="localHeaderheading">لوکل ریٹ</div>
            <div className="cardBox">
              <LocalComponentCard
                props={{
                  cardHeading: "(دس تولہ) پیس",
                  isAdding: isAddingPieceSale,
                  PreviousValue: pieceSalePreviousValue,
                  isAddingPur: isAddingPiecePurchase,
                  PreviousValuePur: piecePurchasePreviousValue,
                  High: resp?.PieceHigh,
                  Low: resp?.PieceLow,
                  difference: resp?.PieceHigh - resp?.PieceLow,
                }}
              />
              <LocalComponentCard
                props={{
                  cardHeading: "( لوکل ) روا",
                  isAdding: isAddingRawaSale,
                  PreviousValue: rawaSalePreviousValue,
                  isAddingPur: isAddingRawaPurchase,
                  PreviousValuePur: rawaPurchasePreviousValue,
                  High: resp?.RawaHigh,
                  Low: resp?.RawaLow,
                  difference: resp?.RawaHigh - resp?.RawaLow,
                }}
              />
            </div>
            <div className="LocalUpdate">
              <div className="time">{resp?.updatedAt}</div>
              <div className="heading">اپڈیٹ</div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LocalRates;
