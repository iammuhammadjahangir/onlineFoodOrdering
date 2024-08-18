import React, { Fragment } from "react";
import "./LocalComponentCard.css";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const LocalComponentCard = ({ props }) => {
  console.log(props);
  return (
    <Fragment>
      <div className="Card">
        <div className="CardHeading">{props.cardHeading}</div>
        <div className="SaleCard">
          <p>فروخت</p>
          <div className={`SaleValue`}>
            <span
              className={` ${
                props.isAdding === true
                  ? "golden"
                  : props.PreviousValue && props.isAdding === false
                  ? "black"
                  : "transparent"
              }`}
            >
              {" "}
              {props.PreviousValue}
              {props.isAdding === true ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </span>
          </div>
        </div>
        <div className="PurchaseCard">
          <p>خرید</p>
          <div className="PurchaseValue">
            <span
              className={` ${
                props.isAddingPur === true
                  ? "golden"
                  : props.PreviousValuePur && props.isAddingPur === false
                  ? "black"
                  : "transparent"
              }`}
            >
              {" "}
              {props.PreviousValuePur}
              {props.isAddingPur === true ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </span>
          </div>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.Low} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.High} <ArrowDropUpIcon />
          </span>{" "}
        </div>
        <div className="Difference">
          <p>فرق</p>
          <div
            className="golden"
            style={{ paddingRight: "30px", paddingLeft: "30px" }}
          >
            {props.difference}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LocalComponentCard;
