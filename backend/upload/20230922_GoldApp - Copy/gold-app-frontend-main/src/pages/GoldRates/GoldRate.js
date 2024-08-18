import React, { Fragment } from "react";
import LocalRates from "../../components/LocalRates/LocalRates.js";
import GlobalRates from "../../components/GlobalRates/GlobalRates.js";
import LocalMarket from "../../components/LocalMarket/LocalMarket.js";
import PSE from "../../components/PSE/PSE.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";

const GoldRate = () => {
  return (
    <>
      <Header />
      <LocalRates />
      <GlobalRates />
      <Footer />
      {/* <LocalMarket />
      <PSE /> */}
    </>
  );
};

export default GoldRate;
