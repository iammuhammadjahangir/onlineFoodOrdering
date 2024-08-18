const MetalGlobalRates = require("../models/MetalGlobalRatesModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const moment = require("moment-timezone");
const axios = require("axios");

let initialUpdateDone = false;
function isToday(timestamp) {
  const today = new Date();
  const dateFromTimestamp = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  return (
    dateFromTimestamp.getDate() === today.getDate() &&
    dateFromTimestamp.getMonth() === today.getMonth() &&
    dateFromTimestamp.getFullYear() === today.getFullYear()
  );
}
//===========================================//
//====CONTROLLER TO CREATE NEW PRODUCTS=====//
//=========================================//
exports.UpdateMetalGLobalRates = catchAsyncError(async (req, res, next) => {
  const fetchDataAndUpdate = async () => {
    const currentDateTime = moment().tz("Asia/Karachi");
    const currentDate = currentDateTime.format("YYYY-MM-DD");

    var config = {
      method: "get",
      url: "https://api.metalpriceapi.com/v1/latest?api_key=58df374955711979836168264e13b663&base=PKR",
      headers: {},
    };

    axios(config).then(async function (response) {
      const { XAU, XAG, USD, GBP, CNY, EUR, CAD, XPD, XPT, TRY } =
        response.data.rates;

      console.log(response.data);
      console.log(XAU, XAG, USD, GBP, CNY, EUR, CAD, XPD, XPT, TRY);
      let rates = await MetalGlobalRates.findOne({})
        .sort({ createdAt: -1 })
        .exec();
      console.log(rates);
      if (moment(currentDate).startOf("day").toDate() > rates.updatedAt) {
        console.log("created");
        await MetalGlobalRates.create({
          Gold: USD / XAU,
          GoldHigh: USD / XAU,
          GoldLow: USD / XAU,
          Silver: USD / XAG,
          SilverHigh: USD / XAG,
          SilverLow: USD / XAG,
          XPD: USD / XPD,
          XPDHigh: USD / XPD,
          XPDLow: USD / XPD,
          XPT: USD / XPT,
          XPTHigh: USD / XPT,
          XPTLow: USD / XPT,
          TRY: USD / TRY,
          TRYHigh: USD / TRY,
          TRYLow: USD / TRY,
          USD: 1 / USD,
          USDHigh: 1 / USD,
          USDLow: 1 / USD,
          GBP: 1 / GBP,
          GBPHigh: 1 / GBP,
          GBPLow: 1 / GBP,
          CNY: 1 / CNY,
          CNYHigh: 1 / CNY,
          CNYLow: 1 / CNY,
          EUR: 1 / EUR,
          EURHigh: 1 / EUR,
          EURLow: 1 / EUR,
          CAD: 1 / CAD,
          CADHigh: 1 / CAD,
          CADLow: 1 / CAD,
        });
        // res.status(201).json({
        //   success: true,
        //   message: "Product Created Successfully",
        // });
      } else if (
        !(moment(currentDate).startOf("day").toDate() > rates.updatedAt)
      ) {
        console.log("upcated");

        console.log(rates._id);

        await MetalGlobalRates.findByIdAndUpdate(
          rates._id,
          {
            Gold: USD / XAU,
            GoldHigh: USD / XAU > rates.GoldHigh ? USD / XAU : rates.GoldHigh,
            GoldLow: USD / XAU < rates.GoldLow ? USD / XAU : rates.GoldLow,
            Silver: USD / XAG,
            SilverHigh:
              USD / XAG > rates.SilverHigh ? USD / XAG : rates.SilverHigh,
            SilverLow:
              USD / XAG < rates.SilverLow ? USD / XAG : rates.SilverLow,
            XPD: USD / XPD,
            XPDHigh: USD / XPD > rates.XPDHigh ? USD / XPD : rates.XPDHigh,
            XPDLow: USD / XPD < rates.XPDLow ? USD / XPD : rates.XPDLow,
            XPT: USD / XPT,
            XPTHigh: USD / XPT > rates.XPTHigh ? USD / XPT : rates.XPTHigh,
            XPTLow: USD / XPT < rates.XPTLow ? USD / XPT : rates.XPTLow,
            TRY: USD / TRY,
            TRYHigh: USD / TRY > rates.TRYHigh ? USD / TRY : rates.TRYHigh,
            TRYLow: USD / TRY < rates.TRYLow ? USD / TRY : rates.TRYLow,
            USD: 1 / USD,
            USDHigh: 1 / USD > rates.USDHigh ? 1 / USD : rates.USDHigh,
            USDLow: 1 / USD < rates.USDLow ? 1 / USD : rates.USDLow,
            GBP: 1 / GBP,
            GBPHigh: 1 / GBP > rates.GBPHigh ? 1 / GBP : rates.GBPHigh,
            GBPLow: 1 / GBP < rates.GBPLow ? 1 / GBP : rates.GBPLow,
            CNY: 1 / CNY,
            CNYHigh: 1 / CNY > rates.CNYHigh ? 1 / CNY : rates.CNYHigh,
            CNYLow: 1 / CNY < rates.CNYLow ? 1 / CNY : rates.CNYLow,
            EUR: 1 / EUR,
            EURHigh: 1 / EUR > rates.EURHigh ? 1 / EUR : rates.EURHigh,
            EURLow: 1 / EUR < rates.EURLow ? 1 / EUR : rates.EURLow,
            CAD: 1 / CAD,
            CADHigh: 1 / CAD > rates.CADHigh ? 1 / CAD : rates.CADHigh,
            CADLow: 1 / CAD < rates.CADLow ? 1 / CAD : rates.CADLow,
          },
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
        );
      }
    });
  };

  // Initially, fetch and update data
  fetchDataAndUpdate();

  // Schedule periodic updates every 30 minutes
  setInterval(fetchDataAndUpdate, 1800000);
});
exports.geGlobalMetalRates = catchAsyncError(async (req, res, next) => {
  console.log(initialUpdateDone);
  let rates;
  initialUpdateDone === false && (await this.UpdateMetalGLobalRates());
  rates = await MetalGlobalRates.findOne({}).sort({ createdAt: -1 }).exec();
  initialUpdateDone = true;
  console.log(rates);
  if (rates.length === 0) {
    res.status(201).json({
      message: "Rates Not Found",
    });
  }
  const gold = rates.Gold.toFixed(3);
  const goldHigh = rates.GoldHigh.toFixed(3);
  const goldLow = rates.GoldLow.toFixed(3);
  const silver = rates.Silver.toFixed(3);
  const silverHigh = rates.SilverHigh.toFixed(3);
  const silverLow = rates.SilverLow.toFixed(3);
  const XPD = rates.XPD.toFixed(3);
  const XPDHigh = rates.XPDHigh.toFixed(3);
  const XPDLow = rates.XPDLow.toFixed(3);
  const XPT = rates.XPT.toFixed(3);
  const XPTHigh = rates.XPTHigh.toFixed(3);
  const XPTLow = rates.XPTLow.toFixed(3);
  const TRY = rates.TRY.toFixed(3);
  const TRYHigh = rates.TRYHigh.toFixed(3);
  const TRYLow = rates.TRYLow.toFixed(3);
  const USD = rates.USD.toFixed(3);
  const USDHigh = rates.USDHigh.toFixed(3);
  const USDLow = rates.USDLow.toFixed(3);
  const GBP = rates.GBP.toFixed(3);
  const GBPHigh = rates.GBPHigh.toFixed(3);
  const GBPLow = rates.GBPLow.toFixed(3);
  const CNY = rates.CNY.toFixed(3);
  const CNYHigh = rates.CNYHigh.toFixed(3);
  const CNYLow = rates.CNYLow.toFixed(3);
  const EUR = rates.EUR.toFixed(3);
  const EURHigh = rates.EURHigh.toFixed(3);
  const EURLow = rates.EURLow.toFixed(3);
  const CAD = rates.CAD.toFixed(3);
  const CADHigh = rates.CADHigh.toFixed(3);
  const CADLow = rates.CADLow.toFixed(3);
  const updatedAt = moment(rates.updatedAt)
    .tz("asia/karachi")
    .format("DD-MM-YYYY HH:mm A");
  console.log(updatedAt);

  res.status(201).json({
    success: true,
    gold,
    goldHigh,
    goldLow,
    silver,
    silverHigh,
    silverLow,
    XPD,
    XPDHigh,
    XPDLow,
    XPT,
    XPTHigh,
    XPTLow,
    TRY,
    TRYHigh,
    TRYLow,
    USD,
    USDHigh,
    USDLow,
    GBP,
    GBPHigh,
    GBPLow,
    CNY,
    CNYHigh,
    CNYLow,
    EUR,
    EURHigh,
    EURLow,
    CAD,
    CADHigh,
    CADLow,

    updatedAt,
    // products,
  });
});
