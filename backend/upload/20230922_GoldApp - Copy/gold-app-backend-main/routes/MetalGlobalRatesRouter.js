const express = require("express");
const controller = require("../controllers/MetalGlobalRatesController.js"); //Must Import Controller to access its functions

const router = express.Router();

//===========================================//
//====  IMPORT CONTROLLER MODULES   ========//
//=========================================//
router.route("/MetalRates/new").put(controller.UpdateMetalGLobalRates);

router.route("/MetalRates/get").get(controller.geGlobalMetalRates);

module.exports = router;
