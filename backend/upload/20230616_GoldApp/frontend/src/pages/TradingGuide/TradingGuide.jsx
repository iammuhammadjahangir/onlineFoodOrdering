import React, { Fragment, useEffect } from "react";
import "./guideContainer.css";

let currentLang;
const TradingGuide = () => {
  return (
    <>
      <Fragment>
        <div className="guideContainer">
          <h1 className="MainHeader">Gold Trading Guide</h1>
          <div className="trading">
            <h2>Trading</h2>
            <p>
              Gold is the only commodity that has been trusted for thousands of
              years.
            </p>
            <p>
              Gold is the only commodity that will stand during wars and
              economic collapse.
            </p>
            <p>Market movements should be studied before buying and selling.</p>
            <p>Most people suffer from being inexperienced.</p>
            <p>
              Just invest extra money. Don't invest money that you will need in
              the near future. Because the market is uncertain and if you engage
              in short-term trading, you may lose.
            </p>
            <p>
              Most people lose their entire investment due to over trading. Only
              trade on the investment you have in cash.
            </p>
          </div>
          <div className="trading">
            <h2>Rawa</h2>
            <p>Mainly used for making jewellery. Also used as an investment.</p>
            <p>
              Local laboratories extract pure gold from scrap gold. And sells it
              under its own name with its own stamp.
            </p>
            <p>
              Each laboratory has its own criteria. And also depends on the
              city.
            </p>
            <p>
              Rawalpindi/Islamabad 99.3% (.9930), Lahore 99.0% (.990), Karachi
              99.9% (.999)
            </p>
            <p>
              People are called by different names in different cities. Like
              Rawa in Rawalpindi, Pathur in Lahore, Acid and Zero in Karachi,
              Gota in Peshawar
            </p>
            <p>
              Be careful when buying gold, always ask for gold purity from a
              laboratory or gold dealer. The purity of gold should be between
              (990-999). Write the purity of gold in the sales receipt, it will
              help you to sell gold anywhere when you sell.
            </p>
            <p>Always buy rawa from an authorized laboratory or dealer.</p>
            <p>The live rate can be checked from our live rate page.</p>
          </div>
          <div className="trading">
            <h2>Rawa and T-bar</h2>
            <p>T bar is mainly used for investment.</p>
            <p>
              T Bar can be made from Rs 9990. AR Y Gold can be made from Lahore
              and Karachi.
            </p>
            <p>Its weight is 116.64 grams (10 tolas).</p>
            <p>It is only available in 99.9% (9990) gold purity.</p>
            <p>T bar rates can be checked from our live rates page.</p>
          </div>
          <div className="trading">
            <h2>Grami</h2>
            <p>Grams are mainly used for investments.</p>
            <p>
              It ranges from 1 gram to 100 grams. Most available in 5 grams, 10
              grams, 1 tola, 20 grams, 2 tolas, 1 ounce (31.1 grams), 50 grams,
              5 tolas, 100 grams.
            </p>
            <p>These are available only in 99.9% (9990) gold purity.</p>
            <p>
              1 out of 10 grammes are fake due to demand. So be careful while
              buying it. Buy it only from an authorized dealer.
            </p>
            <p>
              Try to buy Rawa instead of Grami because when you buy it dealer
              will sell Grami at TT bar price and also charge premium on it and
              when you sell dealer will buy it at Rawa price.
            </p>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default TradingGuide;
