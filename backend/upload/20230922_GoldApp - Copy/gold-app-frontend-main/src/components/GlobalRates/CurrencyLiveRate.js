import React, { Fragment } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CurrencyLiveRate = ({ props }) => {
  return (
    <Fragment>
      <div className="Card">
        <div className="CardHeading">{props.cardHeading}</div>

        {/* For USD */}
        <div className="metalValue">
          <p>{props.name1}</p>
          <span className={"golden"}>{props.value1}</span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.low1} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.high1} <ArrowDropUpIcon />
          </span>{" "}
        </div>
        {/* For GBP */}
        <div className="metalValue">
          <p>{props.name2}</p>
          <span className={"golden"}>{props.value2}</span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.low2} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.high2} <ArrowDropUpIcon />
          </span>{" "}
        </div>
        {/* For CAD */}
        <div className="metalValue">
          <p>{props.name3}</p>
          <span className={"golden"}>{props.value3}</span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.low3} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.high3} <ArrowDropUpIcon />
          </span>{" "}
        </div>
        {/* For CNY */}
        <div className="metalValue">
          <p>{props.name4}</p>
          <span className={"golden"}>{props.value4}</span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.low4} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.high4} <ArrowDropUpIcon />
          </span>{" "}
        </div>
        {/*  For EUR*/}
        <div className="metalValue">
          <p>{props.name5}</p>
          <span className={"golden"}>{props.value5}</span>
        </div>
        <div className="HighLowCards">
          <span className="Rateslow" style={{ color: "#36454f" }}>
            {props.low5} <ArrowDropDownIcon />
          </span>
          /{" "}
          <span className="RatesHigh" style={{ color: "#996b28" }}>
            {props.high5} <ArrowDropUpIcon />
          </span>{" "}
        </div>
      </div>
    </Fragment>
  );
};

export default CurrencyLiveRate;
