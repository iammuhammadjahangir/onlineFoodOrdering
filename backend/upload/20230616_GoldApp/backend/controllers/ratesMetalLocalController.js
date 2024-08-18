const MetalLocalRates = require("../models/ratesLocalModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const moment = require("moment-timezone");

const currentDateTime = moment().tz("Asia/Karachi");
const currentDate = currentDateTime.format("YYYY-MM-DD");

//===========================================//
//====CONTROLLER TO CREATE NEW PRODUCTS=====//
//=========================================//
exports.createMetalLocalRates = catchAsyncError(async (req, res, next) => {
  // Access io from app object
  const io = req.app.get("socketio");
  const { RawaSale, RawaPurchase, PieceSale, PiecePurchase } = req.body;
  console.log(req.body);
  let rates = await MetalLocalRates.findOne({}).sort({ createdAt: -1 }).exec();
  console.log(rates);
  console.log(moment(currentDate).startOf("day").toDate());
  // console.log(rates.updatedAt);
  if (!rates || moment(currentDate).startOf("day").toDate() > rates.updatedAt) {
    console.log("Created");
    const rate = await MetalLocalRates.create({
      RawaSale: RawaSale,
      RawaPurchase: RawaPurchase,
      RawaHigh: RawaPurchase,
      RawaLow: RawaPurchase,
      PieceSale: PieceSale,
      PiecePurchase: PiecePurchase,
      PieceHigh: PiecePurchase,
      PieceLow: PiecePurchase,
    });
    // Notify clients after updating record
    io.emit("updateRecord", { recordId: rate._id });
    res.status(201).json({
      success: true,
      message: "Local Product Created Successfully",
    });
  } else if (!(moment(currentDate).startOf("day").toDate() > rates.updatedAt)) {
    console.log("Updated");
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

    // Notify clients after updating record
    io.emit("updateRecord", { recordId: rates._id });
    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",

      // products,
    });
  }
});
exports.getGlobalMetalRates = catchAsyncError(async (req, res, next) => {
  let rates = await MetalLocalRates.findOne({}).sort({ createdAt: -1 }).exec();
  if (!rates) {
    res.status(201).json({
      message: "Rates Not Found",
    });
  } else {
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
    });
  }
});
