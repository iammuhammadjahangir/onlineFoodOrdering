import React, { Fragment } from "react";
import GoldLiveRate from "../GlobalRates/GoldLiveRate";
import "./PSE.css";

const PSE = () => {
  return (
    <Fragment>
      <div className="GlobalRates">
        <div>زیادہ سے زیادہ / کم سے کم</div>
        <div> پاکستان اسٹاک ایکسچینج</div>
      </div>
      <GoldLiveRate
        props={{
          name: "انڈیکس",
          value: `${"334"}`,
          high: `${"4334"}`,
          low: `${"123"}`,
        }}
      />
    </Fragment>
  );
};

export default PSE;
