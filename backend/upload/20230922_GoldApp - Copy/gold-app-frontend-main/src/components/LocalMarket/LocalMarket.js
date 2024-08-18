import React, { useEffect, Fragment } from "react";
import LocalMarketCard from "./LocalMarketCard.js";

const LocalMarket = () => {
  return (
    <Fragment>
      <div className="GlobalRates">
        <div></div>
        <div> مقامی مارکیٹ</div>
      </div>
      <LocalMarketCard
        props={{
          name: "پیلاٹینم",
          value: `${"322343"}`,
        }}
      />
      <LocalMarketCard
        props={{
          name: "پیلیڈیم",
          value: `${"34443"}`,
        }}
      />
      {/* <div className="LocalUpdate">
        <div className="time">{date}</div>
        <div className="heading">اپڈیٹ</div>
      </div> */}
    </Fragment>
  );
};

export default LocalMarket;
