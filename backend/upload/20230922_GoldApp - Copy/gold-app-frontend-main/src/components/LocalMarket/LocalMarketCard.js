import React, { Fragment } from "react";
import "./LocalMarketCard.css";

const LocalMarketCard = ({ props }) => {
  return (
    <Fragment>
      <div className="ratesRow">
        <div className="RatesHighLow"></div>
        <div className="RatesValue">{props.value}</div>
        <div className="RateHeading">{props.name}</div>
      </div>
    </Fragment>
  );
};

export default LocalMarketCard;
