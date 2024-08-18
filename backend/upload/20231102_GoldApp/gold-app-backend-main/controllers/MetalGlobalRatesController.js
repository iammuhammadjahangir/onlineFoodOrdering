const MetalGlobalRates = require("../models/MetalGlobalRatesModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const moment = require("moment-timezone");

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
  const currentDateTime = moment().tz("Asia/Karachi");
  const currentDate = currentDateTime.format("YYYY-MM-DD");
  const { XAU, XAG, USD, GBP, CNY, EUR, CAD } = req.body;
  // console.log(req.body);
  let rates = await MetalGlobalRates.findOne({}).sort({ createdAt: -1 }).exec();
  console.log(rates);
  // const newRates = {
  //     Gold:Gold , GoldHigh:GoldHigh , GoldLow:GoldLow ,Silver:Silver,SilverHigh:SilverHigh,SilverLow:SilverLow
  // }
  // console.log(moment(currentDate).startOf("day").toDate() > rates.updatedAt);
  // console.log(moment(currentDate).endOf("day").toDate() < rates.updatedAt);
  // console.log(rates.updatedAt);
  // console.log(moment(currentDate).startOf("day").toDate());
  // console.log(moment(currentDate).endOf("day").toDate());
  if (moment(currentDate).startOf("day").toDate() > rates.updatedAt) {
    console.log("created");
    await MetalGlobalRates.create({
      Gold: 1 / XAU / 2.488278144,
      GoldHigh: 1 / XAU / 2.488278144,
      GoldLow: 1 / XAU / 2.488278144,
      Silver: 1 / XAG / 2.488278144,
      SilverHigh: 1 / XAG / 2.488278144,
      SilverLow: 1 / XAG / 2.488278144,
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
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  } else if (!(moment(currentDate).startOf("day").toDate() > rates.updatedAt)) {
    console.log("upcated");

    console.log(rates._id);

    await MetalGlobalRates.findByIdAndUpdate(
      rates._id,
      {
        Gold: 1 / XAU / 2.488278144,
        GoldHigh:
          1 / XAU / 2.488278144 > rates.GoldHigh
            ? 1 / XAU / 2.488278144
            : rates.GoldHigh,
        GoldLow:
          1 / XAU / 2.488278144 < rates.GoldLow
            ? 1 / XAU / 2.488278144
            : rates.GoldLow,
        Silver: 1 / XAG / 2.488278144,
        SilverHigh:
          1 / XAG / 2.488278144 > rates.SilverHigh
            ? 1 / XAG / 2.488278144
            : rates.SilverHigh,
        SilverLow:
          1 / XAG / 2.488278144 < rates.SilverLow
            ? 1 / XAG / 2.488278144
            : rates.SilverLow,
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
    //   req.body.user = req.user.id;
    //   const products = await product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",

      // products,
    });
  }
});
exports.geGlobalMetalRates = catchAsyncError(async (req, res, next) => {
  let rates = await MetalGlobalRates.findOne({}).sort({ createdAt: -1 }).exec();
  if (rates.length === 0) {
    res.status(201).json({
      message: "Rates Not Found",
      // products,
    });
    //return next(new ErrorHander("Rates Not Found", 404));
  }
  const gold = rates.Gold.toFixed(3);
  const goldHigh = rates.GoldHigh.toFixed(3);
  const goldLow = rates.GoldLow.toFixed(3);
  const silver = rates.Silver.toFixed(3);
  const silverHigh = rates.SilverHigh.toFixed(3);
  const silverLow = rates.SilverLow.toFixed(3);
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
