const MetalLocalRates = require("../models/MetalLocalRatesModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const moment = require("moment-timezone");

//===========================================//
//====CONTROLLER TO CREATE NEW PRODUCTS=====//
//=========================================//
exports.createMetalLocalRates = catchAsyncError(async (req, res, next) => {
  const currentDateTime = moment().tz("Asia/Karachi");
  const currentDate = currentDateTime.format("YYYY-MM-DD");
  const { RawaSale, RawaPurchase, PieceSale, PiecePurchase } = req.body;
  console.log(req.body);
  let rates = await MetalLocalRates.findOne({}).sort({ createdAt: -1 }).exec();
  // updatedAt: {
  //   $gte: moment(currentDate).startOf("day").toDate(), // Start of the current day
  //   $lt: moment(currentDate).endOf("day").toDate(), // End of the current day
  // },
  // console.log(rates.length === 0);
  // const newRates = {
  //     Gold:Gold , GoldHigh:GoldHigh , GoldLow:GoldLow ,Silver:Silver,SilverHigh:SilverHigh,SilverLow:SilverLow
  // }
  if (moment(currentDate).startOf("day").toDate() > rates.updatedAt) {
    await MetalLocalRates.create({
      RawaSale: RawaSale,
      RawaPurchase: RawaPurchase,
      RawaHigh: RawaPurchase,
      RawaLow: RawaPurchase,
      PieceSale: PieceSale,
      PiecePurchase: PiecePurchase,
      PieceHigh: PiecePurchase,
      PieceLow: PiecePurchase,
      updatedAt: moment().tz("asia/shanghai").format(),
    });
    res.status(201).json({
      success: true,
      message: "Local Product Created Successfully",
    });
  } else if (!(moment(currentDate).startOf("day").toDate() > rates.updatedAt)) {
    console.log(rates._id);

    const RawaSaleData = RawaSale;
    const RawaPurchaseData = RawaPurchase;
    const RawaHighData =
      RawaPurchase > rates.RawaHigh ? RawaPurchase : rates.RawaHigh;
    const RawaLowData =
      RawaPurchase < rates.RawaLow ? RawaPurchase : rates.RawaLow;
    const PieceSaleData = PieceSale;
    const PiecePurchaseData = PiecePurchase;
    const PieceHighData =
      PiecePurchase > rates.PieceHigh ? PiecePurchase : rates.PieceHigh;
    const PieceLowData =
      PiecePurchase < rates.PieceLow ? PiecePurchase : rates.PieceLow;

    console.log(
      RawaSaleData,
      RawaPurchaseData,
      RawaHighData,
      RawaLowData,
      PieceSaleData,
      PiecePurchaseData,
      PieceHighData,
      PieceLowData
    );

    await MetalLocalRates.findByIdAndUpdate(
      rates._id,
      {
        RawaSale: RawaSaleData,
        RawaPurchase: RawaPurchaseData,
        RawaHigh: RawaHighData,
        RawaLow: RawaLowData,
        PieceSale: PieceSaleData,
        PiecePurchase: PiecePurchaseData,
        PieceHigh: PieceHighData,
        PieceLow: PieceLowData,
        updatedAt: moment().tz("Asia/Karachi").format(),
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
exports.getGlobalMetalRates = catchAsyncError(async (req, res, next) => {
  const currentDateTime = moment().tz("Asia/Karachi");
  const currentDate = currentDateTime.format("YYYY-MM-DD");
  console.log(currentDateTime);
  console.log(currentDate);
  console.log(moment(currentDate).startOf("day").toDate());
  console.log(moment(currentDate).endOf("day").toDate());
  let rates = await MetalLocalRates.findOne({}).sort({ createdAt: -1 }).exec();
  if (rates.length === 0) {
    res.status(201).json({
      message: "Rates Not Found",
      // products,
    });
    //return next(new ErrorHander("Rates Not Found", 404));
  }

  const RawaSale = rates.RawaSale;
  const RawaPurchase = rates.RawaPurchase;
  const RawaHigh = rates.RawaHigh;
  const RawaLow = rates.RawaLow;
  const PieceSale = rates.PieceSale;
  const PiecePurchase = rates.PiecePurchase;
  const PieceHigh = rates.PieceHigh;
  const PieceLow = rates.PieceLow;
  const updatedAt = moment(rates.updatedAt)
    .tz("asia/karachi")
    .format("DD-MM-YYYY HH:mm A");
  // console.log(updatedAt);
  // console.log(moment.tz.names());

  res.status(201).json({
    success: true,
    RawaSale,
    RawaPurchase,
    RawaHigh,
    RawaLow,
    PieceSale,
    PiecePurchase,
    PieceHigh,
    PieceLow,
    updatedAt,
    // products,
  });
});
