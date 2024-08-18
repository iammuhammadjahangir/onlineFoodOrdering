import React, { Fragment, useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

let isCalledValue = "false";
let isCalledValueSilver = "false";
let isCalledValuePallidium = "false";
let isCalledValuePlatinum = "false";
let isCalledValueTurkishLira = "false";

const GoldLiveRate = ({ props }) => {
  const [isAddingValue, setIsAddingValue] = useState(false);
  const [isAddingValueSilver, setIsAddingValueSilver] = useState(false);
  const [isAddingValuePallidium, setIsAddingValuePallidium] = useState(false);
  const [isAddingValuePlatinum, setIsAddingValuePlatinum] = useState(false);
  const [isAddingValueTurkishLira, setIsAddingValueTurkishLira] =
    useState(false);

  const [values, setValues] = useState(0);
  const [valuesSilver, setValuesSilver] = useState(0);
  const [valuePallidium, setValuePallidium] = useState(0);
  const [valuePlatinum, setValuePlatinum] = useState(0);
  const [valueTurkishLira, setValueTurkishLira] = useState(0);
  useEffect(() => {
    isCalledValue = "false";
    isCalledValueSilver = "false";
    isCalledValuePallidium = "false";
    isCalledValuePlatinum = "false";
    isCalledValueTurkishLira = "false";

    setIsAddingValue(false);
    setIsAddingValueSilver(false);
    setIsAddingValuePallidium(false);
    setIsAddingValuePlatinum(false);
    setIsAddingValueTurkishLira(false);

    console.log(props.metalValue1);

    // For GOld
    setInterval(() => {
      const randomValue = Math.abs((Math.random() - 0.5) * 2).toFixed(2);
      // console.log(randomValue);
      if (isCalledValue === "true") {
        console.log("false");
        setValues(
          parseFloat(parseFloat(props.metalValue1) - parseFloat(randomValue))
        );
        console.log("changed");
        setIsAddingValue(false);
        isCalledValue = "false";
      } else {
        if (isCalledValue === "false") {
          console.log("true");
          console.log(
            parseFloat(parseFloat(props.metalValue1) + parseFloat(randomValue))
          );
          setValues(
            parseFloat(parseFloat(props.metalValue1) + parseFloat(randomValue))
          );
          setIsAddingValue(true);
          isCalledValue = "true";
        }
      }
    }, 5000);

    // For Silver

    setInterval(() => {
      const randomValue = Math.abs((Math.random() - 0.5) * 2).toFixed(2);
      // console.log(randomValue);
      if (isCalledValueSilver === "true") {
        console.log("false");
        setValuesSilver(
          parseFloat(parseFloat(props.metalValue2) - parseFloat(randomValue))
        );
        console.log("changed");
        setIsAddingValueSilver(false);
        isCalledValueSilver = "false";
      } else {
        if (isCalledValueSilver === "false") {
          console.log("true");
          console.log(
            parseFloat(parseFloat(props.metalValue2) + parseFloat(randomValue))
          );
          setValuesSilver(
            parseFloat(parseFloat(props.metalValue2) + parseFloat(randomValue))
          );
          setIsAddingValueSilver(true);
          isCalledValueSilver = "true";
        }
      }
    }, 5200);

    //For Pallidium
    setInterval(() => {
      const randomValue = Math.abs((Math.random() - 0.5) * 2).toFixed(2);
      // console.log(randomValue);
      if (isCalledValuePallidium === "true") {
        console.log("false");
        setValuePallidium(
          parseFloat(parseFloat(props.metalValue3) - parseFloat(randomValue))
        );
        console.log("changed");
        setIsAddingValueSilver(false);
        isCalledValuePallidium = "false";
      } else {
        if (isCalledValuePallidium === "false") {
          console.log("true");
          console.log(
            parseFloat(parseFloat(props.metalValue3) + parseFloat(randomValue))
          );
          setValuePallidium(
            parseFloat(parseFloat(props.metalValue3) + parseFloat(randomValue))
          );
          setIsAddingValueSilver(true);
          isCalledValuePallidium = "true";
        }
      }
    }, 5400);
    //For Platinum
    setInterval(() => {
      const randomValue = Math.abs((Math.random() - 0.5) * 2).toFixed(2);
      // console.log(randomValue);
      if (isCalledValuePlatinum === "true") {
        console.log("false");
        setValuePlatinum(
          parseFloat(parseFloat(props.metalValue4) - parseFloat(randomValue))
        );
        console.log("changed");
        setIsAddingValuePlatinum(false);
        isCalledValuePlatinum = "false";
      } else {
        if (isCalledValuePlatinum === "false") {
          console.log("true");
          console.log(
            parseFloat(parseFloat(props.metalValue4) + parseFloat(randomValue))
          );
          setValuePlatinum(
            parseFloat(parseFloat(props.metalValue4) + parseFloat(randomValue))
          );
          setIsAddingValuePlatinum(true);
          isCalledValuePlatinum = "true";
        }
      }
    }, 5600);
    //For Turkish Lira
    setInterval(() => {
      const randomValue = Math.abs((Math.random() - 0.5) * 2).toFixed(2);
      // console.log(randomValue);
      if (isCalledValueTurkishLira === "true") {
        console.log("false");
        setValueTurkishLira(
          parseFloat(parseFloat(props.metalValue2) - parseFloat(randomValue))
        );
        console.log("changed");
        setIsAddingValueTurkishLira(false);
        isCalledValueTurkishLira = "false";
      } else {
        if (isCalledValueTurkishLira === "false") {
          console.log("true");
          console.log(
            parseFloat(parseFloat(props.metalValue2) + parseFloat(randomValue))
          );
          setValueTurkishLira(
            parseFloat(parseFloat(props.metalValue2) + parseFloat(randomValue))
          );
          setIsAddingValueTurkishLira(true);
          isCalledValueTurkishLira = "true";
        }
      }
    }, 5800);
  }, []);

  return (
    <Fragment>
      <div className="Card">
        <div className="CardHeading">{props.cardHeading}</div>

        {/* For Gold */}
        <div className="metalValue">
          <p>{props.metalName1}</p>
          <span className={` ${isAddingValue === true ? "golden" : "black"}`}>
            {values.toFixed(3)}
            {isAddingValue === true ? (
              <ArrowDropUpIcon style={{ fill: "#fff" }} />
            ) : (
              <ArrowDropDownIcon style={{ fill: "#fff" }} />
            )}
          </span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.metalLow1} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.metalHigh1} <ArrowDropUpIcon />
          </span>{" "}
        </div>

        {/* For Silver */}

        <div className="metalValue">
          <p>{props.metalName2}</p>
          <span
            className={` ${isAddingValueSilver === true ? "golden" : "black"}`}
          >
            {valuesSilver.toFixed(3)}
            {isAddingValueSilver === true ? (
              <ArrowDropUpIcon style={{ fill: "#fff" }} />
            ) : (
              <ArrowDropDownIcon style={{ fill: "#fff" }} />
            )}
          </span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.metalLow2}
            <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.metalHigh2}
            <ArrowDropUpIcon />
          </span>{" "}
        </div>

        {/* For pallidium */}
        <div className="metalValue">
          <p>{props.metalName3}</p>
          <span
            className={` ${isAddingValueSilver === true ? "golden" : "black"}`}
          >
            {valuePallidium.toFixed(3)}
            {isAddingValueSilver === true ? (
              <ArrowDropUpIcon style={{ fill: "#fff" }} />
            ) : (
              <ArrowDropDownIcon style={{ fill: "#fff" }} />
            )}
          </span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.metalLow3}
            <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.metalHigh3}
            <ArrowDropUpIcon />
          </span>{" "}
        </div>
        {/* For platinum */}
        <div className="metalValue">
          <p>{props.metalName4}</p>
          <span
            className={` ${isAddingValueSilver === true ? "golden" : "black"}`}
          >
            {valuePlatinum.toFixed(3)}
            {isAddingValueSilver === true ? (
              <ArrowDropUpIcon style={{ fill: "#fff" }} />
            ) : (
              <ArrowDropDownIcon style={{ fill: "#fff" }} />
            )}
          </span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.metalLow4}
            <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.metalHigh4}
            <ArrowDropUpIcon />
          </span>{" "}
        </div>
        {/* For Turkish Lira */}
        <div className="metalValue">
          <p>{props.metalName5}</p>
          <span
            className={` ${isAddingValueSilver === true ? "golden" : "black"}`}
          >
            {valueTurkishLira.toFixed(3)}
            {isAddingValueSilver === true ? (
              <ArrowDropUpIcon style={{ fill: "#fff" }} />
            ) : (
              <ArrowDropDownIcon style={{ fill: "#fff" }} />
            )}
          </span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.metalLow5}
            <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.metalHigh5}
            <ArrowDropUpIcon />
          </span>{" "}
        </div>
      </div>
    </Fragment>
  );
};

export default GoldLiveRate;
