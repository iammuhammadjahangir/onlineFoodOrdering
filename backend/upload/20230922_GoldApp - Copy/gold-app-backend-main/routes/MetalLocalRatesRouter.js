const express = require("express");
const controller = require("../controllers/MetalLocalRatesController"); //Must Import Controller to access its functions

const router = express.Router();

//===========================================//
//====  IMPORT CONTROLLER MODULES   ========//
//=========================================//
router
  .route("/admin/MetalRatesLocal/new")
  .put(controller.createMetalLocalRates);

router.route("/MetalRatesLocal/get").get(controller.getGlobalMetalRates);

module.exports = router;
