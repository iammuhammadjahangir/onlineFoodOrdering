import React, { Fragment } from "react";

const KaratGoldCard = ({ heading, value, heading2 }) => {
  return (
    <Fragment>
      <div className="card">
        <h1>Rs. {Math.floor(value)}</h1>
        <p>
          {heading} Karat {heading2} Rate
        </p>
      </div>
    </Fragment>
  );
};

export default KaratGoldCard;
