const express = require("express");
const controller = require("../controllers/ratesMetalLocalController.js");

const router = express.Router();

//===========================================//
//====  IMPORT CONTROLLER MODULES   ========//
//=========================================//
router.route("/metalLocalRates/new").put(controller.createMetalLocalRates);
router.route("/metalLocalRates/get").get(controller.getGlobalMetalRates);

module.exports = router;
