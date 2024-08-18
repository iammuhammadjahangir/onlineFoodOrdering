import React, { Fragment, useState } from "react";
import "./MetalsConvertor.css";
import KaratGoldCard from "./KaratGoldCard";
const MetalsConvertor = ({ heading, metal, metalValue, heading2 }) => {
  const [value, setValue] = useState(1);
  console.log("====================================");
  console.log(metal, " ", metalValue);
  console.log("====================================");
  return (
    <Fragment>
      <div className="calculatorContainerMain">
        <h1 className="calculatorMainHeader">{heading}</h1>
        <p className="calculatorsubHeading">
          This calculator is for estimation only and does not guarantee any
          value.
        </p>
        <h2 className="calculatorsubHeadingMetal">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />{" "}
          {metal} Gold Rate
        </h2>
        <div className="gridContainer">
          <KaratGoldCard
            heading="24"
            value={(24 / 24) * metalValue * value}
            heading2={heading2}
          />
          <KaratGoldCard
            heading="22"
            value={(22 / 24) * metalValue * value}
            heading2={heading2}
          />
          <KaratGoldCard
            heading="21"
            value={(21 / 24) * metalValue * value}
            heading2={heading2}
          />
          <KaratGoldCard
            heading="18"
            value={(18 / 24) * metalValue * value}
            heading2={heading2}
          />
          <KaratGoldCard
            heading="16"
            value={(16 / 24) * metalValue * value}
            heading2={heading2}
          />
          <KaratGoldCard
            heading="12"
            value={(12 / 24) * metalValue * value}
            heading2={heading2}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MetalsConvertor;
