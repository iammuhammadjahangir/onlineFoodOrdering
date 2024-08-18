const express = require("express");
const controller = require("../controllers/ratesMetalController.js");

const router = express.Router();

//===========================================//
//====  IMPORT CONTROLLER MODULES   ========//
//=========================================//
router.route("/ratesCurrencyMetals/get").get(controller.geGlobalMetalRates);
router
  .route("/historicalRatesPastYear/post")
  .post(controller.postHistoricalRates);
router
  .route("/historicalRatesPastYear/get/:timeperiod")
  .get(controller.getHistoricalRates);

module.exports = router;
